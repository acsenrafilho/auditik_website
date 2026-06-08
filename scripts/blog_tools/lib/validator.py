from __future__ import annotations

from typing import TYPE_CHECKING
from urllib.parse import urlparse

from lib.config import MIN_BODY_CHARS, ValidationResult
from lib.discovery import discover_articles
from lib.extractor import PlaywrightFetcher, extract_article
from lib.slug import slug_from_domain

if TYPE_CHECKING:
    from lib.config import ScraperConfig
    from lib.http_client import HttpClient


def _validation_status(article_count: int, sample_ok: bool) -> str:
    if article_count == 0 or not sample_ok:
        return "INVIÁVEL"
    if article_count < 3:
        return "AVISO"
    return "PRONTO"


def validate_site(
    client: HttpClient,
    seed_url: str,
    *,
    config: ScraperConfig,
    site_slug: str | None = None,
    playwright_fetcher: PlaywrightFetcher | None = None,
) -> ValidationResult:
    parsed = urlparse(seed_url)
    domain = (parsed.netloc or "").lower().lstrip("www.")
    resolved_slug = site_slug or slug_from_domain(seed_url)

    try:
        client.fetch(seed_url)
    except Exception as exc:
        return ValidationResult(
            seed_url=seed_url,
            domain=domain,
            site_slug=resolved_slug,
            method="none",
            article_count=0,
            sample_ok=False,
            sample_title=None,
            sample_body_chars=0,
            status="INVIÁVEL",
            message=f"Falha de conectividade: {exc}",
            article_urls=[],
        )

    discovery = discover_articles(client, seed_url)
    article_urls = list(discovery.urls)
    article_count = len(article_urls)
    if config.max_articles:
        article_urls = article_urls[: config.max_articles]

    sample_ok = False
    sample_title: str | None = None
    sample_body_chars = 0
    message = "Nenhum artigo encontrado."

    if article_urls:
        sample = extract_article(
            client,
            article_urls[0],
            config=config,
            playwright_fetcher=playwright_fetcher,
        )
        sample_title = sample.title or None
        sample_body_chars = len(sample.body.replace(" ", "").replace("\n", ""))
        sample_ok = sample.status == "ok" and sample_body_chars >= MIN_BODY_CHARS
        if sample_ok:
            message = f"Descoberta via {discovery.method}: {article_count} artigo(s)."
        else:
            message = sample.error or "Falha ao extrair amostra."

    status = _validation_status(article_count, sample_ok)
    return ValidationResult(
        seed_url=seed_url,
        domain=domain,
        site_slug=resolved_slug,
        method=discovery.method,
        article_count=article_count,
        sample_ok=sample_ok,
        sample_title=sample_title,
        sample_body_chars=sample_body_chars,
        status=status,
        message=message,
        article_urls=article_urls,
    )
