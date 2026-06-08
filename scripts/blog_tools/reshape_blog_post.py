#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import shutil
import sys
import textwrap
from datetime import date, datetime
from pathlib import Path

from dotenv import load_dotenv
import google.generativeai as genai

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from lib.markdown_output import montar_markdown_final, normalizar_paths_public  # noqa: E402
from lib.prompt_builder import build_prompt  # noqa: E402
from lib.rewrite_profile import (  # noqa: E402
    DEFAULT_PROFILE_NAME,
    ProfileOverrides,
    RewriteProfile,
    apply_overrides,
    load_profile,
)

ROOT_DIR = SCRIPT_DIR.parents[1]
DOTENV_PATH = ROOT_DIR / ".env.local"
TEMPLATE_PATH = ROOT_DIR / "content" / "blog" / ".template.md"
BLOG_OUTPUT_DIR = ROOT_DIR / "content" / "blog"
POSTED_DIR = SCRIPT_DIR / "posted"


def carregar_env() -> None:
    load_dotenv(dotenv_path=DOTENV_PATH, override=False)


def carregar_template(path_template: Path) -> str:
    if not path_template.exists():
        raise FileNotFoundError(f"Template não encontrado: {path_template}")
    return path_template.read_text(encoding="utf-8")


def criar_modelo(api_key: str, model_name: str) -> genai.GenerativeModel:
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(model_name)


def adaptar_artigo(
    model: genai.GenerativeModel,
    profile: RewriteProfile,
    conteudo_original: str,
    template_blog: str,
    data_execucao: str,
) -> str:
    prompt = build_prompt(profile, conteudo_original, template_blog, data_execucao)
    response = model.generate_content(prompt)
    texto = (response.text or "").strip()
    if not texto:
        raise ValueError("Gemini retornou resposta vazia.")
    return texto


def carregar_arquivos_de_lista(path_lista: Path) -> list[Path]:
    if not path_lista.exists() or not path_lista.is_file():
        raise FileNotFoundError(f"Arquivo de lista inexistente: {path_lista}")

    arquivos: list[Path] = []
    for linha in path_lista.read_text(encoding="utf-8").splitlines():
        item = linha.strip()
        if not item or item.startswith("#"):
            continue
        arquivos.append(Path(item.strip('"').strip("'")).expanduser().resolve())
    return arquivos


def deduplicar_paths(paths: list[Path]) -> list[Path]:
    vistos: set[Path] = set()
    resultado: list[Path] = []
    for path in paths:
        if path in vistos:
            continue
        vistos.add(path)
        resultado.append(path)
    return resultado


def processar_arquivos(
    arquivos_markdown: list[Path],
    model: genai.GenerativeModel,
    profile: RewriteProfile,
    template_blog: str,
) -> None:
    BLOG_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    POSTED_DIR.mkdir(parents=True, exist_ok=True)
    data_execucao = date.today().isoformat()
    timestamp_execucao = datetime.now().strftime("%Y%m%d-%H%M%S")

    total = len(arquivos_markdown)
    sucesso = 0
    falha = 0

    print(f"[INFO] Perfil: {profile.name} ({profile.description or 'sem descrição'})")
    print(f"[INFO] Modo de saída: {profile.output.mode}")
    print(f"[INFO] Iniciando processamento de {total} arquivo(s).")
    print(f"[INFO] Saída final: {BLOG_OUTPUT_DIR}")
    print(f"[INFO] Arquivos de entrada processados serão movidos para: {POSTED_DIR}")

    for indice, arquivo in enumerate(arquivos_markdown, start=1):
        print(f"[INFO] ({indice}/{total}) Processando: {arquivo}")
        try:
            if not arquivo.exists() or not arquivo.is_file():
                raise FileNotFoundError(f"Arquivo inexistente: {arquivo}")
            if arquivo.suffix.lower() != ".md":
                raise ValueError("Arquivo não é markdown (.md).")

            conteudo_original = arquivo.read_text(encoding="utf-8")
            markdown_gerado = adaptar_artigo(
                model, profile, conteudo_original, template_blog, data_execucao
            )
            markdown_final = montar_markdown_final(markdown_gerado, profile, data_execucao)
            markdown_final = normalizar_paths_public(markdown_final)

            nome_saida = f"{timestamp_execucao}-{indice:04d}.md"
            caminho_saida = BLOG_OUTPUT_DIR / nome_saida
            caminho_saida.write_text(markdown_final, encoding="utf-8")

            destino_posted = POSTED_DIR / arquivo.name
            if destino_posted.exists():
                destino_posted = POSTED_DIR / f"{arquivo.stem}_{data_execucao}{arquivo.suffix}"
            shutil.move(str(arquivo), str(destino_posted))

            sucesso += 1
            print(f"[OK] Post gerado: {caminho_saida}")
            print(f"[OK] Arquivo de entrada movido para: {destino_posted}")
        except Exception as exc:
            falha += 1
            print(f"[ERRO] Falha ao processar {arquivo}: {exc}")

    print("[RESUMO] Processamento concluído.")
    print(f"[RESUMO] Total: {total} | Sucesso: {sucesso} | Falhas: {falha}")


