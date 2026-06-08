from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

TOOL_DIR = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_DIR = TOOL_DIR / "post_ideas"
DEFAULT_CACHE_FILE = DEFAULT_OUTPUT_DIR / ".scrape_cache.json"

DEFAULT_DELAY_MIN = 2.0
DEFAULT_DELAY_MAX = 5.0
DEFAULT_TIMEOUT = 30
MAX_RETRIES = 3
RETRY_BACKOFF_BASE = 2.0

MIN_BODY_CHARS = 300
CRAWL_MAX_DEPTH = 3
CRAWL_MAX_PAGES = 50
SITEMAP_MAX_URLS = 2000

USER_AGENT = (
    "Mozilla/5.0 (compatible; AuditikBlogScraper/1.0; +https://auditik.com.br)"
)

EXCLUDED_PATH_FRAGMENTS = (
    "/tag/",
    "/tags/",
    "/category/",
    "/categoria/",
    "/author/",
    "/cart",
    "/carrinho",
    "/contato",
    "/contact",
    "/login",
    "/wp-admin",
    "/wp-json",
    "/feed/",
    "/comments/",
    "/cdn-cgi/",
    "/#",
)

STATIC_PAGE_SLUGS = frozenset({
    "empresa",
    "produtos",
    "contato",
    "localizacao",
    "servicos",
    "acessorios",
    "aparelhosauditivos",
    "blog",
    "blog-otoclinic",
    "compre-online",
    "customer-account",
    "cart",
    "carrinho",
    "home",
    "index",
})

EXCLUDED_EXTENSIONS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".pdf",
    ".zip",
    ".mp4",
    ".mp3",
    ".svg",
    ".css",
    ".js",
)

BLOG_PATH_HINTS = (
    "/blog/",
    "/blog-",
    "/artigo/",
    "/post/",
    "/noticia/",
    "/noticias/",
)


@dataclass
class ScraperConfig:
    output_dir: Path = field(default_factory=lambda: DEFAULT_OUTPUT_DIR)
    cache_file: Path = field(default_factory=lambda: DEFAULT_CACHE_FILE)
    delay_min: float = DEFAULT_DELAY_MIN
    delay_max: float = DEFAULT_DELAY_MAX
    timeout: int = DEFAULT_TIMEOUT
    max_retries: int = MAX_RETRIES
    max_articles: int | None = None
    use_playwright: bool = True
    resume: bool = False
    force: bool = False


@dataclass
class ArticleData:
    url: str
    title: str
    body: str
    date: str | None = None
    status: str = "ok"
    error: str | None = None

    def to_dict(self) -> dict:
        return {
            "url": self.url,
            "title": self.title,
            "body": self.body,
            "date": self.date,
            "status": self.status,
            "error": self.error,
        }


@dataclass
class ValidationResult:
    seed_url: str
    domain: str
    site_slug: str
    method: str
    article_count: int
    sample_ok: bool
    sample_title: str | None
    sample_body_chars: int
    status: str
    message: str
    article_urls: list[str] = field(default_factory=list)
