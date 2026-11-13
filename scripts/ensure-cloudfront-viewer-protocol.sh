#!/usr/bin/env bash
# Let the viewer-request function see HTTP.
#
# CloudFront's redirect-to-https policy answers http://www.auditik.com.br with
# https://www.auditik.com.br before the function runs, so the apex canonical
# redirect becomes a second hop. Behaviors that already associate a
# viewer-request CloudFront Function move from redirect-to-https to allow-all.
# The function then returns one 301 to https://auditik.com.br/...
# Behaviors without that function are left unchanged.
#
# Usage:
#   CLOUDFRONT_DISTRIBUTION_ID=E... ./scripts/ensure-cloudfront-viewer-protocol.sh
#
set -euo pipefail

DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"

if [[ -z "${DISTRIBUTION_ID}" ]]; then
  echo "CLOUDFRONT_DISTRIBUTION_ID is required." >&2
  exit 2
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required." >&2
  exit 2
fi

tmp="$(mktemp)"
aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" >"${tmp}"
etag="$(jq -r '.ETag' "${tmp}")"

jq '
  def has_viewer_fn:
    ((.FunctionAssociations.Items // [])
      | map(select(.EventType == "viewer-request"))
      | length) > 0;
  def relax:
    if has_viewer_fn and .ViewerProtocolPolicy == "redirect-to-https"
    then .ViewerProtocolPolicy = "allow-all"
    else .
    end;
  .DistributionConfig
  | .DefaultCacheBehavior |= relax
  | if ((.CacheBehaviors.Quantity // 0) > 0)
    then .CacheBehaviors.Items |= map(relax)
    else .
    end
' "${tmp}" >"${tmp}.config"

if cmp -s <(jq -S '.DistributionConfig' "${tmp}") <(jq -S '.' "${tmp}.config"); then
  echo "Distribution ${DISTRIBUTION_ID} already lets the viewer-request function see HTTP."
  rm -f "${tmp}" "${tmp}.config"
  exit 0
fi

aws cloudfront update-distribution \
  --id "${DISTRIBUTION_ID}" \
  --if-match "${etag}" \
  --distribution-config "file://${tmp}.config" >/dev/null

rm -f "${tmp}" "${tmp}.config"
echo "Viewer protocol policy set to allow-all where a viewer-request function is attached (${DISTRIBUTION_ID})."
