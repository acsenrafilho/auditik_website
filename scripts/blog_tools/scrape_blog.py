#!/usr/bin/env python3
from __future__ import annotations

import argparse
import sys
import textwrap
import time
from dataclasses import dataclass, field
from pathlib import Path

from rich.console import Console
from rich.panel import Panel
from rich.progress import BarColumn, Progress, SpinnerColumn, TextColumn, TimeElapsedColumn
from rich.table import Table

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from lib.config import (  # noqa: E402
    DEFAULT_CACHE_FILE,
    DEFAULT_DELAY_MAX,
    DEFAULT_DELAY_MIN,
    DEFAULT_OUTPUT_DIR,
    ScraperConfig,
    ValidationResult,
)
from lib.extractor import PlaywrightFetcher, extract_article  # noqa: E402
from lib.formatter import load_cache, save_article, save_cache  # noqa: E402
from lib.http_client import HttpClient  # noqa: E402
from lib.rate_limit import sleep_with_jitter  # noqa: E402
from lib.slug import slug_from_domain  # noqa: E402
from lib.validator import validate_site  # noqa: E402

console = Console()


@dataclass
class SiteJob:
    seed_url: str
    site_slug: str | None = None


@dataclass
class RunStats:
    sites_processed: int = 0
    articles_saved: int = 0
    articles_skipped: int = 0
    articles_failed: int = 0
    sites_skipped: int = 0
    failures: list[str] = field(default_factory=list)


def load_urls_from_list_file(path: Path) -> list[str]:
    if not path.exists():
        raise FileNotFoundError(f"Arquivo de URLs não encontrado: {path}")
    urls: list[str] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        urls.append(stripped)
    return urls


def load_urls_from_stdin() -> list[str]:
    if sys.stdin.isatty():
        return []
    urls: list[str] = []
    for line in sys.stdin.read().splitlines():
        stripped = line.strip()
        if stripped and not stripped.startswith("#"):
            urls.append(stripped)
    return urls


def deduplicate_urls(urls: list[str]) -> list[str]:
    seen: set[str] = set()
    unique: list[str] = []
    for url in urls:
        if url not in seen:
            seen.add(url)
            unique.append(url)
    return unique


def parse_site_slug_map(values: list[str]) -> dict[str, str]:
    mapping: dict[str, str] = {}
    for item in values:
        if "=" not in item:
            continue
        seed, slug = item.split("=", 1)
        mapping[seed.strip()] = slug.strip()
    return mapping


def build_jobs(
    urls: list[str],
    *,
    default_site_slug: str | None,
    site_slug_map: dict[str, str],
) -> list[SiteJob]:
    jobs: list[SiteJob] = []
    for url in urls:
        slug = site_slug_map.get(url) or default_site_slug
        jobs.append(SiteJob(seed_url=url, site_slug=slug))
    return jobs


def render_validation_table(results: list[ValidationResult]) -> None:
    table = Table(title="Validação de sites", show_header=True, header_style="bold cyan")
    table.add_column("Site", style="white", no_wrap=False)
    table.add_column("Método", style="magenta")
    table.add_column("Artigos", justify="right")
    table.add_column("Amostra", justify="center")
    table.add_column("Status", justify="center")

    for result in results:
        sample = "[green]OK[/green]" if result.sample_ok else "[red]FALHA[/red]"
        status_style = {
            "PRONTO": "green",
            "AVISO": "yellow",
            "INVIÁVEL": "red",
        }.get(result.status, "white")
        table.add_row(
            result.domain or result.seed_url,
            result.method,
            str(result.article_count),
            sample,
            f"[{status_style}]{result.status}[/{status_style}]",
        )
    console.print(table)


