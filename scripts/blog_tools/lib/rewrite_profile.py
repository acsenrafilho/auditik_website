from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

TOOL_DIR = Path(__file__).resolve().parents[1]
PROFILES_DIR = TOOL_DIR / "profiles"
DEFAULT_PROFILE_NAME = "auditik"
VALID_OUTPUT_MODES = frozenset({"full", "body_only"})
VALID_DATE_FORMATS = frozenset({"date", "iso"})
DEFAULT_FRONTMATTER_FIELDS = [
    "title",
    "description",
    "author",
    "date",
    "topics",
    "featured",
    "featuredImage",
]


@dataclass
class BrandConfig:
    nome: str = ""
    parceiro: str = ""
    contato: str = ""
    endereco: str = ""
    site: str = ""
    app: str = ""
    redes: dict[str, str] = field(default_factory=dict)


@dataclass
class VoiceConfig:
    role: str = ""
    tom: str = ""
    publico_alvo: str = ""
    estilo: str = ""


@dataclass
class AdaptationConfig:
    estrategia: str = ""
    regras: list[str] = field(default_factory=list)
    fatos_produto: list[str] = field(default_factory=list)
    regras_fidelidade: list[str] = field(default_factory=list)
    titulos_proibidos_prefixos: list[str] = field(default_factory=list)
    cta_final: str = ""
    instrucoes_extras: str = ""


@dataclass
class OutputConfig:
    mode: str = "full"
    author: str = "Equipe Auditik"
    featured_image: str = "/images/auditik/blog/blog-placeholder.jpg"
    topics_permitidos: list[str] = field(default_factory=list)
    incluir_referencias: bool = True
    default_title: str = "Artigo"
    default_description: str = "Conteúdo do blog."
    default_topic: str = ""
    # Path relativo a scripts/blog_tools/ ou absoluto
    template: str = "templates/auditik.md"
    # Ordem e campos obrigatórios do front matter (espelha o template)
    frontmatter_fields: list[str] = field(
        default_factory=lambda: [
            "title",
            "description",
            "author",
            "date",
            "topics",
            "featured",
            "featuredImage",
        ]
    )
    # "date" = YYYY-MM-DD | "iso" = YYYY-MM-DDTHH:MM:SS.000Z
    date_format: str = "date"


@dataclass
class ModelConfig:
    name: str = "gemini-2.5-flash-lite"


@dataclass
class RewriteProfile:
    name: str = DEFAULT_PROFILE_NAME
    description: str = ""
    brand: BrandConfig = field(default_factory=BrandConfig)
    voice: VoiceConfig = field(default_factory=VoiceConfig)
    adaptation: AdaptationConfig = field(default_factory=AdaptationConfig)
    output: OutputConfig = field(default_factory=OutputConfig)
    model: ModelConfig = field(default_factory=ModelConfig)

    def validate(self) -> None:
        if self.output.mode not in VALID_OUTPUT_MODES:
            raise ValueError(
                f"output.mode inválido: {self.output.mode!r}. "
                f"Use um de: {', '.join(sorted(VALID_OUTPUT_MODES))}"
            )
        if self.output.date_format not in VALID_DATE_FORMATS:
            raise ValueError(
                f"output.date_format inválido: {self.output.date_format!r}. "
                f"Use um de: {', '.join(sorted(VALID_DATE_FORMATS))}"
            )
        if not self.output.frontmatter_fields:
            raise ValueError("output.frontmatter_fields não pode ser vazio.")
        if "title" not in self.output.frontmatter_fields:
            raise ValueError("output.frontmatter_fields deve incluir 'title'.")


