from __future__ import annotations

import re
import xml.etree.ElementTree as ET
from collections import deque
from dataclasses import dataclass
from typing import TYPE_CHECKING
from urllib.parse import parse_qs, urldefrag, urlparse

from bs4 import BeautifulSoup

from lib.config import (
    BLOG_PATH_HINTS,
    CRAWL_MAX_DEPTH,
    CRAWL_MAX_PAGES,
    EXCLUDED_EXTENSIONS,
    EXCLUDED_PATH_FRAGMENTS,
    SITEMAP_MAX_URLS,
    STATIC_PAGE_SLUGS,
)

if TYPE_CHECKING:
    from lib.http_client import HttpClient

SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


@dataclass
class DiscoveryResult:
    method: str
    urls: list[str]


def normalize_url(url: str) -> str:
    cleaned, _fragment = urldefrag(url.strip())
    parsed = urlparse(cleaned)
    path = parsed.path.rstrip("/") or "/"
    query = parse_qs(parsed.query, keep_blank_values=False)
    keep_query = ""
    if "page" in query:
        keep_query = f"?page={query['page'][0]}"
    return f"{parsed.scheme}://{parsed.netloc}{path}{keep_query}"


def is_blog_listing_page(url: str) -> bool:
    path = urlparse(url.lower()).path.rstrip("/")
    if not path:
        return False
    if any(hint in path for hint in BLOG_PATH_HINTS):
        return True
    return path.endswith("/page") or "/page/" in path


def is_excluded_url(url: str) -> bool:
    lowered = url.lower()
    path = urlparse(lowered).path

    if is_blog_listing_page(url):
        return False

    if "/page/" in path or path.endswith("/page"):
        return True

    if any(fragment in lowered for fragment in EXCLUDED_PATH_FRAGMENTS):
        return True
    return any(path.endswith(ext) for ext in EXCLUDED_EXTENSIONS)


def looks_like_article(url: str, seed_url: str) -> bool:
    if is_excluded_url(url):
        return False

    parsed = urlparse(url)
    path = parsed.path.lower().rstrip("/")
    if not path or path == "/":
        return False

    segments = [segment for segment in path.split("/") if segment]
    if not segments:
        return False

    slug = segments[-1]
    if slug in STATIC_PAGE_SLUGS:
        return False

    if is_blog_listing_page(url):
        return False

    if any(hint in path for hint in BLOG_PATH_HINTS):
        if len(segments) >= 2:
            return True

    seed_path = urlparse(seed_url).path.lower().rstrip("/")
    if seed_path and seed_path != "/" and path.startswith(seed_path):
        remainder = path[len(seed_path) :].strip("/")
        if remainder and "/" not in remainder:
            return True

    if re.search(r"/\d{4}/\d{2}/", path):
        return True

    if "-" in slug and len(slug) >= 12:
        return True

    if len(segments) >= 2 and len(slug) >= 8:
        return True

    return False


def filter_article_urls(urls: list[str], seed_url: str) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for raw in urls:
        normalized = normalize_url(raw)
        if normalized in seen:
            continue
        if not looks_like_article(normalized, seed_url):
            continue
        seen.add(normalized)
        result.append(normalized)
    return result


def parse_sitemap_xml(content: str) -> tuple[list[str], list[str]]:
    page_urls: list[str] = []
    sitemap_urls: list[str] = []
    try:
        root = ET.fromstring(content)
    except ET.ParseError:
        return page_urls, sitemap_urls

    tag = root.tag.rsplit("}", 1)[-1]
    if tag == "sitemapindex":
        for node in root.findall(".//sm:sitemap/sm:loc", SITEMAP_NS):
            if node.text:
                sitemap_urls.append(node.text.strip())
        if not sitemap_urls:
            for node in root.findall(".//sitemap/loc"):
                if node.text:
                    sitemap_urls.append(node.text.strip())
    elif tag == "urlset":
        for node in root.findall(".//sm:url/sm:loc", SITEMAP_NS):
            if node.text:
                page_urls.append(node.text.strip())
        if not page_urls:
            for node in root.findall(".//url/loc"):
                if node.text:
                    page_urls.append(node.text.strip())
    return page_urls, sitemap_urls


