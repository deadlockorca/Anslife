#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="${ENV_FILE:-$ROOT_DIR/.env}"

PASS_COUNT=0
WARN_COUNT=0
FAIL_COUNT=0

pass() {
  PASS_COUNT=$((PASS_COUNT + 1))
  echo "[preflight][PASS] $*"
}

warn() {
  WARN_COUNT=$((WARN_COUNT + 1))
  echo "[preflight][WARN] $*"
}

fail() {
  FAIL_COUNT=$((FAIL_COUNT + 1))
  echo "[preflight][FAIL] $*"
}

trim() {
  local value="$1"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "$value"
}

unquote() {
  local value="$1"
  if [[ "$value" == \"*\" && "$value" == *\" ]]; then
    value="${value:1:${#value}-2}"
  elif [[ "$value" == \'*\' && "$value" == *\' ]]; then
    value="${value:1:${#value}-2}"
  fi
  printf '%s' "$value"
}

read_from_env_file() {
  local key="$1"
  if [ ! -f "$ENV_FILE" ]; then
    return 1
  fi

  local line
  line="$(grep -E "^${key}=" "$ENV_FILE" | tail -n 1 || true)"
  if [ -z "$line" ]; then
    return 1
  fi

  local value="${line#*=}"
  value="$(trim "$value")"
  value="$(unquote "$value")"
  printf '%s' "$value"
  return 0
}

get_env_value() {
  local key="$1"
  local process_value="${!key-}"
  if [ -n "$process_value" ]; then
    printf '%s' "$process_value"
    return 0
  fi

  if read_from_env_file "$key"; then
    return 0
  fi

  printf ''
}

get_first_env_value() {
  local value=''
  for key in "$@"; do
    value="$(get_env_value "$key")"
    if [ -n "$value" ]; then
      printf '%s' "$value"
      return 0
    fi
  done
  printf ''
}

require_non_empty() {
  local key="$1"
  local label="$2"
  local value
  value="$(get_env_value "$key")"
  if [ -z "$value" ]; then
    fail "${label} (${key}) đang trống."
    return 1
  fi
  pass "${label} (${key}) đã có."
  return 0
}

contains_csv_value() {
  local csv="$1"
  local needle="$2"
  IFS=',' read -r -a parts <<< "$csv"
  for item in "${parts[@]}"; do
    if [ "$(trim "$item")" = "$needle" ]; then
      return 0
    fi
  done
  return 1
}

echo "[preflight] ROOT_DIR=${ROOT_DIR}"
echo "[preflight] ENV_FILE=${ENV_FILE}"

node_env="$(get_env_value NODE_ENV)"
if [ "$node_env" = "production" ]; then
  pass "NODE_ENV=production."
elif [ -z "$node_env" ]; then
  warn "NODE_ENV chưa set (host có thể tự set trong Node App)."
else
  warn "NODE_ENV hiện tại là '${node_env}', nên là production trên môi trường thật."
fi

site_url="$(get_env_value NEXT_PUBLIC_SITE_URL)"
if [ -z "$site_url" ]; then
  fail "Thiếu NEXT_PUBLIC_SITE_URL."
elif [[ "$site_url" =~ ^https:// ]]; then
  pass "NEXT_PUBLIC_SITE_URL dùng HTTPS."
else
  fail "NEXT_PUBLIC_SITE_URL phải bắt đầu bằng https://."
fi

internal_api_base="$(get_env_value NEXT_PUBLIC_INTERNAL_API_BASE)"
if [ -z "$internal_api_base" ]; then
  fail "Thiếu NEXT_PUBLIC_INTERNAL_API_BASE."
elif [[ "$internal_api_base" == "/api/public" || "$internal_api_base" =~ ^https?:// ]]; then
  pass "NEXT_PUBLIC_INTERNAL_API_BASE hợp lệ."
else
  warn "NEXT_PUBLIC_INTERNAL_API_BASE đang là '${internal_api_base}', kiểm tra lại nếu không cố ý."
fi

database_url="$(get_env_value DATABASE_URL)"
if [ -n "$database_url" ]; then
  if [[ "$database_url" =~ ^mysql:// ]]; then
    pass "DATABASE_URL đang được dùng."
  else
    warn "DATABASE_URL có nhưng không bắt đầu bằng mysql://."
  fi
else
  fail "Thiếu DATABASE_URL (Prisma-only)."
fi

cors_allow_origins="$(get_env_value CORS_ALLOW_ORIGINS)"
if [ -z "$cors_allow_origins" ]; then
  warn "CORS_ALLOW_ORIGINS chưa set, hệ thống sẽ dùng default."
else
  pass "CORS_ALLOW_ORIGINS đã set."
  if [ -n "$site_url" ] && ! contains_csv_value "$cors_allow_origins" "$site_url"; then
    warn "CORS_ALLOW_ORIGINS chưa chứa NEXT_PUBLIC_SITE_URL (${site_url})."
  else
    pass "CORS_ALLOW_ORIGINS chứa NEXT_PUBLIC_SITE_URL."
  fi
fi

bootstrap_admin_email="$(get_first_env_value ADMIN_USERNAME ADMIN_EMAIL APP_BOOTSTRAP_ADMIN_EMAIL)"
bootstrap_admin_password="$(get_first_env_value ADMIN_PASSWORD APP_BOOTSTRAP_ADMIN_PASSWORD)"
if [ -n "$bootstrap_admin_email" ] && [ -n "$bootstrap_admin_password" ]; then
  pass "Bootstrap admin credentials đã có."
  if [[ "$bootstrap_admin_password" =~ YOUR_PASSWORD|changeme|123456|password ]]; then
    fail "ADMIN_PASSWORD đang có pattern yếu/mặc định."
  fi
else
  warn "Bootstrap admin credentials chưa set (nếu đã có admin sẵn thì có thể bỏ qua)."
fi

echo
echo "[preflight] PASS=${PASS_COUNT} WARN=${WARN_COUNT} FAIL=${FAIL_COUNT}"
if [ "$FAIL_COUNT" -gt 0 ]; then
  echo "[preflight] FAILED"
  exit 1
fi

echo "[preflight] OK"
exit 0
