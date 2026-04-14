"""
General-purpose CRM Lead Proxy Lambda (multi-client).

Purpose
- Receives lead data from public websites/apps.
- Injects secure CRM API key server-side.
- Forwards normalized payload to each client's CRM integration endpoint.

Why this exists
- Frontend apps must NEVER expose CRM secrets (X-Api-Key).
- This proxy provides one reusable integration layer for multiple clients.

Expected incoming payload (from frontend)
{
  "fullName": "Joao Silva",
  "phone": "(19) 99999-0000",
  "city": "Piracicaba",
  "companyID": "COMP001",       # optional when default_company_id exists
  "source": "Website Home"       # optional, proxy can enrich
}

Expected headers
- Content-Type: application/json
- X-Client-Id: <client key configured in CLIENT_CONFIG_JSON>

Example deployment strategy
- API Gateway (HTTP API)
- Lambda proxy integration
- Optional WAF/rate limiting
- Secrets in AWS Secrets Manager or SSM Parameter Store
"""

from __future__ import annotations

import json
import os
import re
import urllib.error
import urllib.request
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

import boto3


# -----------------------------
# Config and data structures
# -----------------------------

REQUIRED_FIELDS = ["fullName", "phone", "city"]
PHONE_DIGITS_MIN = 10
PHONE_DIGITS_MAX = 13
DEFAULT_TIMEOUT_SECONDS = 10


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


@dataclass
class ClientConfig:
    target_url: str
    api_key_secret_name: str
    allowed_origins: List[str]
    default_company_id: Optional[str] = None
    source_prefix: Optional[str] = None


# Cache clients/secrets in-memory for warm invocations.
_CLIENTS_CACHE: Optional[Dict[str, ClientConfig]] = None
_SECRET_CACHE: Dict[str, str] = {}


# -----------------------------
# Response helpers
# -----------------------------

def _response(status_code: int, body: Dict[str, Any], origin: str = "*") -> Dict[str, Any]:
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Headers": "Content-Type,X-Client-Id",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
        },
        "body": json.dumps(body, ensure_ascii=False),
    }


def _normalize_origin(headers: Dict[str, Any]) -> str:
    return str(headers.get("origin") or headers.get("Origin") or "").strip()


# -----------------------------
# Configuration loading
# -----------------------------

def _load_clients_config() -> Dict[str, ClientConfig]:
    global _CLIENTS_CACHE
    if _CLIENTS_CACHE is not None:
        return _CLIENTS_CACHE

    raw = os.environ.get("CLIENT_CONFIG_JSON", "").strip()
    if not raw:
        raise RuntimeError("CLIENT_CONFIG_JSON is required")

    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"CLIENT_CONFIG_JSON is invalid JSON: {exc}") from exc

    if not isinstance(parsed, dict) or not parsed:
        raise RuntimeError("CLIENT_CONFIG_JSON must be a non-empty JSON object")

    clients: Dict[str, ClientConfig] = {}
    for client_id, cfg in parsed.items():
        if not isinstance(cfg, dict):
            raise RuntimeError(f"Client config for '{client_id}' must be an object")

        target_url = str(cfg.get("target_url", "")).strip()
        api_key_secret_name = str(cfg.get("api_key_secret_name", "")).strip()
        allowed_origins = cfg.get("allowed_origins", [])

        if not target_url or not api_key_secret_name:
            raise RuntimeError(
                f"Client '{client_id}' must define target_url and api_key_secret_name"
            )
        if not isinstance(allowed_origins, list):
            raise RuntimeError(f"Client '{client_id}' allowed_origins must be a list")

        clients[client_id] = ClientConfig(
            target_url=target_url,
            api_key_secret_name=api_key_secret_name,
            allowed_origins=[str(item).strip() for item in allowed_origins if str(item).strip()],
            default_company_id=(
                str(cfg.get("default_company_id", "")).strip() or None
            ),
            source_prefix=(str(cfg.get("source_prefix", "")).strip() or None),
        )

    _CLIENTS_CACHE = clients
    return clients


# -----------------------------
# Secret retrieval
# -----------------------------

def _get_secret_value(secret_name: str) -> str:
    if secret_name in _SECRET_CACHE:
        return _SECRET_CACHE[secret_name]

    region = os.environ.get("AWS_REGION", "us-east-1")
    client = boto3.client("secretsmanager", region_name=region)

    secret_resp = client.get_secret_value(SecretId=secret_name)
    value = secret_resp.get("SecretString", "")
    if not value:
        raise RuntimeError(f"Secret '{secret_name}' not found or empty")

    _SECRET_CACHE[secret_name] = value
    return value


# -----------------------------
# Validation / transformation
# -----------------------------

def _extract_headers(event: Dict[str, Any]) -> Dict[str, Any]:
    headers = event.get("headers") or {}
    return headers if isinstance(headers, dict) else {}


