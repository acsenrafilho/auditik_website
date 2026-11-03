#!/usr/bin/env bash
# Ensure the Auditik CloudFront distribution sends HSTS without preload.
#
# Creates or updates the custom response headers policy defined in
# infra/cloudfront-response-headers-hsts.json and attaches it to the default
# cache behavior when the distribution has no policy, or when the attached
# policy lacks Strict-Transport-Security.
#
# If a non-managed custom policy is already attached and already has HSTS,
# this script leaves it alone (does not replace CORS or other custom headers).
#
# Usage:
#   CLOUDFRONT_DISTRIBUTION_ID=E... ./scripts/ensure-cloudfront-hsts.sh
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
POLICY_FILE="${REPO_ROOT}/infra/cloudfront-response-headers-hsts.json"
POLICY_NAME="$(jq -r '.Name' "${POLICY_FILE}")"
DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"

if [[ -z "${DISTRIBUTION_ID}" ]]; then
  echo "CLOUDFRONT_DISTRIBUTION_ID is required." >&2
  exit 2
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required." >&2
  exit 2
fi

find_policy_id_by_name() {
  aws cloudfront list-response-headers-policies --type custom \
    --query "ResponseHeadersPolicyList.Items[?ResponseHeadersPolicy.ResponseHeadersPolicyConfig.Name=='${POLICY_NAME}'].ResponseHeadersPolicy.Id" \
    --output text 2>/dev/null | awk '{print $1}'
}

create_or_update_policy() {
  local existing_id config_tmp etag
  existing_id="$(find_policy_id_by_name || true)"
  config_tmp="$(mktemp)"
  jq '{ResponseHeadersPolicyConfig: .}' "${POLICY_FILE}" >"${config_tmp}"

  if [[ -n "${existing_id}" && "${existing_id}" != "None" ]]; then
    etag="$(aws cloudfront get-response-headers-policy --id "${existing_id}" --query ETag --output text)"
    aws cloudfront update-response-headers-policy \
      --id "${existing_id}" \
      --if-match "${etag}" \
      --response-headers-policy-config "file://${config_tmp}" \
      --query 'ResponseHeadersPolicy.Id' --output text
  else
    aws cloudfront create-response-headers-policy \
      --response-headers-policy-config "file://${config_tmp}" \
      --query 'ResponseHeadersPolicy.Id' --output text
  fi
  rm -f "${config_tmp}"
}

policy_has_hsts() {
  local policy_id="$1"
  local preload max_age include_sub
  local cfg
  cfg="$(aws cloudfront get-response-headers-policy --id "${policy_id}" \
    --query 'ResponseHeadersPolicy.ResponseHeadersPolicyConfig.SecurityHeadersConfig.StrictTransportSecurity' \
    --output json 2>/dev/null || echo 'null')"
  if [[ "${cfg}" == "null" || -z "${cfg}" ]]; then
    return 1
  fi
  max_age="$(jq -r '.AccessControlMaxAgeSec // 0' <<<"${cfg}")"
  include_sub="$(jq -r '.IncludeSubdomains // false' <<<"${cfg}")"
  preload="$(jq -r '.Preload // false' <<<"${cfg}")"
  if [[ "${max_age}" -ge 31536000 && "${include_sub}" == "true" && "${preload}" == "false" ]]; then
    return 0
  fi
  return 1
}

attach_policy() {
  local policy_id="$1"
  local tmp etag current
  tmp="$(mktemp)"
  aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" >"${tmp}"
  etag="$(jq -r '.ETag' "${tmp}")"
  current="$(jq -r '.DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId // empty' "${tmp}")"

  if [[ "${current}" == "${policy_id}" ]]; then
    echo "Distribution ${DISTRIBUTION_ID} already uses policy ${policy_id}."
    rm -f "${tmp}"
    return 0
  fi

  jq --arg policy_id "${policy_id}" \
    '.DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId = $policy_id | .DistributionConfig' \
    "${tmp}" >"${tmp}.config"

  aws cloudfront update-distribution \
    --id "${DISTRIBUTION_ID}" \
    --if-match "${etag}" \
    --distribution-config "file://${tmp}.config" >/dev/null

  rm -f "${tmp}" "${tmp}.config"
  echo "Attached response headers policy ${policy_id} to distribution ${DISTRIBUTION_ID}."
}

main() {
  local dist_tmp current_policy desired_policy
  dist_tmp="$(mktemp)"
  aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" >"${dist_tmp}"
  current_policy="$(jq -r '.DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId // empty' "${dist_tmp}")"
  rm -f "${dist_tmp}"

  if [[ -n "${current_policy}" ]] && policy_has_hsts "${current_policy}"; then
    echo "Distribution ${DISTRIBUTION_ID} already has HSTS (no preload) on policy ${current_policy}. Leaving it in place."
    exit 0
  fi

  desired_policy="$(create_or_update_policy)"
  echo "Ensured custom policy ${POLICY_NAME} → ${desired_policy}"

  if [[ -n "${current_policy}" && "${current_policy}" != "${desired_policy}" ]]; then
    echo "Replacing previous ResponseHeadersPolicyId ${current_policy} with ${desired_policy} (previous policy lacked matching HSTS)."
  fi

  attach_policy "${desired_policy}"
  echo "CloudFront propagation may take several minutes."
}

main
