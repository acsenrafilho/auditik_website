from __future__ import annotations

import textwrap

from lib.rewrite_profile import RewriteProfile


def build_prompt(
    profile: RewriteProfile,
    conteudo_original: str,
    template_blog: str,
    data_execucao: str,
) -> str:
    topicos_formatados = "\n".join(
        f"- {topico}" for topico in profile.output.topics_permitidos
    )
    regras_formatadas = "\n".join(
        f"{indice}. {regra}"
        for indice, regra in enumerate(profile.adaptation.regras, start=1)
    )
    secoes: list[str] = [
        "Você é um redator especialista em SEO e saúde auditiva.",
        f"Reescreva e adapte o markdown de entrada para o contexto da empresa {profile.brand.nome}.",
        "",
        "CONTEXTO DA MARCA:",
        f"- Empresa: {profile.brand.nome}",
        f"- Parceiro/licenciamento: {profile.brand.parceiro}",
        f"- Contato: {profile.brand.contato}",
        f"- Endereço: {profile.brand.endereco}",
    ]
    for rede, url in profile.brand.redes.items():
        secoes.append(f"- {rede.capitalize()}: {url}")

    secoes.extend(
        [
            "",
            "TOM E PÚBLICO:",
            f"- Tom de voz: {profile.voice.tom}",
            f"- Público-alvo: {profile.voice.publico_alvo}",
            f"- Estilo: {profile.voice.estilo}",
            "",
            "ESTRATÉGIA DE RACIOCÍNIO (aplique internamente, não inclua na resposta):",
            profile.adaptation.estrategia,
            "",
            "REGRAS DE ADAPTAÇÃO:",
            regras_formatadas,
            "",
            "CTA FINAL OBRIGATÓRIO:",
            profile.adaptation.cta_final,
        ]
    )

    if profile.adaptation.instrucoes_extras:
        secoes.extend(
            [
                "",
                "INSTRUÇÕES ADICIONAIS:",
                profile.adaptation.instrucoes_extras,
            ]
        )

    if profile.output.mode == "full":
        secoes.extend(
            [
                "",
                "REGRAS DE SAÍDA OBRIGATÓRIAS:",
                "- Responda SOMENTE em markdown.",
                "- Use front matter YAML no topo entre --- e ---.",
                "- Siga o padrão do template.",
                "- Estrutura mínima esperada no front matter:",
                '  title: "<titulo SEO>"',
                '  description: "<descricao SEO>"',
                f'  author: "{profile.output.author}"',
                f'  date: "{data_execucao}"',
                "  topics:",
                '    - "<topico1>"',
                '    - "<topico2>"',
                "  featured: false",
                f'  featuredImage: "{profile.output.featured_image}"',
                "",
                "TÓPICOS PERMITIDOS (use 1 a 4, sempre desta lista):",
                topicos_formatados,
            ]
        )
    else:
        secoes.extend(
            [
                "",
                "REGRAS DE SAÍDA OBRIGATÓRIAS:",
                "- Responda SOMENTE com o corpo do artigo em markdown.",
                "- NÃO inclua front matter YAML.",
                "- Preserve títulos, subtítulos e listas.",
            ]
        )

    secoes.extend(
        [
            "",
            "TEMPLATE DE REFERÊNCIA:",
            template_blog,
            "",
            "CONTEÚDO ORIGINAL:",
            conteudo_original,
        ]
    )

    return textwrap.dedent("\n".join(secoes)).strip()
