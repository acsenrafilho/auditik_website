from __future__ import annotations

import textwrap

from lib.rewrite_profile import RewriteProfile
from lib.source_brief import SourceBrief, extract_source_brief


_FIDELIDADE_COMUM = [
    "O título SEO deve ser uma reescrita do título da fonte, preservando o formato "
    "(lista numerada, guia, pergunta, comparativo etc.). Não troque o tema do artigo.",
    "A description deve resumir o tema específico deste artigo em 1–2 frases. "
    "Não use um pitch genérico de produto que sirva para qualquer post.",
    "Preserve a tese, a estrutura (subtítulos/listas) e o ângulo único da fonte. "
    "Reescreva com originalidade, sem copiar frase a frase.",
    "Substitua concorrentes/marcas da fonte pela empresa do perfil apenas quando "
    "o trecho for promocional ou de produto. Em conteúdo educativo, foque no tema "
    "e reserve a marca para exemplos leves e o CTA final.",
    "Densidade promocional proporcional ao tipo da fonte: educativo/lista/guia = "
    "marca pontual + CTA no fim; produto = substituição natural da solução citada.",
    "Não invente funcionalidades, preços, estudos, parcerias ou claims fora dos "
    "FATOS DO PRODUTO. Em caso de dúvida, omita.",
    "Não comece todos os títulos com o nome da marca. Varie a formulação.",
]


def _bullets(items: list[str], start: int = 1) -> str:
    return "\n".join(f"{indice}. {item}" for indice, item in enumerate(items, start=start))


def _plain_bullets(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)