def discover_from_sitemaps(client: HttpClient, seed_url: str) -> DiscoveryResult:
    parsed = urlparse(seed_url)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    candidates = [
        f"{origin}/sitemap.xml",
        f"{origin}/sitemap_index.xml",
        f"{origin}/wp-sitemap.xml",
    ]

    try:
        robots = client.fetch_text(f"{origin}/robots.txt")
        for line in robots.splitlines():
            if line.lower().startswith("sitemap:"):
                candidates.append(line.split(":", 1)[1].strip())
    except Exception:
        pass

    queue = list(dict.fromkeys(candidates))
    visited_sitemaps: set[str] = set()
    collected: list[str] = []

    while queue and len(visited_sitemaps) < 20:
        sitemap_url = queue.pop(0)
        if sitemap_url in visited_sitemaps:
            continue
        visited_sitemaps.add(sitemap_url)
        try:
            xml = client.fetch_text(sitemap_url)
            page_urls, nested = parse_sitemap_xml(xml)
            collected.extend(page_urls)
            queue.extend(nested)
        except Exception:
            continue

    article_urls = filter_article_urls(collected[:SITEMAP_MAX_URLS], seed_url)
    if article_urls:
        return DiscoveryResult(method="sitemap", urls=article_urls)
    return DiscoveryResult(method="sitemap", urls=[])


def discover_from_feed(client: HttpClient, seed_url: str) -> DiscoveryResult:
    parsed = urlparse(seed_url)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    feed_candidates = [
        f"{origin}/feed",
        f"{origin}/blog/feed",
        f"{origin}/rss",
        f"{origin}/atom.xml",
        seed_url.rstrip("/") + "/feed",
    ]

    for feed_url in feed_candidates:
        try:
            content = client.fetch_text(feed_url)
            urls = _parse_feed_links(content)
            article_urls = filter_article_urls(urls, seed_url)
            if article_urls:
                return DiscoveryResult(method="rss", urls=article_urls)
        except Exception:
            continue

    try:
        html = client.fetch_text(seed_url)
        soup = BeautifulSoup(html, "lxml")
        for link in soup.find_all("link", rel=True):
            rel = " ".join(link.get("rel", [])).lower()
            link_type = (link.get("type") or "").lower()
            if "alternate" in rel and ("rss" in link_type or "atom" in link_type):
                href = link.get("href")
                resolved = client.resolve_url(seed_url, href or "")
                if resolved:
                    content = client.fetch_text(resolved)
                    urls = _parse_feed_links(content)
                    article_urls = filter_article_urls(urls, seed_url)
                    if article_urls:
                        return DiscoveryResult(method="rss", urls=article_urls)
    except Exception:
        pass

    return DiscoveryResult(method="rss", urls=[])


def _parse_feed_links(content: str) -> list[str]:
    urls: list[str] = []
    try:
        root = ET.fromstring(content)
    except ET.ParseError:
        return urls

    for node in root.iter():
        tag = node.tag.rsplit("}", 1)[-1].lower()
        if tag in {"link", "guid"} and node.text:
            urls.append(node.text.strip())
        if tag == "link" and node.attrib.get("href"):
            urls.append(node.attrib["href"].strip())
    return urls


def discover_from_crawl(client: HttpClient, seed_url: str) -> DiscoveryResult:
    seed_normalized = normalize_url(seed_url)
    queue: deque[tuple[str, int]] = deque([(seed_normalized, 0)])
    visited_pages: set[str] = set()
    article_urls: set[str] = set()

    while queue and len(visited_pages) < CRAWL_MAX_PAGES:
        current_url, depth = queue.popleft()
        if current_url in visited_pages:
            continue
        visited_pages.add(current_url)

        try:
            html = client.fetch_text(current_url)
        except Exception:
            continue

        soup = BeautifulSoup(html, "lxml")
        for anchor in soup.find_all("a", href=True):
            resolved = client.resolve_url(current_url, anchor["href"])
            if not resolved or not client.same_origin(seed_url, resolved):
                continue
            normalized = normalize_url(resolved)
            if looks_like_article(normalized, seed_url):
                article_urls.add(normalized)
            elif depth < CRAWL_MAX_DEPTH:
                path = urlparse(normalized).path.lower()
                is_listing = is_blog_listing_page(normalized)
                if is_listing or (not is_excluded_url(normalized) and "page/" in path):
                    if normalized not in visited_pages:
                        queue.append((normalized, depth + 1))

    return DiscoveryResult(method="crawl", urls=sorted(article_urls))


def discover_articles(client: HttpClient, seed_url: str) -> DiscoveryResult:
    results: list[DiscoveryResult] = []
    for discoverer in (discover_from_sitemaps, discover_from_feed, discover_from_crawl):
        results.append(discoverer(client, seed_url))

    best = max(results, key=lambda item: len(item.urls), default=DiscoveryResult(method="none", urls=[]))
    if best.urls:
        return best
    return DiscoveryResult(method="none", urls=[])
