from __future__ import annotations

import json
from pathlib import Path

from lib.config import ArticleData
from lib.slug import slugify, unique_filename_slug


def build_markdown(article: ArticleData) -> str:
    lines = [
        "---",
        f'title: "{_escape_yaml(article.title)}"',
        f'source: "{_escape_yaml(article.url)}"',
    ]
    if article.date:
        lines.append(f'date: "{_escape_yaml(article.date)}"')
    lines.extend(["---", "", article.body.strip(), ""])
    return "\n".join(lines)


def _escape_yaml(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def save_article(
    article: ArticleData,
    output_dir: Path,
    *,
    used_slugs: set[str],
) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    base_slug = slugify(article.title)
    filename_slug = unique_filename_slug(base_slug, used_slugs)
    path = output_dir / f"{filename_slug}.md"
    path.write_text(build_markdown(article), encoding="utf-8")
    return path


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