def _deep_merge(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    merged = dict(base)
    for key, value in override.items():
        if (
            key in merged
            and isinstance(merged[key], dict)
            and isinstance(value, dict)
        ):
            merged[key] = _deep_merge(merged[key], value)
        else:
            merged[key] = value
    return merged


def _str_list(value: Any) -> list[str]:
    if not value:
        return []
    return [str(item) for item in value]


def _dict_to_profile(data: dict[str, Any]) -> RewriteProfile:
    brand_data = data.get("brand", {}) or {}
    voice_data = data.get("voice", {}) or {}
    adaptation_data = data.get("adaptation", {}) or {}
    output_data = data.get("output", {}) or {}
    model_data = data.get("model", {}) or {}

    topics_permitidos = _str_list(output_data.get("topics_permitidos"))
    default_topic = str(output_data.get("default_topic", "") or "")
    if not default_topic and topics_permitidos:
        default_topic = topics_permitidos[0]

    return RewriteProfile(
        name=str(data.get("name", DEFAULT_PROFILE_NAME)),
        description=str(data.get("description", "")),
        brand=BrandConfig(
            nome=str(brand_data.get("nome", "")),
            parceiro=str(brand_data.get("parceiro", "")),
            contato=str(brand_data.get("contato", "")),
            endereco=str(brand_data.get("endereco", "")),
            site=str(brand_data.get("site", "")),
            app=str(brand_data.get("app", "")),
            redes={str(k): str(v) for k, v in (brand_data.get("redes") or {}).items()},
        ),
        voice=VoiceConfig(
            role=str(voice_data.get("role", "")),
            tom=str(voice_data.get("tom", "")),
            publico_alvo=str(voice_data.get("publico_alvo", "")),
            estilo=str(voice_data.get("estilo", "")),
        ),
        adaptation=AdaptationConfig(
            estrategia=str(adaptation_data.get("estrategia", "")).strip(),
            regras=_str_list(adaptation_data.get("regras")),
            fatos_produto=_str_list(adaptation_data.get("fatos_produto")),
            regras_fidelidade=_str_list(adaptation_data.get("regras_fidelidade")),
            titulos_proibidos_prefixos=_str_list(
                adaptation_data.get("titulos_proibidos_prefixos")
            ),
            cta_final=str(adaptation_data.get("cta_final", "")).strip(),
            instrucoes_extras=str(adaptation_data.get("instrucoes_extras", "")).strip(),
        ),
        output=OutputConfig(
            mode=str(output_data.get("mode", "full")),
            author=str(output_data.get("author", "Equipe Auditik")),
            featured_image=str(
                output_data.get(
                    "featured_image", "/images/auditik/blog/blog-placeholder.jpg"
                )
            ),
            topics_permitidos=topics_permitidos,
            incluir_referencias=bool(output_data.get("incluir_referencias", True)),
            default_title=str(output_data.get("default_title", "Artigo") or "Artigo"),
            default_description=str(
                output_data.get("default_description", "Conteúdo do blog.")
                or "Conteúdo do blog."
            ),
            default_topic=default_topic,
            template=str(
                output_data.get("template", "templates/auditik.md")
                or "templates/auditik.md"
            ),
            frontmatter_fields=_str_list(output_data.get("frontmatter_fields"))
            or list(DEFAULT_FRONTMATTER_FIELDS),
            date_format=str(output_data.get("date_format", "date") or "date"),
        ),
        model=ModelConfig(name=str(model_data.get("name", "gemini-2.5-flash-lite"))),
    )


def resolve_template_path(template_value: str) -> Path:
    """Resolve template relativo a scripts/blog_tools/, ao repo ou path absoluto."""
    raw = Path(template_value).expanduser()
    if raw.is_absolute():
        return raw.resolve()
    candidatos = [
        (TOOL_DIR / raw).resolve(),
        (TOOL_DIR.parents[1] / raw).resolve(),  # raiz do repo auditik_website
        raw.resolve(),
    ]
    for candidato in candidatos:
        if candidato.exists():
            return candidato
    return candidatos[0]


def load_yaml_file(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise FileNotFoundError(f"Arquivo de perfil não encontrado: {path}")
    with path.open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    if not isinstance(data, dict):
        raise ValueError(f"Perfil YAML inválido (esperado mapping): {path}")
    return data


def resolve_profile_path(profile_name: str) -> Path:
    candidates = [
        PROFILES_DIR / f"{profile_name}.yaml",
        PROFILES_DIR / f"{profile_name}.yml",
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError(
        f"Perfil '{profile_name}' não encontrado em {PROFILES_DIR}. "
        f"Candidatos: {', '.join(p.name for p in candidates)}"
    )


def load_profile(
    profile_name: str = DEFAULT_PROFILE_NAME,
    config_path: Path | None = None,
) -> RewriteProfile:
    base_data = load_yaml_file(resolve_profile_path(profile_name))
    if config_path is not None:
        override_data = load_yaml_file(config_path)
        base_data = _deep_merge(base_data, override_data)
    profile = _dict_to_profile(base_data)
    profile.validate()
    return profile


@dataclass
class ProfileOverrides:
    tone: str | None = None
    audience: str | None = None
    extra_instructions: str | None = None
    output_mode: str | None = None
    model_name: str | None = None


def apply_overrides(profile: RewriteProfile, overrides: ProfileOverrides) -> RewriteProfile:
    if overrides.tone:
        profile.voice.tom = overrides.tone
    if overrides.audience:
        profile.voice.publico_alvo = overrides.audience
    if overrides.extra_instructions:
        extra = overrides.extra_instructions.strip()
        if profile.adaptation.instrucoes_extras:
            profile.adaptation.instrucoes_extras = (
                f"{profile.adaptation.instrucoes_extras.strip()}\n{extra}"
            )
        else:
            profile.adaptation.instrucoes_extras = extra
    if overrides.output_mode:
        profile.output.mode = overrides.output_mode
    if overrides.model_name:
        profile.model.name = overrides.model_name
    profile.validate()
    return profile
