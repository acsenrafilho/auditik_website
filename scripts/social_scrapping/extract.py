#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
import textwrap
from datetime import datetime, timezone
from pathlib import Path

from rich.console import Console

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from lib.config import (  # noqa: E402
    DEFAULT_CACHE_FILE,
    DEFAULT_DELAY_MAX,
    DEFAULT_DELAY_MIN,
    DEFAULT_OUTPUT_DIR,
    DEFAULT_TMP_DIR,
    DEFAULT_WHISPER_LANGUAGE,
    DEFAULT_WHISPER_MODEL,
    ExtractorConfig,
    PostData,
    TranscriberConfig,
)
from lib.extractor import cleanup_temp_file, detect_platform, download_audio, fetch_metadata, validate_url  # noqa: E402
from lib.formatter import write_reports  # noqa: E402
from lib.rate_limit import sleep_with_jitter  # noqa: E402
from lib.transcriber import transcribe_audio  # noqa: E402

console = Console()


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


def load_cache(cache_file: Path) -> dict[str, dict]:
    if not cache_file.exists():
        return {}
    try:
        data = json.loads(cache_file.read_text(encoding="utf-8"))
        if isinstance(data, dict):
            return data
    except json.JSONDecodeError:
        pass
    return {}


def save_cache(cache_file: Path, cache: dict[str, dict]) -> None:
    cache_file.parent.mkdir(parents=True, exist_ok=True)
    cache_file.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")


def post_from_cache(entry: dict) -> PostData:
    return PostData(
        url=entry.get("url", ""),
        platform=entry.get("platform", "unknown"),
        status=entry.get("status", "ok"),
        error=entry.get("error"),
        title=entry.get("title"),
        description=entry.get("description"),
        uploader=entry.get("uploader"),
        view_count=entry.get("view_count"),
        like_count=entry.get("like_count"),
        duration=entry.get("duration"),
        transcription=entry.get("transcription"),
        has_audio=entry.get("has_audio", False),
        extracted_at=entry.get("extracted_at"),
    )


def process_url(
    url: str,
    *,
    extractor_config: ExtractorConfig,
    transcriber_config: TranscriberConfig,
    transcribe: bool,
) -> PostData:
    validate_url(url)
    extracted_at = datetime.now(timezone.utc).isoformat()
    audio_path: Path | None = None

    try:
        console.print(f"[cyan][1/3][/cyan] Obtendo metadados: {url}")
        _info, post = fetch_metadata(url, extractor_config)
        post.extracted_at = extracted_at

        if transcribe and post.has_audio:
            console.print("[cyan][2/3][/cyan] Baixando áudio...")
            audio_path = download_audio(url, extractor_config)
            if audio_path:
                console.print("[cyan][3/3][/cyan] Transcrevendo áudio...")
                post.transcription = transcribe_audio(audio_path, transcriber_config)
            else:
                post.transcription = None
        elif transcribe:
            console.print("[yellow][2/3][/yellow] Post sem áudio — transcrição ignorada.")
        else:
            console.print("[yellow][2/3][/yellow] Transcrição desativada (--no-transcribe).")

        console.print("[green][OK][/green] URL processada com sucesso.")
        return post
    except Exception as exc:
        console.print(f"[red][ERRO][/red] Falha ao processar {url}: {exc}")
        return PostData(
            url=url,
            platform=detect_platform(url),
            status="error",
            error=str(exc),
            extracted_at=extracted_at,
        )
    finally:
        cleanup_temp_file(audio_path)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extrai legendas e transcrições de posts Instagram/Facebook para análise de conteúdo.",
        epilog=textwrap.dedent(
            """
            Exemplos:
              python scripts/social_scrapping/extract.py --list-file scripts/social_scrapping/urls.txt
              python scripts/social_scrapping/extract.py --url "https://www.instagram.com/reel/ABC/" --cookies-from-browser chrome
              python scripts/social_scrapping/extract.py --list-file urls.txt --no-transcribe --resume
            """
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("urls", nargs="*", help="URLs de posts/reels (positional).")
    parser.add_argument("--url", action="append", default=[], dest="url_flags", help="URL individual (repetível).")
    parser.add_argument("--list-file", default="", help="Arquivo com 1 URL por linha.")
    parser.add_argument("--output-dir", default=str(DEFAULT_OUTPUT_DIR), help="Diretório de saída dos relatórios.")
    parser.add_argument("--cache-file", default=str(DEFAULT_CACHE_FILE), help="Arquivo JSON de cache/resume.")
    parser.add_argument("--cookies-file", default="", help="Arquivo cookies.txt (formato Netscape).")
    parser.add_argument(
        "--cookies-from-browser",
        default="",
        help="Importar cookies do navegador (ex.: chrome, firefox, chromium).",
    )
    parser.add_argument("--no-transcribe", action="store_true", help="Extrair apenas metadados/legenda.")
    parser.add_argument("--whisper-model", default=DEFAULT_WHISPER_MODEL, help="Modelo faster-whisper.")
    parser.add_argument("--whisper-language", default=DEFAULT_WHISPER_LANGUAGE, help="Idioma da transcrição.")
    parser.add_argument("--delay-min", type=float, default=DEFAULT_DELAY_MIN, help="Delay mínimo entre URLs (s).")
    parser.add_argument("--delay-max", type=float, default=DEFAULT_DELAY_MAX, help="Delay máximo entre URLs (s).")
    parser.add_argument("--resume", action="store_true", help="Reutiliza URLs já presentes no cache.")
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

    output_dir = Path(args.output_dir).expanduser().resolve()
    cache_file = Path(args.cache_file).expanduser().resolve()
    tmp_dir = output_dir / ".tmp"
    tmp_dir.mkdir(parents=True, exist_ok=True)

    extractor_config = ExtractorConfig(
        cookies_file=args.cookies_file or None,
        cookies_from_browser=args.cookies_from_browser or None,
        tmp_dir=tmp_dir,
    )
    transcriber_config = TranscriberConfig(
        model_name=args.whisper_model,
        language=args.whisper_language,
    )

    cache = load_cache(cache_file) if args.resume else {}
    results: list[PostData] = []
    skipped = 0

    console.print(f"[bold]Processando {len(urls)} URL(s)...[/bold]")

    for index, url in enumerate(urls):
        if args.resume and url in cache:
            console.print(f"[yellow][SKIP][/yellow] URL já no cache: {url}")
            results.append(post_from_cache(cache[url]))
            skipped += 1
            continue

        if index > 0 or skipped > 0:
            console.print(f"[dim]Aguardando intervalo anti-rate-limit...[/dim]")
            sleep_with_jitter(args.delay_min, args.delay_max)

        post = process_url(
            url,
            extractor_config=extractor_config,
            transcriber_config=transcriber_config,
            transcribe=not args.no_transcribe,
        )
        results.append(post)
        cache[url] = post.to_dict()

    save_cache(cache_file, cache)

    generated_at = datetime.now()
    markdown_path, json_path = write_reports(results, output_dir, generated_at)

    success_count = sum(1 for post in results if post.status == "ok")
    failure_count = len(results) - success_count

    console.print("\n[bold][RESUMO][/bold] Processamento concluído.")
    console.print(f"[RESUMO] Total: {len(results)} | Sucesso: {success_count} | Falhas: {failure_count} | Cache: {skipped}")
    console.print(f"[OK] Relatório markdown: {markdown_path}")
    console.print(f"[OK] Relatório JSON: {json_path}")


if __name__ == "__main__":
    main()
