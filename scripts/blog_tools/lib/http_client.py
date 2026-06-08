from __future__ import annotations

import time
from typing import TYPE_CHECKING
from urllib.parse import urljoin, urlparse

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from lib.config import RETRY_BACKOFF_BASE, USER_AGENT

if TYPE_CHECKING:
    from lib.config import ScraperConfig


class HttpClient:
    def __init__(self, config: ScraperConfig) -> None:
        self.config = config
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
            }
        )
        retry = Retry(
            total=config.max_retries,
            connect=config.max_retries,
            read=config.max_retries,
            backoff_factor=RETRY_BACKOFF_BASE,
            status_forcelist=(429, 500, 502, 503, 504),
            allowed_methods=frozenset({"GET", "HEAD"}),
        )
        adapter = HTTPAdapter(max_retries=retry)
        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)

    def fetch(self, url: str, *, allow_redirects: bool = True) -> requests.Response:
        response = self.session.get(
            url,
            timeout=self.config.timeout,
            allow_redirects=allow_redirects,
        )
        response.raise_for_status()
        if not response.encoding or response.encoding.lower() == "iso-8859-1":
            response.encoding = response.apparent_encoding or "utf-8"
        return response

    def fetch_text(self, url: str) -> str:
        return self.fetch(url).text

    def resolve_url(self, base_url: str, href: str) -> str | None:
        if not href or href.startswith(("#", "mailto:", "tel:", "javascript:")):
            return None
        return urljoin(base_url, href)

    def same_origin(self, seed_url: str, candidate_url: str) -> bool:
        seed = urlparse(seed_url)
        candidate = urlparse(candidate_url)
        seed_host = (seed.netloc or "").lower().lstrip("www.")
        candidate_host = (candidate.netloc or "").lower().lstrip("www.")
        return bool(seed_host and candidate_host and seed_host == candidate_host)
