from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[3]
TOOL_DIR = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT_DIR = TOOL_DIR / "output"
DEFAULT_TMP_DIR = DEFAULT_OUTPUT_DIR / ".tmp"
DEFAULT_CACHE_FILE = DEFAULT_OUTPUT_DIR / ".cache.json"

DEFAULT_DELAY_MIN = 8.0
DEFAULT_DELAY_MAX = 15.0
DEFAULT_WHISPER_MODEL = "base"
DEFAULT_WHISPER_LANGUAGE = "pt"
MAX_RETRIES = 2
RETRY_BACKOFF_BASE = 3.0

SUPPORTED_PLATFORMS = frozenset({"instagram", "facebook"})

ANALYSIS_PROMPT = """Analise os posts de referência abaixo sobre [TÓPICO].
Identifique:
1. Ganchos de abertura mais eficazes (primeiros 3 segundos / primeiras frases)
2. Temas e subtemas recorrentes
3. Tom de voz (educativo, emocional, provocativo, etc.)
4. CTAs e estruturas narrativas
5. Oportunidades de conteúdo para a Auditik (Philips HearLink) que ainda não foram exploradas
6. Ranking dos 3 posts com maior potencial de adaptação para nosso público (idosos + familiares, Piracicaba/região)"""


@dataclass
class ExtractorConfig:
    cookies_file: str | None = None
    cookies_from_browser: str | None = None
    tmp_dir: Path = field(default_factory=lambda: DEFAULT_TMP_DIR)
    max_retries: int = MAX_RETRIES


@dataclass
class TranscriberConfig:
    model_name: str = DEFAULT_WHISPER_MODEL
    language: str = DEFAULT_WHISPER_LANGUAGE


@dataclass
class PostData:
    url: str
    platform: str
    status: str = "ok"
    error: str | None = None
    title: str | None = None
    description: str | None = None
    uploader: str | None = None
    view_count: int | None = None
    like_count: int | None = None
    duration: float | None = None
    transcription: str | None = None
    has_audio: bool = False
    extracted_at: str | None = None

    def to_dict(self) -> dict:
        return {
            "url": self.url,
            "platform": self.platform,
            "status": self.status,
            "error": self.error,
            "title": self.title,
            "description": self.description,
            "uploader": self.uploader,
            "view_count": self.view_count,
            "like_count": self.like_count,
            "duration": self.duration,
            "transcription": self.transcription,
            "has_audio": self.has_audio,
            "extracted_at": self.extracted_at,
        }
