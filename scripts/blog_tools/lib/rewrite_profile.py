from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml

TOOL_DIR = Path(__file__).resolve().parents[1]
PROFILES_DIR = TOOL_DIR / "profiles"
DEFAULT_PROFILE_NAME = "auditik"
VALID_OUTPUT_MODES = frozenset({"full", "body_only"})


@dataclass
class BrandConfig:
    nome: str = ""
    parceiro: str = ""
    contato: str = ""
    endereco: str = ""
    redes: dict[str, str] = field(default_factory=dict)


@dataclass
class VoiceConfig:
    tom: str = ""
    publico_alvo: str = ""
    estilo: str = ""


@dataclass
class AdaptationConfig:
    estrategia: str = ""
    regras: list[str] = field(default_factory=list)
    cta_final: str = ""
    instrucoes_extras: str = ""


@dataclass
class OutputConfig:
    mode: str = "full"
    author: str = "Equipe Auditik"
    featured_image: str = "/images/auditik/blog/blog-placeholder.jpg"
    topics_permitidos: list[str] = field(default_factory=list)
    incluir_referencias: bool = True


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


def _dict_to_profile(data: dict[str, Any]) -> RewriteProfile:
    brand_data = data.get("brand", {}) or {}
    voice_data = data.get("voice", {}) or {}
    adaptation_data = data.get("adaptation", {}) or {}
    output_data = data.get("output", {}) or {}
    model_data = data.get("model", {}) or {}

    return RewriteProfile(
        name=str(data.get("name", DEFAULT_PROFILE_NAME)),
        description=str(data.get("description", "")),
        brand=BrandConfig(
            nome=str(brand_data.get("nome", "")),
            parceiro=str(brand_data.get("parceiro", "")),
            contato=str(brand_data.get("contato", "")),
            endereco=str(brand_data.get("endereco", "")),
            redes={str(k): str(v) for k, v in (brand_data.get("redes") or {}).items()},
        ),
        voice=VoiceConfig(
            tom=str(voice_data.get("tom", "")),
            publico_alvo=str(voice_data.get("publico_alvo", "")),
            estilo=str(voice_data.get("estilo", "")),
        ),
        adaptation=AdaptationConfig(
            estrategia=str(adaptation_data.get("estrategia", "")).strip(),
            regras=[str(r) for r in (adaptation_data.get("regras") or [])],
            cta_final=str(adaptation_data.get("cta_final", "")).strip(),
            instrucoes_extras=str(adaptation_data.get("instrucoes_extras", "")).strip(),
        ),
        output=OutputConfig(
            mode=str(output_data.get("mode", "full")),
            author=str(output_data.get("author", "Equipe Auditik")),
            featured_image=str(
                output_data.get("featured_image", "/images/auditik/blog/blog-placeholder.jpg")
            ),
            topics_permitidos=[
                str(t) for t in (output_data.get("topics_permitidos") or [])
            ],
            incluir_referencias=bool(output_data.get("incluir_referencias", True)),
        ),
        model=ModelConfig(name=str(model_data.get("name", "gemini-2.5-flash-lite"))),
    )


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
