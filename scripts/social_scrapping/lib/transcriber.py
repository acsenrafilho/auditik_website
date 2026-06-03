from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from faster_whisper import WhisperModel

from .config import TranscriberConfig


@lru_cache(maxsize=4)
def _load_model(model_name: str) -> WhisperModel:
    return WhisperModel(model_name, device="cpu", compute_type="int8")


def transcribe_audio(audio_path: Path, config: TranscriberConfig) -> str:
    if not audio_path.exists():
        raise FileNotFoundError(f"Arquivo de áudio não encontrado: {audio_path}")

    model = _load_model(config.model_name)
    segments, _info = model.transcribe(
        str(audio_path),
        language=config.language,
        beam_size=5,
        vad_filter=True,
    )
    text = " ".join(segment.text.strip() for segment in segments if segment.text.strip())
    return text.strip()
