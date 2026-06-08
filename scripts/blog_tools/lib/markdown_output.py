from __future__ import annotations

import re
import unicodedata

from lib.rewrite_profile import RewriteProfile


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_value.lower()).strip("-")
    return slug or "post-auditik"


def extrair_frontmatter_e_corpo(markdown: str) -> tuple[dict[str, object], str]:
    frontmatter: dict[str, object] = {}
    body = markdown.strip()

    if body.startswith("```"):
        linhas = body.splitlines()
        if len(linhas) >= 3 and linhas[-1].strip() == "```":
            primeira = linhas[0].strip().lower()
            if primeira in {"```", "```yaml", "```yml", "```markdown", "```md"}:
                body = "\n".join(linhas[1:-1]).strip()

    if body.startswith("---"):
        partes = body.split("---", 2)
        if len(partes) >= 3:
            yaml_str = partes[1].strip()
            body = partes[2].strip()
            linhas = [linha.rstrip() for linha in yaml_str.splitlines()]
            i = 0
            while i < len(linhas):
                linha = linhas[i].strip()
                if not linha:
                    i += 1
                    continue
                if linha.startswith("topics:"):
                    topicos: list[str] = []
                    i += 1
                    while i < len(linhas):
                        atual = linhas[i].strip()
                        if atual.startswith("- "):
                            valor = atual[2:].strip().strip('"').strip("'")
                            if valor:
                                topicos.append(valor)
                            i += 1
                        else:
                            break
                    frontmatter["topics"] = topicos
                    continue
                if ":" in linha:
                    chave, valor = linha.split(":", 1)
                    frontmatter[chave.strip()] = valor.strip().strip('"').strip("'")
                i += 1
    return frontmatter, body


def normalizar_topicos(valor: object, topics_permitidos: list[str]) -> list[str]:
    if isinstance(valor, str):
        candidatos = [valor]
    elif isinstance(valor, list):
        candidatos = [str(v) for v in valor]
    else:
        candidatos = []

    permitidos = set(topics_permitidos)
    topicos: list[str] = []
    for item in candidatos:
        slug = slugify(item)
        if slug in permitidos and slug not in topicos:
            topicos.append(slug)
    if not topicos:
        topicos = ["perda-auditiva"]
    return topicos[:4]


def _formatar_frontmatter_yaml(frontmatter: dict[str, object]) -> str:
    linhas = ["---"]
    field_order = ("title", "description", "author", "date", "topics", "featured", "featuredImage")
    written: set[str] = set()

    for key in field_order:
        if key not in frontmatter:
            continue
        written.add(key)
        value = frontmatter[key]
        if key == "topics" and isinstance(value, list):
            linhas.append("topics:")
            for topico in value:
                linhas.append(f'  - "{topico}"')
        elif key == "featured":
            linhas.append(f"featured: {str(value).lower()}")
        elif key in {"title", "description", "author", "featuredImage"}:
            linhas.append(f'{key}: "{value}"')
        else:
            linhas.append(f"{key}: {value}")

    for key, value in frontmatter.items():
        if key in written:
            continue
        if isinstance(value, list):
            linhas.append(f"{key}:")
            for item in value:
                linhas.append(f'  - "{item}"')
        else:
            linhas.append(f'{key}: "{value}"')

    linhas.append("---")
    return "\n".join(linhas)


def montar_markdown_final(
    markdown_gerado: str,
    profile: RewriteProfile,
    data_execucao: str,
) -> str:
    frontmatter, body = extrair_frontmatter_e_corpo(markdown_gerado)
    corpo_limpo = body.strip() or "## Introdução\n\nConteúdo em adaptação."

    if profile.output.mode == "body_only":
        return corpo_limpo

    topicos = normalizar_topicos(
        frontmatter.get("topics"),
        profile.output.topics_permitidos,
    )
    featured_raw = frontmatter.get("featured", False)
    if isinstance(featured_raw, str):
        featured = featured_raw.strip().lower() in {"true", "1", "yes"}
    else:
        featured = bool(featured_raw)

    frontmatter_final: dict[str, object] = {
        "title": frontmatter.get("title") or "Artigo Auditik",
        "description": frontmatter.get("description") or "Conteúdo sobre saúde auditiva.",
        "author": frontmatter.get("author") or profile.output.author,
        "date": frontmatter.get("date") or data_execucao,
        "topics": topicos,
        "featured": featured,
        "featuredImage": frontmatter.get("featuredImage") or profile.output.featured_image,
    }

    yaml_block = _formatar_frontmatter_yaml(frontmatter_final)
    return f"{yaml_block}\n\n{corpo_limpo}"


def normalizar_paths_public(markdown: str) -> str:
    return re.sub(r'(?i)(featuredImage:\s*["\'])/public/', r"\1/", markdown)