def coletar_arquivos(args: argparse.Namespace) -> list[Path]:
    arquivos_markdown: list[Path] = [
        Path(item).expanduser().resolve() for item in args.arquivos
    ]

    if args.input_dir:
        pasta_entrada = Path(args.input_dir).expanduser().resolve()
        if not pasta_entrada.exists() or not pasta_entrada.is_dir():
            raise FileNotFoundError(f"Diretório de entrada inexistente: {pasta_entrada}")
        arquivos_markdown.extend(sorted(pasta_entrada.glob("*.md")))

    if args.list_file:
        arquivos_markdown.extend(
            carregar_arquivos_de_lista(Path(args.list_file).expanduser().resolve())
        )

    arquivos_markdown = deduplicar_paths(arquivos_markdown)
    if not arquivos_markdown:
        raise ValueError(
            "Nenhum arquivo informado. Use arquivos posicionais, --input-dir ou --list-file."
        )
    return arquivos_markdown


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Adapta artigos markdown para o contexto de uma marca usando Gemini.",
        epilog=textwrap.dedent(
            """
            Exemplos:
              python scripts/blog_tools/reshape_blog_post.py \\
                --input-dir scripts/blog_tools/post_ideas/comunicare

              python scripts/blog_tools/reshape_blog_post.py \\
                --input-dir scripts/blog_tools/post_ideas/otoclinic \\
                --tone "Didático e acolhedor" \\
                --extra-instructions "Enfatize Philips HearLink sem soar promocional"

              python scripts/blog_tools/reshape_blog_post.py \\
                --list-file scripts/blog_tools/lista_arquivos.txt \\
                --show-prompt
            """
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "arquivos",
        nargs="*",
        help="Lista de paths de arquivos markdown de entrada.",
    )
    parser.add_argument(
        "--api-key",
        default=os.getenv("GOOGLE_API_KEY", "").strip(),
        help="Chave da API do Google Gemini. Se omitido, usa GOOGLE_API_KEY.",
    )
    parser.add_argument(
        "--profile",
        default=DEFAULT_PROFILE_NAME,
        help=f"Nome do perfil em profiles/ (padrão: {DEFAULT_PROFILE_NAME}).",
    )
    parser.add_argument(
        "--config",
        default="",
        help="YAML adicional para merge sobre o perfil base.",
    )
    parser.add_argument(
        "--tone",
        default="",
        help="Sobrescreve voice.tom do perfil.",
    )
    parser.add_argument(
        "--audience",
        default="",
        help="Sobrescreve voice.publico_alvo do perfil.",
    )
    parser.add_argument(
        "--extra-instructions",
        default="",
        help="Instruções adicionais de adaptação (acrescentadas ao perfil).",
    )
    parser.add_argument(
        "--output-mode",
        choices=["full", "body_only"],
        default="",
        help="Modo de saída: full (front matter + corpo) ou body_only.",
    )
    parser.add_argument(
        "--template",
        default=str(TEMPLATE_PATH),
        help="Path para o template markdown do blog.",
    )
    parser.add_argument(
        "--model",
        default="",
        help="Modelo Gemini (padrão: definido no perfil YAML).",
    )
    parser.add_argument(
        "--input-dir",
        default="",
        help="Diretório com arquivos .md para processamento em lote.",
    )
    parser.add_argument(
        "--list-file",
        default="",
        help="Arquivo texto com 1 path por linha para processamento em lote.",
    )
    parser.add_argument(
        "--show-prompt",
        action="store_true",
        help="Exibe o prompt do primeiro arquivo e encerra (sem chamar a API).",
    )
    return parser.parse_args()


def carregar_perfil(args: argparse.Namespace) -> RewriteProfile:
    config_path = Path(args.config).expanduser().resolve() if args.config else None
    profile = load_profile(profile_name=args.profile, config_path=config_path)
    overrides = ProfileOverrides(
        tone=args.tone or None,
        audience=args.audience or None,
        extra_instructions=args.extra_instructions or None,
        output_mode=args.output_mode or None,
        model_name=args.model or None,
    )
    return apply_overrides(profile, overrides)


def main() -> None:
    carregar_env()
    args = parse_args()
    profile = carregar_perfil(args)
    arquivos_markdown = coletar_arquivos(args)
    template_blog = carregar_template(Path(args.template).expanduser().resolve())
    data_execucao = date.today().isoformat()

    if args.show_prompt:
        primeiro = arquivos_markdown[0]
        conteudo = primeiro.read_text(encoding="utf-8")
        prompt = build_prompt(profile, conteudo, template_blog, data_execucao)
        print(f"[INFO] Perfil: {profile.name}")
        print(f"[INFO] Arquivo: {primeiro}")
        print(f"[INFO] Modo de saída: {profile.output.mode}")
        print("--- PROMPT ---")
        print(prompt)
        return

    if not args.api_key:
        raise ValueError(
            f"Informe a chave Gemini com --api-key ou variável de ambiente GOOGLE_API_KEY. "
            f"Arquivo esperado: {DOTENV_PATH}"
        )

    model_name = args.model or profile.model.name
    model = criar_modelo(args.api_key, model_name)
    print(f"[INFO] Modelo Gemini selecionado: {model_name}")
    processar_arquivos(arquivos_markdown, model, profile, template_blog)


if __name__ == "__main__":
    main()