def _extract_body(event: Dict[str, Any]) -> Dict[str, Any]:
    body = event.get("body")
    if body is None or body == "":
        raise ValueError("Request body is required")

    if isinstance(body, str):
        try:
            parsed = json.loads(body)
        except json.JSONDecodeError as exc:
            raise ValueError(f"Invalid JSON payload: {exc}") from exc
    elif isinstance(body, dict):
        parsed = body
    else:
        raise ValueError("Request body must be a JSON object")

    if not isinstance(parsed, dict):
        raise ValueError("Request body must be a JSON object")

    return parsed


def _normalize_phone(phone_raw: str) -> str:
    digits = re.sub(r"\D", "", phone_raw)
    if len(digits) < PHONE_DIGITS_MIN or len(digits) > PHONE_DIGITS_MAX:
        raise ValueError("Phone must have a valid number of digits")

    # Normalize to +55... when no country code is present and looks Brazilian.
    if len(digits) in (10, 11):
        return f"+55{digits}"
    if digits.startswith("55"):
        return f"+{digits}"
    return f"+{digits}"


def _validate_payload(payload: Dict[str, Any]) -> None:
    missing = [field for field in REQUIRED_FIELDS if not str(payload.get(field, "")).strip()]
    if missing:
        raise ValueError(f"Missing required fields: {', '.join(missing)}")

    full_name = str(payload.get("fullName", "")).strip()
    if len(full_name) > 100:
        raise ValueError("fullName must be at most 100 characters")


def _build_forward_payload(payload: Dict[str, Any], cfg: ClientConfig) -> Dict[str, Any]:
    full_name = str(payload.get("fullName", "")).strip()
    phone = _normalize_phone(str(payload.get("phone", "")))
    city = str(payload.get("city", "")).strip()

    company_id = str(payload.get("companyID", "")).strip() or (cfg.default_company_id or "")
    if not company_id:
        raise ValueError("companyID is required (or configure default_company_id for client)")

    source = str(payload.get("source", "")).strip() or "Website Lead"
    if cfg.source_prefix:
        source = f"{cfg.source_prefix} - {source}"

    # Payload aligned with target CRM integration lambda contract.
    return {
        "fullName": full_name,
        "phone": phone,
        "city": city,
        "companyID": company_id,
        "source": source,
    }


# -----------------------------
# Forwarding
# -----------------------------

def _forward_to_crm(url: str, api_key: str, body: Dict[str, Any]) -> Dict[str, Any]:
    request = urllib.request.Request(
        url=url,
        data=json.dumps(body).encode("utf-8"),
        method="POST",
        headers={
            "Content-Type": "application/json",
            "X-Api-Key": api_key,
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=DEFAULT_TIMEOUT_SECONDS) as resp:
            raw = resp.read().decode("utf-8")
            parsed = json.loads(raw) if raw else {}
            return {"status": resp.getcode(), "body": parsed}
    except urllib.error.HTTPError as err:
        raw = err.read().decode("utf-8") if err.fp else ""
        parsed = json.loads(raw) if raw else {}
        return {
            "status": err.code,
            "body": parsed if isinstance(parsed, dict) else {"message": "CRM request failed"},
        }


# -----------------------------
# Lambda entrypoint
# -----------------------------

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    headers = _extract_headers(event)
    origin = _normalize_origin(headers) or "*"

    # Handle CORS preflight.
    method = str(event.get("httpMethod") or event.get("requestContext", {}).get("http", {}).get("method") or "").upper()
    if method == "OPTIONS":
        return _response(200, {"message": "ok"}, origin=origin)

    if method != "POST":
        return _response(405, {"message": "Method not allowed"}, origin=origin)

    try:
        clients = _load_clients_config()

        client_id = str(headers.get("x-client-id") or headers.get("X-Client-Id") or "").strip()
        if not client_id or client_id not in clients:
            return _response(401, {"message": "Invalid or missing X-Client-Id"}, origin=origin)

        cfg = clients[client_id]

        # Basic origin restriction per client.
        if cfg.allowed_origins and origin not in cfg.allowed_origins:
            return _response(403, {"message": "Origin not allowed"}, origin=origin)

        payload = _extract_body(event)
        _validate_payload(payload)

        forward_payload = _build_forward_payload(payload, cfg)
        api_key = _get_secret_value(cfg.api_key_secret_name)

        crm_resp = _forward_to_crm(cfg.target_url, api_key, forward_payload)
        status = int(crm_resp.get("status", 500))
        body = crm_resp.get("body") if isinstance(crm_resp.get("body"), dict) else {}

        if 200 <= status < 300:
            return _response(
                201,
                {
                    "message": "Lead forwarded successfully",
                    "clientId": client_id,
                    "timestamp": _now_iso(),
                    "crm": body,
                },
                origin=origin,
            )

        return _response(
            status,
            {
                "message": body.get("message", "CRM rejected request"),
                "clientId": client_id,
                "timestamp": _now_iso(),
            },
            origin=origin,
        )

    except ValueError as exc:
        return _response(400, {"message": str(exc)}, origin=origin)
    except Exception:
        # Do not leak internals in response.
        return _response(
            500,
            {
                "message": "Unexpected proxy error",
                "timestamp": _now_iso(),
            },
            origin=origin,
        )
