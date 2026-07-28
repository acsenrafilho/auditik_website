from __future__ import annotations

import re
import unicodedata

from lib.rewrite_profile import RewriteProfile

_FENCE_OPEN = re.compile(r"^(```(?:yaml|yml|markdown|md)?)\s*$", re.IGNORECASE)


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_value.lower()).strip("-")
    return slug or "post"


def _parse_yaml_block(yaml_str: str) -> dict[str, object]:
    frontmatter: dict[str, object] = {}
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
    return frontmatter


def _parece_frontmatter_yaml(texto: str) -> bool:
    amostra = texto.lstrip()
    return bool(
        re.match(r"(?i)(---\s*\n)?title\s*:", amostra)
        or re.match(r"(?i)---\s*\n", amostra)
    )


def _unwrap_leading_fence(body: str) -> tuple[str, dict[str, object]]:
    """Remove cerca de código no início; se o interior for YAML de meta, parseia."""
    linhas = body.splitlines()
    if not linhas or not _FENCE_OPEN.match(linhas[0].strip()):
        return body, {}

    end_idx: int | None = None
    if len(linhas) >= 3 and linhas[-1].strip() == "```":
        end_idx = len(linhas) - 1
    else:
        for idx in range(1, len(linhas)):
            if linhas[idx].strip() == "```":
                end_idx = idx
                break

    if end_idx is None:
        return body, {}

    interno = "\n".join(linhas[1:end_idx]).strip()
    resto = "\n".join(linhas[end_idx + 1 :]).strip()

    if interno.startswith("---"):
        partes = interno.split("---", 2)
        if len(partes) >= 3:
            fm = _parse_yaml_block(partes[1].strip())
            interno_corpo = partes[2].strip()
            corpo = "\n\n".join(x for x in (interno_corpo, resto) if x).strip()
            return corpo, fm
        combined = f"{interno}\n\n{resto}".strip() if resto else interno
        return combined, {}

    if _parece_frontmatter_yaml(interno):
        fm = _parse_yaml_block(interno)
        return resto, fm

    combined = f"{interno}\n\n{resto}".strip() if resto else interno
    return combined, {}


def extrair_frontmatter_e_corpo(markdown: str) -> tuple[dict[str, object], str]:
    body, fm_fence = _unwrap_leading_fence(markdown.strip())
    if fm_fence:
        # Pode ainda haver --- no corpo; preferir campos já parseados da fence
        if body.startswith("---"):
            fm2, corpo = extrair_frontmatter_e_corpo(body)
            merged = {**fm2, **{k: v for k, v in fm_fence.items() if v}}
            return merged, corpo
        return fm_fence, body

    # Front matter em fence no meio do documento
    if not body.startswith("---") and "```" in body:
        match = re.search(
            r"```(?:yaml|yml)?\s*\n(?:---\s*\n)?(.*?)\n(?:---\s*\n)?```",
            body,
            flags=re.DOTALL | re.IGNORECASE,
        )
        if match and _parece_frontmatter_yaml(match.group(1)):
            bloco = match.group(1).strip()
            if bloco.startswith("---"):
                partes = bloco.split("---", 2)
                yaml_str = partes[1].strip() if len(partes) >= 3 else bloco
            else:
                yaml_str = bloco
            frontmatter = _parse_yaml_block(yaml_str)
            corpo = (body[: match.start()] + body[match.end() :]).strip()
            return frontmatter, corpo

    if body.startswith("---"):
        partes = body.split("---", 2)
        if len(partes) >= 3:
            frontmatter = _parse_yaml_block(partes[1].strip())
            resto, fm_extra = _unwrap_leading_fence(partes[2].strip())
            if fm_extra:
                for key, value in fm_extra.items():
                    if key not in frontmatter or not frontmatter.get(key):
                        frontmatter[key] = value
            if resto.startswith("---"):
                fm2, corpo2 = extrair_frontmatter_e_corpo(resto)
                if frontmatter.get("title"):
                    return frontmatter, corpo2
                merged = {**fm2, **frontmatter}
                return merged, corpo2
            return frontmatter, resto

    return {}, body


def normalizar_topicos(
    valor: object,
    topics_permitidos: list[str],
    default_topic: str = "",
) -> list[str]:
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
        fallback = default_topic or (topics_permitidos[0] if topics_permitidos else "geral")
        if fallback in permitidos or not permitidos:
            topicos = [fallback]
        else:
            topicos = [topics_permitidos[0]]
    return topicos[:4]


