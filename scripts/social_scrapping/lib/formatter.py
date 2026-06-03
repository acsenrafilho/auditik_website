from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from .config import ANALYSIS_PROMPT, PostData


def _format_metric(value: int | float | None, suffix: str = "") -> str:
    if value is None:
        return "N/A"
    if isinstance(value, float) and value.is_integer():
        value = int(value)
    return f"{value}{suffix}"


def _format_duration(seconds: float | None) -> str:
    if seconds is None:
        return "N/A"
    total = int(seconds)
    minutes, secs = divmod(total, 60)
    if minutes:
        return f"{minutes}m {secs}s"
    return f"{secs}s"


def format_post_section(post: PostData, index: int, total: int) -> str:
    lines = [
        f"## Post {index}/{total} — {post.platform}",
        "",
        f"**URL:** {post.url}",
    ]

    if post.status != "ok":
        lines.extend(["", f"**Status:** {post.status}"])
        if post.error:
            lines.append(f"**Erro:** {post.error}")
        lines.extend(["", "---", ""])
        return "\n".join(lines)

    if post.uploader:
        lines.append(f"**Autor:** {post.uploader}")
    lines.append(
        f"**Views:** {_format_metric(post.view_count)} | **Duração:** {_format_duration(post.duration)}"
    )
    if post.like_count is not None:
        lines.append(f"**Curtidas:** {_format_metric(post.like_count)}")

    lines.extend(["", "### Legenda", ""])
    lines.append(post.description.strip() if post.description else "_Legenda não encontrada._")

    lines.extend(["", "### Transcrição do áudio", ""])
    if post.transcription:
        lines.append(f'"{post.transcription.strip()}"')
    elif post.has_audio:
        lines.append("_Transcrição indisponível._")
    else:
        lines.append("_Post sem áudio (imagem/carrossel)._")

    lines.extend(
        [
            "",
            "### Metadados",
            "",
            f"- Plataforma: {post.platform} | Extraído: {post.extracted_at or 'N/A'}",
            "",
            "---",
            "",
        ]
    )
    return "\n".join(lines)


def build_executive_summary(posts: list[PostData]) -> str:
    blocks: list[str] = []
    for index, post in enumerate(posts, start=1):
        if post.status != "ok":
            continue
        caption = (post.description or "").strip() or "[sem legenda]"
        transcription = (post.transcription or "").strip() or "[sem transcrição]"
        blocks.append(
            "\n".join(
                [
                    f"POST {index} ({post.platform}) — {post.url}",
                    f"Autor: {post.uploader or 'N/A'}",
                    f"Legenda: {caption}",
                    f"Transcrição: {transcription}",
                ]
            )
        )
    return "\n\n".join(blocks)


def build_markdown_report(
    posts: list[PostData],
    generated_at: datetime,
    success_count: int,
    failure_count: int,
) -> str:
    total = len(posts)
    header = "\n".join(
        [
            "# Relatório de referências sociais — Auditik",
            "",
            f"Gerado em: {generated_at.strftime('%Y-%m-%d %H:%M')} | URLs: {total} | Sucesso: {success_count} | Falhas: {failure_count}",
            "",
            "---",
            "",
        ]
    )

    sections = [format_post_section(post, index, total) for index, post in enumerate(posts, start=1)]
    summary = build_executive_summary(posts)

    footer = "\n".join(
        [
            "## Resumo executivo (para colar na IA)",
            "",
            "Instrução sugerida:",
            "",
            "```",
            ANALYSIS_PROMPT,
            "```",
            "",
            summary or "_Nenhum post processado com sucesso._",
            "",
        ]
    )
    return header + "\n".join(sections) + footer


def build_json_report(
    posts: list[PostData],
    generated_at: datetime,
    success_count: int,
    failure_count: int,
) -> dict:
    return {
        "generated_at": generated_at.isoformat(),
        "total": len(posts),
        "success_count": success_count,
        "failure_count": failure_count,
        "analysis_prompt": ANALYSIS_PROMPT,
        "posts": [post.to_dict() for post in posts],
    }


def write_reports(
    posts: list[PostData],
    output_dir: Path,
    timestamp: datetime,
) -> tuple[Path, Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    stamp = timestamp.strftime("%Y%m%d-%H%M%S")
    success_count = sum(1 for post in posts if post.status == "ok")
    failure_count = len(posts) - success_count

    markdown_path = output_dir / f"relatorio_{stamp}.md"
    json_path = output_dir / f"relatorio_{stamp}.json"

    markdown_path.write_text(
        build_markdown_report(posts, timestamp, success_count, failure_count),
        encoding="utf-8",
    )
    json_path.write_text(
        json.dumps(build_json_report(posts, timestamp, success_count, failure_count), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return markdown_path, json_path
