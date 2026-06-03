from __future__ import annotations

import re
import time
import uuid
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import yt_dlp

from .config import ExtractorConfig, PostData, RETRY_BACKOFF_BASE, SUPPORTED_PLATFORMS


def detect_platform(url: str) -> str:
    host = urlparse(url).netloc.lower()
    if "instagram.com" in host:
        return "instagram"
    if "facebook.com" in host or "fb.watch" in host or "fb.com" in host:
        return "facebook"
    return "unknown"


def validate_url(url: str) -> None:
    platform = detect_platform(url)
    if platform not in SUPPORTED_PLATFORMS:
        raise ValueError(
            f"URL não suportada: {url}. Plataformas aceitas: {', '.join(sorted(SUPPORTED_PLATFORMS))}."
        )


def _build_base_opts(config: ExtractorConfig) -> dict[str, Any]:
    opts: dict[str, Any] = {
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "socket_timeout": 30,
    }
    if config.cookies_file:
        opts["cookiefile"] = config.cookies_file
    if config.cookies_from_browser:
        opts["cookiesfrombrowser"] = (config.cookies_from_browser,)
    return opts


def _coerce_int(value: Any) -> int | None:
    if value is None:
        return None
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def _coerce_float(value: Any) -> float | None:
    if value is None:
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _extract_metadata(info: dict[str, Any], url: str) -> PostData:
    platform = detect_platform(url)
    description = info.get("description") or info.get("caption") or info.get("title")
    return PostData(
        url=url,
        platform=platform,
        title=info.get("title"),
        description=description,
        uploader=info.get("uploader") or info.get("channel") or info.get("uploader_id"),
        view_count=_coerce_int(info.get("view_count")),
        like_count=_coerce_int(info.get("like_count")),
        duration=_coerce_float(info.get("duration")),
        has_audio=_has_audio_track(info),
    )


def _has_audio_track(info: dict[str, Any]) -> bool:
    duration = _coerce_float(info.get("duration"))
    if duration and duration > 0:
        return True

    ext = (info.get("ext") or "").lower()
    if ext in {"jpg", "jpeg", "png", "webp", "gif"}:
        return False

    vcodec = info.get("vcodec")
    acodec = info.get("acodec")
    if acodec and acodec != "none":
        return True
    if vcodec and vcodec != "none":
        return True

    return False


def _is_retryable_error(exc: Exception) -> bool:
    message = str(exc).lower()
    retry_markers = (
        "timeout",
        "timed out",
        "connection",
        "network",
        "429",
        "503",
        "502",
        "temporarily unavailable",
    )
    return any(marker in message for marker in retry_markers)


def fetch_metadata(url: str, config: ExtractorConfig) -> tuple[dict[str, Any], PostData]:
    validate_url(url)
    last_error: Exception | None = None

    for attempt in range(config.max_retries + 1):
        try:
            opts = _build_base_opts(config)
            with yt_dlp.YoutubeDL(opts) as ydl:
                info = ydl.extract_info(url, download=False)
            if not info:
                raise RuntimeError("yt-dlp não retornou metadados.")
            return info, _extract_metadata(info, url)
        except Exception as exc:
            last_error = exc
            if attempt >= config.max_retries or not _is_retryable_error(exc):
                break
            time.sleep(RETRY_BACKOFF_BASE * (2**attempt))

    raise RuntimeError(f"Falha ao obter metadados: {last_error}") from last_error


def download_audio(url: str, config: ExtractorConfig) -> Path | None:
    validate_url(url)
    config.tmp_dir.mkdir(parents=True, exist_ok=True)
    output_stem = config.tmp_dir / f"audio_{uuid.uuid4().hex}"

    opts = _build_base_opts(config)
    opts.update(
        {
            "format": "bestaudio/best",
            "outtmpl": str(output_stem) + ".%(ext)s",
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }
            ],
        }
    )

    last_error: Exception | None = None
    for attempt in range(config.max_retries + 1):
        try:
            with yt_dlp.YoutubeDL(opts) as ydl:
                info = ydl.extract_info(url, download=True)
            if not info:
                return None

            candidates = sorted(config.tmp_dir.glob(f"{output_stem.name}.*"))
            audio_files = [path for path in candidates if path.suffix.lower() in {".mp3", ".m4a", ".wav", ".webm", ".ogg"}]
            if audio_files:
                return audio_files[0]

            mp3_path = output_stem.with_suffix(".mp3")
            if mp3_path.exists():
                return mp3_path
            return None
        except Exception as exc:
            last_error = exc
            if attempt >= config.max_retries or not _is_retryable_error(exc):
                break
            time.sleep(RETRY_BACKOFF_BASE * (2**attempt))
        finally:
            for path in config.tmp_dir.glob(f"{output_stem.name}.*"):
                if path.suffix.lower() not in {".mp3", ".m4a", ".wav", ".webm", ".ogg"}:
                    path.unlink(missing_ok=True)

    message = str(last_error) if last_error else "download de áudio falhou"
    if re.search(r"no video|unsupported url|login|private", message, re.I):
        return None
    raise RuntimeError(f"Falha ao baixar áudio: {message}") from last_error


def cleanup_temp_file(path: Path | None) -> None:
    if path and path.exists():
        path.unlink(missing_ok=True)