def build_prompt(
    profile: RewriteProfile,
    conteudo_original: str,
    template_blog: str,
    data_execucao: str,
    source_brief: SourceBrief | None = None,
    instrucao_regeneracao: str = "",
) -> str:
    brief = source_brief or extract_source_brief(conteudo_original)
    role = (
        profile.voice.role.strip()
        or f"redator especialista em SEO para a marca {profile.brand.nome}"
    )

    fidelidade = list(_FIDELIDADE_COMUM)
    fidelidade.extend(profile.adaptation.regras_fidelidade)
    if profile.adaptation.titulos_proibidos_prefixos:
        prefixos = ", ".join(
            f'"{p}"' for p in profile.adaptation.titulos_proibidos_prefixos
        )
        fidelidade.append(
            f"Não use títulos que comecem com estes prefixos proibidos: {prefixos}."
        )

    secoes: list[str] = [
        f"Você é um {role}.",
        (
            f"MISSÃO: reescreva o artigo de referência para o blog de "
            f"{profile.brand.nome}. A marca contextualiza e torna o texto "
            f"brand-safe; ela NÃO deve substituir o tema nem transformar "
            f"todo artigo em landing page de produto."
        ),
        "",
        "SOURCE_BRIEF (extraído automaticamente da referência — respeite):",
        brief.format_for_prompt(),
        "",
        "CONTEÚDO ORIGINAL (referência completa):",
        conteudo_original.strip(),
        "",
        "CONTRATO DE FIDELIDADE À FONTE:",
        _bullets(fidelidade),
    ]

    if instrucao_regeneracao.strip():
        secoes.extend(
            [
                "",
                "CORREÇÃO OBRIGATÓRIA NESTA REGERAÇÃO:",
                instrucao_regeneracao.strip(),
            ]
        )

    secoes.extend(
        [
            "",
            "CONTEXTO DA MARCA:",
            f"- Empresa: {profile.brand.nome}",
            f"- Parceiro/posicionamento: {profile.brand.parceiro}",
            f"- Contato: {profile.brand.contato}",
            f"- Endereço: {profile.brand.endereco}",
        ]
    )
    if profile.brand.site:
        secoes.append(f"- Site: {profile.brand.site}")
    if profile.brand.app:
        secoes.append(f"- App: {profile.brand.app}")
    for rede, url in profile.brand.redes.items():
        secoes.append(f"- {rede.capitalize()}: {url}")

    if profile.adaptation.fatos_produto:
        secoes.extend(
            [
                "",
                "FATOS DO PRODUTO (brand safety — use só o que estiver aqui):",
                _plain_bullets(profile.adaptation.fatos_produto),
            ]
        )

    secoes.extend(
        [
            "",
            "TOM E PÚBLICO:",
            f"- Tom de voz: {profile.voice.tom}",
            f"- Público-alvo: {profile.voice.publico_alvo}",
            f"- Estilo: {profile.voice.estilo}",
            "",
            "ESTRATÉGIA DE RACIOCÍNIO (aplique internamente, não inclua na resposta):",
            profile.adaptation.estrategia.strip()
            or "Analise a fonte, preserve o ângulo e adapte ao contexto da marca.",
            "",
            "REGRAS DE MARCA / ADAPTAÇÃO:",
            _bullets(profile.adaptation.regras)
            if profile.adaptation.regras
            else "- Adapte linguagem e exemplos ao contexto da marca.",
            "",
            "CTA FINAL:",
            profile.adaptation.cta_final.strip()
            or "Encerre com um CTA alinhado à empresa, adequado ao tema do artigo.",
        ]
    )

    if profile.adaptation.instrucoes_extras:
        secoes.extend(
            [
                "",
                "INSTRUÇÕES ADICIONAIS (usar somente quando o tema justificar):",
                profile.adaptation.instrucoes_extras,
            ]
        )

    if profile.output.mode == "full":
        topicos = _plain_bullets(profile.output.topics_permitidos) or "- (nenhum)"
        schema_lines = [
            "",
            "SCHEMA DE SAÍDA OBRIGATÓRIO:",
            "- Responda SOMENTE em markdown.",
            "- Front matter YAML no topo entre --- e --- (sem cercar com ```).",
            "- Não copie texto de marketing de templates de exemplo.",
            "- Inclua TODOS os campos do cabeçalho do template do perfil, nesta ordem:",
        ]
        for campo in profile.output.frontmatter_fields:
            if campo == "title":
                schema_lines.append('  title: "<titulo SEO fiel à fonte>"')
            elif campo == "slug":
                schema_lines.append(
                    '  slug: "<slug-url-amigavel-gerado-a-partir-do-titulo>"'
                )
            elif campo == "description":
                schema_lines.append(
                    '  description: "<descricao SEO do tema deste artigo, ~150-160 caracteres>"'
                )
            elif campo == "author":
                schema_lines.append(f'  author: "{profile.output.author}"')
            elif campo == "date":
                if profile.output.date_format == "iso":
                    schema_lines.append(
                        f'  date: "{data_execucao}T10:00:00.000Z"'
                    )
                else:
                    schema_lines.append(f'  date: "{data_execucao}"')
            elif campo == "topics":
                schema_lines.append("  topics:")
                schema_lines.append('    - "<topico1>"')
                schema_lines.append('    - "<topico2>"')
            elif campo == "featured":
                schema_lines.append("  featured: false")
            elif campo == "featuredImage":
                schema_lines.append(
                    f'  featuredImage: "{profile.output.featured_image}"'
                )
            else:
                schema_lines.append(f'  {campo}: "<valor>"')

        schema_lines.extend(
            [
                "",
                "TÓPICOS PERMITIDOS (use 1 a 4, sempre desta lista):",
                topicos,
            ]
        )
        secoes.extend(schema_lines)
    else:
        secoes.extend(
            [
                "",
                "SCHEMA DE SAÍDA OBRIGATÓRIO:",
                "- Responda SOMENTE com o corpo do artigo em markdown.",
                "- NÃO inclua front matter YAML.",
                "- Preserve títulos, subtítulos e listas da estrutura adaptada.",
            ]
        )

    # Template apenas como esqueleto estrutural — sem incentivar copy genérica
    secoes.extend(
        [
            "",
            "ESQUELETO ESTRUTURAL DE REFERÊNCIA (ignore textos de exemplo; use só a forma e o cabeçalho):",
            template_blog.strip(),
        ]
    )

    return textwrap.dedent("\n".join(secoes)).strip()
