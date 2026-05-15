#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-https://jit.pro}"
BUILD_DIR="${BUILD_DIR:-build}"
REGION_ID="${REGION_ID:-cn-hangzhou}"
DRY_RUN="${DRY_RUN:-0}"

# entry: only refresh public entry files. This is the default.
# targeted: refresh public entry files plus docs directory prefixes.
# full: refresh every generated HTML route individually.
REFRESH_SCOPE="${REFRESH_SCOPE:-entry}"
ENTRY_ROUTE_MAX_DEPTH="${ENTRY_ROUTE_MAX_DEPTH:-3}"

if [[ ! -d "$BUILD_DIR" ]]; then
  echo "Build directory not found: $BUILD_DIR" >&2
  exit 1
fi

if [[ "$DRY_RUN" != "1" ]] && ! command -v aliyun >/dev/null 2>&1; then
  echo "aliyun CLI is required. Use DRY_RUN=1 to preview URLs only." >&2
  exit 1
fi

tmp_urls="$(mktemp)"
trap 'rm -f "$tmp_urls"' EXIT

add_object() {
  local object_type="$1"
  local path="$2"
  printf '%s\t%s%s\n' "$object_type" "$DOMAIN" "$path" >> "$tmp_urls"
}

add_file() {
  add_object "File" "$1"
}

add_directory() {
  local path="$1"
  [[ "$path" == */ ]] || path="${path}/"
  add_object "Directory" "$path"
}

add_html_route() {
  local rel_path="$1"

  case "$rel_path" in
    index.html)
      add_file "/"
      ;;
    */index.html)
      local dir_path="/${rel_path%/index.html}"
      add_file "$dir_path"
      add_file "$dir_path/"
      ;;
    *.html)
      add_file "/${rel_path%.html}"
      ;;
  esac
}

route_depth() {
  local rel_path="$1"
  local route_path="${rel_path%.html}"

  [[ "$route_path" == */index ]] && route_path="${route_path%/index}"
  [[ "$route_path" == "index" ]] && route_path=""
  [[ "$route_path" == zh/* ]] && route_path="${route_path#zh/}"

  if [[ -z "$route_path" ]]; then
    echo 0
    return
  fi

  local slashless="${route_path//\//}"
  echo $(( ${#route_path} - ${#slashless} + 1 ))
}

should_include_entry_html() {
  local rel_path="$1"
  local depth

  depth="$(route_depth "$rel_path")"
  [[ "$depth" -le "$ENTRY_ROUTE_MAX_DEPTH" ]]
}

add_static_entry_files() {
  while IFS= read -r path; do
    [[ -f "$BUILD_DIR$path" ]] && add_file "$path"
  done <<'EOF'
/robots.txt
/sitemap.xml
/llms.txt
/opensearch.xml
EOF
}

add_entry_files() {
  while IFS= read -r html_file; do
    rel_path="${html_file#"$BUILD_DIR"/}"
    should_include_entry_html "$rel_path" && add_html_route "$rel_path"
  done < <(find "$BUILD_DIR" -type f -name '*.html' | sort)

  add_static_entry_files
}

add_generated_html_files() {
  while IFS= read -r html_file; do
    rel_path="${html_file#"$BUILD_DIR"/}"
    add_html_route "$rel_path"
  done < <(find "$BUILD_DIR" -type f -name '*.html' | sort)

  add_static_entry_files
}

case "$REFRESH_SCOPE" in
  entry)
    add_entry_files
    ;;
  targeted)
    add_entry_files
    add_directory "/docs/"
    add_directory "/zh/docs/"
    ;;
  full)
    add_generated_html_files
    ;;
  *)
    echo "Unsupported REFRESH_SCOPE: $REFRESH_SCOPE" >&2
    echo "Use one of: entry, targeted, full" >&2
    exit 1
    ;;
esac

sort -u "$tmp_urls" -o "$tmp_urls"

object_count="$(wc -l < "$tmp_urls" | tr -d ' ')"
echo "Refreshing $object_count CDN objects from $BUILD_DIR (scope: $REFRESH_SCOPE)"

if [[ "$DRY_RUN" == "1" ]]; then
  awk -F '\t' '{print $1 " " $2}' "$tmp_urls"
  exit 0
fi

while IFS=$'\t' read -r object_type url; do
  echo "Refreshing [$object_type] $url"
  aliyun cdn RefreshObjectCaches \
    --ObjectPath "$url" \
    --ObjectType "$object_type" \
    --RegionId "$REGION_ID"
done < "$tmp_urls"
