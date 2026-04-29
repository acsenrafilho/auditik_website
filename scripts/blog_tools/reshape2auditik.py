import argparse
import os
import re
import shutil
import textwrap
import unicodedata
from datetime import date, datetime
from pathlib import Path
from dotenv import load_dotenv

import google.generativeai as genai

ROOT_DIR = Path(__file__).resolve().parents[2]
DOTENV_PATH = ROOT_DIR / ".env.local"
TEMPLATE_PATH = ROOT_DIR / "content" / "blog" / ".template.md"
BLOG_OUTPUT_DIR = ROOT_DIR / "content" / "blog"
POSTED_DIR = ROOT_DIR / "scripts" / "blog_tools" / "posted"
DEFAULT_FEATURED_IMAGE = "/images/auditik/blog/blog-placeholder.jpg"
MODEL_NAME = "gemini-2.5-flash-lite"


def carregar_env() -> None:
    # Carrega explicitamente o .env.local da raiz do projeto.
    load_dotenv(dotenv_path=DOTENV_PATH, override=False)

DADOS_EMPRESA = {
    "nome": "Auditik Soluções Auditivas",
    "parceiro": "licenciada exclusiva da Philips Aparelhos Auditivos",
    "contato": "(19) 3377-6941",
    "endereco": "Nossos endereços são na Rua Samuel Neves, 1800, Piracicaba/SP, Rua Luíza Meneghel Mancine, 72 - Sala 12, Americana/SP, Rua Malaquias Guerra, 290, São Pedro/SP, Avenida Brasil, 151, Charqueada/SP",
    "tom_voz": "Profissional, empático, focado em tecnologia e qualidade de vida",
    "cta_final": "Aloque o CTA mais adequado para o contexto do artigo. Sugestões são: 1) Agende uma avaliação gratuita na Auditik e experimente a tecnologia Philips HearLink. 2) Entre em contato com a Auditik para mais informações. 3) Compartilhe o artigo com amigos e familiares. 4) Leia mais sobre a Philips HearLink e a Auditik. 5) Siga nossas redes sociais e fique por dentro das novidades.",
    "facebook": "https://www.facebook.com/auditik.piracicaba",
    "instagram": "https://www.instagram.com/auditik.piracicaba",
    "youtube": "https://www.youtube.com/@auditik"
}

TOPICOS_PADRONIZADOS = [
    "tecnologia-auditiva",
    "saude-e-bem-estar",
    "perda-auditiva",
    "diagnostico-e-prevencao",
    "guia-do-usuario",
    "manutencao-e-cuidados",
    "adaptacao-auditiva",
    "zumbido-no-ouvido",
    "acessorios-e-conectividade",
    "estilo-de-vida",
]


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value)
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_value.lower()).strip("-")
    return slug or "post-auditik"


def carregar_template(path_template: Path) -> str:
    if not path_template.exists():
        raise FileNotFoundError(f"Template nao encontrado: {path_template}")
    return path_template.read_text(encoding="utf-8")


def construir_prompt(conteudo_original: str, template_blog: str, data_execucao: str) -> str:
    topicos_formatados = "\n".join(f"- {topico}" for topico in TOPICOS_PADRONIZADOS)
    return textwrap.dedent(
        f"""
        Você é um redator especialista em SEO e saúde auditiva.
        Reescreva e adapte o markdown de entrada para o contexto da empresa {DADOS_EMPRESA['nome']}.

        CONTEXTO DA EMPRESA:
        - Empresa: {DADOS_EMPRESA['nome']}
        - Parceiro/licenciamento: {DADOS_EMPRESA['parceiro']}
        - Contato: {DADOS_EMPRESA['contato']}
        - Endereço: {DADOS_EMPRESA['endereco']}
        - Tom de voz: {DADOS_EMPRESA['tom_voz']}
        - CTA final obrigatório: {DADOS_EMPRESA['cta_final']}

        REGRAS DE ADAPTAÇÃO:
        1. Troque linguagem e informações para o contexto da Auditik, removendo menções a concorrentes.
        2. Preserve estrutura markdown clara e legível (títulos, subtítulos, listas).
        3. O resultado deve ser útil para quem busca orientação auditiva, com foco em confiança e clareza.
        4. O corpo deve terminar com CTA alinhado à empresa.
        5. Tomar cuidado com a acentuação da lingua portuguesa.
        6. Não inclua marcadores ```yaml para o cabeçalho. Deve estar totalmente direcionado para a estrutura de cabeçalho presente no arquivo .template.md.
        7. Se houver referências de sites e artigos científicos que sejam relevantes para a explicação e embasamento do artigo, inclua-as no corpo do artigo. Inclua uma seção final chamada "Referências" com as referências citadas e coloque o link de acesso a elas.

        REGRAS DE SAÍDA OBRIGATÓRIAS:
        - Responda SOMENTE em markdown.
        - Use front matter YAML no topo entre --- e ---.
        - Siga o padrão do template.
        - Estrutura mínima esperada no front matter:
          title: "<titulo SEO>"
          description: "<descricao SEO>"
          author: "Equipe Auditik"
          date: "{data_execucao}"
          topics:
            - "<topico1>"
            - "<topico2>"
          featured: false
          featuredImage: "{DEFAULT_FEATURED_IMAGE}"

        TOPICOS PERMITIDOS (use 1 a 4, sempre desta lista):
        {topicos_formatados}

        TEMPLATE DE REFERÊNCIA:
        {template_blog}

        CONTEÚDO ORIGINAL:
        {conteudo_original}
        """
    ).strip()