def collect_site(
    validation: ValidationResult,
    *,
    client: HttpClient,
    config: ScraperConfig,
    playwright_fetcher: PlaywrightFetcher | None,
    stats: RunStats,
    cache: dict[str, dict],
) -> None:
    site_dir = config.output_dir / validation.site_slug
    site_dir.mkdir(parents=True, exist_ok=True)
    used_slugs: set[str] = {path.stem for path in site_dir.glob("*.md")}

    article_urls = validation.article_urls
    if config.max_articles:
        article_urls = article_urls[: config.max_articles]

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        TextColumn("{task.completed}/{task.total}"),
        TimeElapsedColumn(),
        console=console,
    ) as progress:
        task_id = progress.add_task(
            f"[cyan]Coletando {validation.site_slug}[/cyan]",
            total=len(article_urls),
        )

        for index, article_url in enumerate(article_urls):
            if index > 0:
                sleep_with_jitter(config.delay_min, config.delay_max)

            if config.resume:
                if article_url in cache and cache[article_url].get("status") == "ok":
                    stats.articles_skipped += 1
                    progress.advance(task_id)
                    continue
                skipped = False
                for path in site_dir.glob("*.md"):
                    content = path.read_text(encoding="utf-8")
                    if article_url in content:
                        stats.articles_skipped += 1
                        cache[article_url] = {"status": "ok", "file": str(path)}
                        skipped = True
                        break
                if skipped:
                    progress.advance(task_id)
                    continue

            article = extract_article(
                client,
                article_url,
                config=config,
                playwright_fetcher=playwright_fetcher,
            )

            if article.status != "ok":
                stats.articles_failed += 1
                stats.failures.append(f"{article_url} — {article.error}")
                cache[article_url] = {"status": "error", "error": article.error}
                progress.advance(task_id)
                continue

            output_path = save_article(article, site_dir, used_slugs=used_slugs)
            stats.articles_saved += 1
            cache[article_url] = {"status": "ok", "file": str(output_path)}
            progress.advance(task_id)

    stats.sites_processed += 1


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Coleta artigos de blog de sites concorrentes e salva em Markdown.",
        epilog=textwrap.dedent(
            """
            Exemplos:
              .venv/bin/python scripts/blog_tools/scrape_blog.py --list-file scripts/blog_tools/urls.txt
              .venv/bin/python scripts/blog_tools/scrape_blog.py --url "https://otoclinic.com.br/blog-otoclinic/" --validate-only
              .venv/bin/python scripts/blog_tools/scrape_blog.py --url "https://comunicareaparelhosauditivos.com/blog/" --site-slug comunicare
            """
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("urls", nargs="*", help="URLs do blog (seed/index).")
    parser.add_argument("--url", action="append", default=[], dest="url_flags", help="URL individual (repetível).")
    parser.add_argument("--list-file", default="", help="Arquivo com 1 URL por linha.")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Diretório de saída.")
    parser.add_argument("--cache-file", default=str(DEFAULT_CACHE_FILE), help="Cache JSON para --resume.")
    parser.add_argument("--site-slug", default="", help="Slug da pasta de saída (aplica a todos os sites).")
    parser.add_argument(
        "--site-slug-map",
        action="append",
        default=[],
        help='Mapeamento seed=slug (ex.: "https://site.com/blog/=comunicare").',
    )
    parser.add_argument("--validate-only", action="store_true", help="Executa apenas a fase de validação.")
    parser.add_argument("--force", action="store_true", help="Coleta mesmo com status AVISO.")
    parser.add_argument("--resume", action="store_true", help="Pula artigos já coletados.")
    parser.add_argument("--max-articles", type=int, default=0, help="Limite de artigos por site (0 = sem limite).")
    parser.add_argument("--delay-min", type=float, default=DEFAULT_DELAY_MIN, help="Delay mínimo entre artigos (s).")
    parser.add_argument("--delay-max", type=float, default=DEFAULT_DELAY_MAX, help="Delay máximo entre artigos (s).")
    parser.add_argument(
        "--no-playwright",
        action="store_true",
        help="Desabilita fallback Playwright (padrão: habilitado).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    urls: list[str] = list(args.urls) + list(args.url_flags)

    if args.list_file:
        urls.extend(load_urls_from_list_file(Path(args.list_file).expanduser().resolve()))

    if not urls:
        urls.extend(load_urls_from_stdin())

    urls = deduplicate_urls(urls)
    if not urls:
        raise SystemExit("Nenhuma URL informada. Use positional, --url, --list-file ou pipe via stdin.")

    site_slug_map = parse_site_slug_map(args.site_slug_map)
    default_site_slug = args.site_slug.strip() or None
    jobs = build_jobs(urls, default_site_slug=default_site_slug, site_slug_map=site_slug_map)

    config = ScraperConfig(
        output_dir=Path(args.output_dir).expanduser().resolve(),
        cache_file=Path(args.cache_file).expanduser().resolve(),
        delay_min=args.delay_min,
        delay_max=args.delay_max,
        max_articles=args.max_articles or None,
        use_playwright=not args.no_playwright,
        resume=args.resume,
        force=args.force,
    )

    started_at = time.time()
    client = HttpClient(config)
    playwright_fetcher = PlaywrightFetcher() if config.use_playwright else None
    cache = load_cache(config.cache_file) if config.resume else {}
    stats = RunStats()

    console.print(
        Panel.fit(
            f"[bold]Lead Control Blog Scraper[/bold]\n"
            f"URLs: {len(jobs)} | Saída: {config.output_dir}\n"
            f"Playwright: {'sim' if config.use_playwright else 'não'}",
            border_style="cyan",
        )
    )

    validations: list[ValidationResult] = []
    try:
        console.print("\n[bold cyan]Fase 1 — Validação[/bold cyan]")
        for index, job in enumerate(jobs):
            if index > 0:
                sleep_with_jitter(config.delay_min, config.delay_max)

            slug = job.site_slug or slug_from_domain(job.seed_url)
            console.print(f"[dim]Validando {job.seed_url} → pasta `{slug}`[/dim]")
            result = validate_site(
                client,
                job.seed_url,
                config=config,
                site_slug=slug,
                playwright_fetcher=playwright_fetcher,
            )
            validations.append(result)
            console.print(f"  [{result.status}] {result.message}")

        render_validation_table(validations)

        if args.validate_only:
            console.print("\n[yellow]Modo --validate-only: coleta não executada.[/yellow]")
            return

        console.print("\n[bold cyan]Fase 2 — Coleta em massa[/bold cyan]")
        for validation in validations:
            if validation.status == "INVIÁVEL":
                stats.sites_skipped += 1
                console.print(f"[red]Pulando {validation.domain}[/red] — {validation.message}")
                continue
            if validation.status == "AVISO" and not config.force:
                stats.sites_skipped += 1
                console.print(
                    f"[yellow]Pulando {validation.domain}[/yellow] — status AVISO "
                    f"(use --force para coletar mesmo assim)"
                )
                continue

            collect_site(
                validation,
                client=client,
                config=config,
                playwright_fetcher=playwright_fetcher,
                stats=stats,
                cache=cache,
            )

        if config.resume:
            save_cache(config.cache_file, cache)
    finally:
        if playwright_fetcher:
            playwright_fetcher.close()

    elapsed = time.time() - started_at
    console.print(
        Panel.fit(
            f"[bold]RESUMO DA COLETA[/bold]\n"
            f"Sites processados: {stats.sites_processed}\n"
            f"Sites pulados:     {stats.sites_skipped}\n"
            f"Artigos salvos:    {stats.articles_saved}\n"
            f"Ignorados (resume): {stats.articles_skipped}\n"
            f"Falhas:            {stats.articles_failed}\n"
            f"Tempo:             {elapsed:.1f}s\n"
            f"Saída:             {config.output_dir}",
            border_style="green",
        )
    )

    if stats.failures:
        console.print("\n[bold red]Falhas detalhadas:[/bold red]")
        for failure in stats.failures[:20]:
            console.print(f"  • {failure}")
        if len(stats.failures) > 20:
            console.print(f"  … e mais {len(stats.failures) - 20} falha(s).")


if __name__ == "__main__":
    main()