def _formatar_frontmatter_yaml(
    frontmatter: dict[str, object],
    field_order: list[str] | None = None,
) -> str:
    linhas = ["---"]
    order = field_order or [
        "title",
        "slug",
        "description",
        "author",
        "date",
        "topics",
        "featured",
        "featuredImage",
    ]
    written: set[str] = set()
    quoted_keys = {"title", "slug", "description", "author", "featuredImage", "date"}

    for key in order:
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
        elif key in quoted_keys:
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
        elif key == "featured":
            linhas.append(f"featured: {str(value).lower()}")
        else:
            linhas.append(f'{key}: "{value}"')

    linhas.append("---")
    return "\n".join(linhas)


def titulo_normalizado(titulo: str) -> str:
    return re.sub(r"\s+", " ", titulo.strip().lower())


def titulo_tem_prefixo_proibido(titulo: str, prefixos: list[str]) -> bool:
    t = titulo.strip()
    for prefixo in prefixos:
        if t.lower().startswith(prefixo.strip().lower()):
            return True
    return False


def extrair_titulo_gerado(markdown: str, profile: RewriteProfile) -> str:
    frontmatter, _ = extrair_frontmatter_e_corpo(markdown)
    titulo = str(frontmatter.get("title") or "").strip()
    return titulo or profile.output.default_title


def _formatar_data(profile: RewriteProfile, data_execucao: str, bruto: object) -> str:
    valor = str(bruto or "").strip()
    if profile.output.date_format == "iso":
        if re.match(r"^\d{4}-\d{2}-\d{2}T", valor):
            return valor
        dia = valor[:10] if re.match(r"^\d{4}-\d{2}-\d{2}", valor) else data_execucao
        return f"{dia}T10:00:00.000Z"
    if re.match(r"^\d{4}-\d{2}-\d{2}", valor):
        return valor[:10]
    return data_execucao


def _resolver_slug(frontmatter: dict[str, object], titulo: str) -> str:
    bruto = str(frontmatter.get("slug") or "").strip()
    if bruto:
        return slugify(bruto)
    return slugify(titulo)


def montar_markdown_final(
    markdown_gerado: str,
    profile: RewriteProfile,
    data_execucao: str,
) -> str:
    frontmatter, body = extrair_frontmatter_e_corpo(markdown_gerado)
    # Se o corpo ainda começar com fence yaml órfã, limpar
    if body.lstrip().startswith("```"):
        body2, fm2 = _unwrap_leading_fence(body)
        body = body2
        for key, value in fm2.items():
            if key not in frontmatter or not frontmatter.get(key):
                frontmatter[key] = value
        if body.startswith("---"):
            fm3, body = extrair_frontmatter_e_corpo(body)
            for key, value in fm3.items():
                if key not in frontmatter or not frontmatter.get(key):
                    frontmatter[key] = value

    corpo_limpo = body.strip() or "## Introdução\n\nConteúdo em adaptação."

    if profile.output.mode == "body_only":
        return corpo_limpo

    topicos = normalizar_topicos(
        frontmatter.get("topics"),
        profile.output.topics_permitidos,
        default_topic=profile.output.default_topic,
    )
    featured_raw = frontmatter.get("featured", False)
    if isinstance(featured_raw, str):
        featured = featured_raw.strip().lower() in {"true", "1", "yes"}
    else:
        featured = bool(featured_raw)

    titulo = str(frontmatter.get("title") or profile.output.default_title).strip()
    campos = {
        "title": titulo,
        "slug": _resolver_slug(frontmatter, titulo),
        "description": frontmatter.get("description")
        or profile.output.default_description,
        "author": frontmatter.get("author") or profile.output.author,
        "date": _formatar_data(profile, data_execucao, frontmatter.get("date")),
        "topics": topicos,
        "featured": featured,
        "featuredImage": frontmatter.get("featuredImage")
        or profile.output.featured_image,
    }

    # Preservar apenas os campos definidos no template do perfil, na ordem correta
    frontmatter_final: dict[str, object] = {}
    for key in profile.output.frontmatter_fields:
        if key in campos:
            frontmatter_final[key] = campos[key]
        elif key in frontmatter and frontmatter[key] not in (None, ""):
            frontmatter_final[key] = frontmatter[key]

    yaml_block = _formatar_frontmatter_yaml(
        frontmatter_final,
        field_order=profile.output.frontmatter_fields,
    )
    return f"{yaml_block}\n\n{corpo_limpo}"


def normalizar_paths_public(markdown: str) -> str:
    return re.sub(r'(?i)(featuredImage:\s*["\'])/public/', r"\1/", markdown)