def adaptar_artigo(model: genai.GenerativeModel, conteudo_original: str, template_blog: str, data_execucao: str) -> str:
    prompt = construir_prompt(conteudo_original, template_blog, data_execucao)
    response = model.generate_content(prompt)
    texto = (response.text or "").strip()
    if not texto:
        raise ValueError("Gemini retornou resposta vazia.")
    return texto


def extrair_frontmatter_e_corpo(markdown: str) -> tuple[dict[str, object], str]:
    frontmatter = {}
    body = markdown.strip()

    # Gemini pode retornar markdown inteiro dentro de code fence (```yaml, ```markdown).
    # Removemos esse invólucro para extrair front matter corretamente.
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
                    topicos = []
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


def normalizar_topicos(valor: object) -> list[str]:
    if isinstance(valor, str):
        candidatos = [valor]
    elif isinstance(valor, list):
        candidatos = [str(v) for v in valor]
    else:
        candidatos = []

    permitidos = set(TOPICOS_PADRONIZADOS)
    topicos = []
    for item in candidatos:
        slug = slugify(item)
        if slug in permitidos and slug not in topicos:
            topicos.append(slug)
    if not topicos:
        topicos = ["perda-auditiva"]
    return topicos[:4]


def montar_markdown_final(markdown_gerado: str, data_execucao: str) -> str:
    _, body = extrair_frontmatter_e_corpo(markdown_gerado)

    corpo_limpo = body.strip() or "## Introdução\n\nConteúdo em adaptação."

    return corpo_limpo


def normalizar_paths_public(markdown: str) -> str:
    # Em Next.js, arquivos em public/ são servidos a partir da raiz (/).
    return re.sub(r'(?i)(featuredImage:\s*["\'])/public/', r"\1/", markdown)


def criar_modelo(api_key: str, model_name: str) -> genai.GenerativeModel:
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(model_name)


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


def processar_arquivos(arquivos_markdown: list[Path], model: genai.GenerativeModel, template_blog: str) -> None:
    BLOG_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    POSTED_DIR.mkdir(parents=True, exist_ok=True)
    data_execucao = date.today().isoformat()
    timestamp_execucao = datetime.now().strftime("%Y%m%d-%H%M%S")

    total = len(arquivos_markdown)
    sucesso = 0
    falha = 0

    print(f"[INFO] Iniciando processamento de {total} arquivo(s).")
    print(f"[INFO] Saída final: {BLOG_OUTPUT_DIR}")
    print(f"[INFO] Arquivos de entrada processados serão movidos para: {POSTED_DIR}")

    for indice, arquivo in enumerate(arquivos_markdown, start=1):
        print(f"[INFO] ({indice}/{total}) Processando: {arquivo}")
        try:
            if not arquivo.exists() or not arquivo.is_file():
                raise FileNotFoundError(f"Arquivo inexistente: {arquivo}")
            if arquivo.suffix.lower() != ".md":
                raise ValueError("Arquivo nao e markdown (.md).")

            conteudo_original = arquivo.read_text(encoding="utf-8")
            markdown_gerado = adaptar_artigo(model, conteudo_original, template_blog, data_execucao)
            markdown_final = montar_markdown_final(markdown_gerado, data_execucao)
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

    print("[RESUMO] Processamento concluido.")
    print(f"[RESUMO] Total: {total} | Sucesso: {sucesso} | Falhas: {falha}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Adapta artigos markdown para o contexto Auditik usando Gemini.",
        epilog=textwrap.dedent(
            """
            Exemplos recomendados para lote (evita Permission denied por quebra de linha no shell):
              python scripts/blog_tools/reshape2auditik.py --input-dir "scripts/blog_tools/post_ideas/artigos_backup_auditik"
              python scripts/blog_tools/reshape2auditik.py --list-file "scripts/blog_tools/lista_arquivos.txt"

            Exemplo com arquivos individuais:
              python scripts/blog_tools/reshape2auditik.py "arquivo 1.md" "arquivo 2.md"
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
        help="Chave da API do Google Gemini. Se omitido, usa variável de ambiente GOOGLE_API_KEY.",
    )
    parser.add_argument(
        "--template",
        default=str(TEMPLATE_PATH),
        help="Path para o template markdown do blog.",
    )
    parser.add_argument(
        "--model",
        default=MODEL_NAME,
        help=f"Modelo Gemini para geração (padrão: {MODEL_NAME}).",
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
    return parser.parse_args()


def main() -> None:
    carregar_env()
    args = parse_args()
    if not args.api_key:
        raise ValueError(
            f"Informe a chave Gemini com --api-key ou variável de ambiente GOOGLE_API_KEY. "
            f"Arquivo esperado: {DOTENV_PATH}"
        )

    arquivos_markdown: list[Path] = [Path(item).expanduser().resolve() for item in args.arquivos]

    if args.input_dir:
        pasta_entrada = Path(args.input_dir).expanduser().resolve()
        if not pasta_entrada.exists() or not pasta_entrada.is_dir():
            raise FileNotFoundError(f"Diretorio de entrada inexistente: {pasta_entrada}")
        arquivos_markdown.extend(sorted(pasta_entrada.glob("*.md")))

    if args.list_file:
        arquivos_markdown.extend(carregar_arquivos_de_lista(Path(args.list_file).expanduser().resolve()))

    arquivos_markdown = deduplicar_paths(arquivos_markdown)
    if not arquivos_markdown:
        raise ValueError(
            "Nenhum arquivo informado. Use arquivos posicionais, --input-dir ou --list-file."
        )

    template_blog = carregar_template(Path(args.template).expanduser().resolve())
    model = criar_modelo(args.api_key, args.model)
    print(f"[INFO] Modelo Gemini selecionado: {args.model}")
    processar_arquivos(arquivos_markdown, model, template_blog)


if __name__ == "__main__":
    main()