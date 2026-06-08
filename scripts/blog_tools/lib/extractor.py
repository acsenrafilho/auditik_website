from __future__ import annotations

import re
from typing import TYPE_CHECKING

import trafilatura
from bs4 import BeautifulSoup, Tag
from markdownify import markdownify as html_to_md

from lib.config import MIN_BODY_CHARS, ArticleData

if TYPE_CHECKING:
    from lib.config import ScraperConfig
    from lib.http_client import HttpClient

NOISE_SELECTORS = (
    "nav",
    "header",
    "footer",
    "aside",
    ".comments",
    ".comment",
    ".comment-list",
    "#comments",
    ".newsletter",
    ".breadcrumb",
    ".breadcrumbs",
    ".related-posts",
    ".post-navigation",
    ".share",
    ".social",
    ".widget",
    ".sidebar",
    "script",
    "style",
    "noscript",
    "form",
)

CONTENT_SELECTORS = (
    "article",
    "main article",
    "main .entry-content",
    "main .post-content",
    ".entry-content",
    ".post-content",
    ".article-content",
    ".blog-post",
    ".single-post",
    "main",
    "#content",
    ".content",
)

_playwright_browser = None


class PlaywrightFetcher:
    def __init__(self) -> None:
        self._playwright = None
        self._browser = None

    def fetch_html(self, url: str, timeout_ms: int = 30000) -> str:
        from playwright.sync_api import sync_playwright

        if self._browser is None:
            self._playwright = sync_playwright().start()
            self._browser = self._playwright.chromium.launch(headless=True)

        page = self._browser.new_page()
        try:
            page.goto(url, wait_until="networkidle", timeout=timeout_ms)
            return page.content()
        finally:
            page.close()

    def close(self) -> None:
        if self._browser:
            self._browser.close()
            self._browser = None
        if self._playwright:
            self._playwright.stop()
            self._playwright = None


def _plain_text_length(text: str) -> int:
    return len(re.sub(r"\s+", "", text))


def _clean_markdown(text: str) -> str:
    lines: list[str] = []
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            if lines and lines[-1] != "":
                lines.append("")
            continue
        if stripped.startswith("[") and "](" in stripped and len(stripped) < 80:
            continue
        if stripped.lower().startswith("enviar um comentário"):
            break
        if stripped.lower().startswith("deixe um comentário"):
            break
        lines.append(stripped)
    cleaned = "\n".join(lines).strip()
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    return cleaned


def _remove_noise(soup: BeautifulSoup) -> None:
    for selector in NOISE_SELECTORS:
        for node in soup.select(selector):
            node.decompose()


def _pick_content_node(soup: BeautifulSoup) -> Tag | BeautifulSoup:
    for selector in CONTENT_SELECTORS:
        node = soup.select_one(selector)
        if node and _plain_text_length(node.get_text(" ", strip=True)) >= 120:
            return node
    return soup.body or soup


def _extract_with_bs4(html: str, url: str) -> tuple[str | None, str, str | None]:
    soup = BeautifulSoup(html, "lxml")
    title_node = soup.find("h1")
    title = title_node.get_text(" ", strip=True) if title_node else None
    if not title:
        og_title = soup.find("meta", property="og:title")
        if og_title and og_title.get("content"):
            title = og_title["content"].strip()

    date = None
    time_node = soup.find("time")
    if time_node:
        date = (time_node.get("datetime") or time_node.get_text(" ", strip=True) or "").strip() or None

    content_node = _pick_content_node(soup)
    fragment = BeautifulSoup(str(content_node), "lxml")
    _remove_noise(fragment)
    body = html_to_md(
        str(fragment),
        heading_style="ATX",
        bullets="-",
        strip=["img", "script", "style"],
    )
    body = _clean_markdown(body)
    return title, body, date


def _extract_with_trafilatura(html: str, url: str) -> tuple[str | None, str, str | None]:
    metadata = trafilatura.extract_metadata(html, default_url=url)
    body = trafilatura.extract(
        html,
        url=url,
        include_comments=False,
        include_tables=False,
        favor_precision=True,
        output_format="txt",
    )
    title = metadata.title if metadata else None
    date = metadata.date if metadata else None
    body = _clean_markdown(body or "")
    return title, body, date


def _looks_like_spa(html: str) -> bool:
    soup = BeautifulSoup(html, "lxml")
    text_len = _plain_text_length(soup.get_text(" ", strip=True))
    script_count = len(soup.find_all("script"))
    return text_len < 500 and script_count >= 8


def extract_article(
    client: HttpClient,
    url: str,
    *,
    config: ScraperConfig,
    playwright_fetcher: PlaywrightFetcher | None = None,
) -> ArticleData:
    html = ""
    used_playwright = False

    try:
        html = client.fetch_text(url)
    except Exception as exc:
        return ArticleData(url=url, title="", body="", status="error", error=str(exc))

    title, body, date = _extract_with_trafilatura(html, url)
    if _plain_text_length(body) < MIN_BODY_CHARS:
        bs_title, bs_body, bs_date = _extract_with_bs4(html, url)
        if _plain_text_length(bs_body) > _plain_text_length(body):
            title = bs_title or title
            body = bs_body
            date = bs_date or date

    needs_playwright = (
        config.use_playwright
        and (
            _plain_text_length(body) < MIN_BODY_CHARS
            or _looks_like_spa(html)
        )
    )

    if needs_playwright:
        fetcher = playwright_fetcher or PlaywrightFetcher()
        try:
            rendered = fetcher.fetch_html(url, timeout_ms=config.timeout * 1000)
            used_playwright = True
            pw_title, pw_body, pw_date = _extract_with_trafilatura(rendered, url)
            if _plain_text_length(pw_body) < MIN_BODY_CHARS:
                bs_title, bs_body, bs_date = _extract_with_bs4(rendered, url)
                if _plain_text_length(bs_body) > _plain_text_length(pw_body):
                    pw_title = bs_title or pw_title
                    pw_body = bs_body
                    pw_date = bs_date or pw_date
            if _plain_text_length(pw_body) > _plain_text_length(body):
                title = pw_title or title
                body = pw_body
                date = pw_date or date
        except Exception as exc:
            if _plain_text_length(body) < MIN_BODY_CHARS:
                return ArticleData(
                    url=url,
                    title=title or "",
                    body=body,
                    date=date,
                    status="error",
                    error=f"Playwright falhou: {exc}",
                )

    if not title:
        title = url.rstrip("/").split("/")[-1].replace("-", " ").title()

    if _plain_text_length(body) < MIN_BODY_CHARS:
        return ArticleData(
            url=url,
            title=title,
            body=body,
            date=date,
            status="error",
            error=f"Conteúdo insuficiente ({_plain_text_length(body)} chars)",
        )

    return ArticleData(
        url=url,
        title=title.strip(),
        body=body.strip(),
        date=date,
        status="ok",
        error=None if not used_playwright else None,
    )
