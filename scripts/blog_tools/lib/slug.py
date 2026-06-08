from __future__ import annotations

import re
import unicodedata
from urllib.parse import urlparse


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_value.lower()).strip("-")
    return slug or "artigo-sem-titulo"


def slug_from_domain(url: str) -> str:
    parsed = urlparse(url)
    host = (parsed.netloc or "").lower()
    if host.startswith("www."):
        host = host[4:]
    host = host.split(":")[0]
    label = host.split(".")[0] if host else "site"
    return slugify(label) or "site"


def unique_filename_slug(base_slug: str, used: set[str]) -> str:
    candidate = base_slug
    counter = 2
    while candidate in used:
        candidate = f"{base_slug}-{counter}"
        counter += 1
    used.add(candidate)
    return candidate
