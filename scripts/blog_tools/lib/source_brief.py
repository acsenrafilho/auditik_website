from __future__ import annotations

import re
from dataclasses import dataclass, field


@dataclass
class SourceBrief:
    titulo_fonte: str = ""
    headings: list[str] = field(default_factory=list)
    abertura: str = ""
    tipo_aproximado: str = "educativo"

    def format_for_prompt(self) -> str:
        headings_txt = (
            "\n".join(f"- {h}" for h in self.headings)
            if self.headings
            else "- (nenhum subtítulo detectado)"
        )
        abertura = self.abertura or "(abertura não detectada)"
        return "\n".join(
            [
                f"- Título da fonte: {self.titulo_fonte or '(sem título)'}",
                f"- Tipo aproximado: {self.tipo_aproximado}",
                "- Subtítulos detectados:",
                headings_txt,
                f"- Abertura: {abertura}",
            ]
        )


_FRONTMATTER_TITLE = re.compile(
    r'(?im)^\s*title\s*:\s*["\']?(.*?)["\']?\s*$'
)
_HEADING = re.compile(r"(?m)^(#{1,3})\s+(.+?)\s*$")
_LISTA_PAT = re.compile(
    r"(?i)\b(\d+)\s*(dicas|ideias|passos|estrategias|estratégias|erros|"
    r"filmes|livros|maneiras|formas|motivos|sinais)\b"
)
_GUIA_PAT = re.compile(
    r"(?i)\b(o que [ée]|como\s+\w+|guia|aprenda|entenda|saiba)\b"
)
_PRODUTO_PAT = re.compile(
    r"(?i)\b(crm|saas|plataforma|software|ferramenta|whatsapp|"
    r"automacao|automação|pipeline|teste\s+gr[aá]tis|"
    r"melhor\s+crm|leads360|nectar|doctoralia|hearlink|"
    r"aparelho\s+auditivo)\b"
)


def _strip_frontmatter(markdown: str) -> tuple[dict[str, str], str]:
    body = markdown.strip()
    meta: dict[str, str] = {}
    if not body.startswith("---"):
        return meta, body
    partes = body.split("---", 2)
    if len(partes) < 3:
        return meta, body
    for linha in partes[1].splitlines():
        if ":" not in linha:
            continue
        chave, valor = linha.split(":", 1)
        meta[chave.strip().lower()] = valor.strip().strip('"').strip("'")
    return meta, partes[2].strip()


def _primeiro_paragrafo(corpo: str, max_chars: int = 420) -> str:
    blocos = re.split(r"\n\s*\n", corpo)
    for bloco in blocos:
        texto = bloco.strip()
        if not texto:
            continue
        if texto.startswith("#") or texto.startswith("```") or texto.startswith("---"):
            continue
        if texto.startswith("- ") or texto.startswith("* "):
            continue
        texto = re.sub(r"\s+", " ", texto)
        if len(texto) > max_chars:
            return texto[: max_chars - 1].rstrip() + "…"
        return texto
    return ""


def _inferir_tipo(titulo: str, corpo: str) -> str:
    amostra = f"{titulo}\n{corpo[:2000]}"
    if _LISTA_PAT.search(amostra):
        return "lista"
    if _PRODUTO_PAT.search(titulo) or (
        _PRODUTO_PAT.search(amostra) and re.search(r"(?i)\b(melhor|conheça|teste)\b", titulo)
    ):
        return "produto"
    if _GUIA_PAT.search(titulo):
        return "guia"
    return "educativo"


def extract_source_brief(markdown: str) -> SourceBrief:
    meta, corpo = _strip_frontmatter(markdown)

    titulo = meta.get("title", "").strip()
    if not titulo:
        match_h1 = re.search(r"(?m)^#\s+(.+?)\s*$", corpo)
        if match_h1:
            titulo = match_h1.group(1).strip()
        else:
            match_fm = _FRONTMATTER_TITLE.search(markdown)
            if match_fm:
                titulo = match_fm.group(1).strip()

    headings: list[str] = []
    for match in _HEADING.finditer(corpo):
        nivel, texto = match.group(1), match.group(2).strip()
        if nivel == "#" and texto.lower() == titulo.lower():
            continue
        headings.append(texto)
        if len(headings) >= 12:
            break

    # Fontes scrapadas muitas vezes não têm ## — listas numeradas ou linhas-rótulo
    if not headings:
        for linha in corpo.splitlines():
            limpa = linha.strip()
            if not limpa:
                continue
            num = re.match(r"^(\d+)[\.\)]\s+(.+)$", limpa)
            if num and 4 <= len(num.group(2)) <= 90:
                headings.append(num.group(2).strip())
            elif limpa.endswith(":") and 8 <= len(limpa) <= 80 and not limpa.startswith("-"):
                headings.append(limpa.rstrip(":"))
            if len(headings) >= 12:
                break

    abertura = _primeiro_paragrafo(corpo)
    tipo = _inferir_tipo(titulo, corpo)

    return SourceBrief(
        titulo_fonte=titulo,
        headings=headings,
        abertura=abertura,
        tipo_aproximado=tipo,
    )
