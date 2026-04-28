#!/usr/bin/env bash
set -euo pipefail

SRC="/Users/pinhsu/Documents/My Uncle/pic"
DST="/Users/pinhsu/Documents/My Uncle/pic/web"
MAX_DIM=1600
QUALITY=82

mkdir -p "$DST"

clean_name() {
  local name="$1"
  name="${name#LINE_ALBUM_}"
  name="${name%_260428_*}_${name##*_260428_}"
  name=$(echo "$name" | sed -E 's/_260428//g')
  name=$(echo "$name" | tr ' ' '_' | tr -s '_')
  name=$(echo "$name" | sed -E 's/．/-/g')
  echo "$name"
}

count=0
for src in "$SRC"/*.{JPG,jpg,jpeg,heic,HEIC}; do
  [ -f "$src" ] || continue
  filename=$(basename "$src")
  base="${filename%.*}"
  ext="${filename##*.}"
  ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

  # Clean filename
  clean=$(echo "$base" | sed -E 's/^LINE_ALBUM_//; s/_260428_/_/; s/_260428//' | tr ' ' '_' | tr -s '_' | sed 's/．/-/g')
  out="$DST/${clean}.webp"

  if [ -f "$out" ]; then
    echo "skip (exists): $clean.webp"
    continue
  fi

  if [ "$ext_lower" = "heic" ]; then
    # HEIC: convert via sips to JPG temp, then to webp
    tmp=$(mktemp -t heic_conv).jpg
    sips -s format jpeg -Z $MAX_DIM "$src" --out "$tmp" >/dev/null 2>&1
    cwebp -q $QUALITY "$tmp" -o "$out" >/dev/null 2>&1
    rm -f "$tmp"
  else
    # JPG: use magick to resize+convert directly
    magick "$src" -auto-orient -resize "${MAX_DIM}x${MAX_DIM}>" -quality $QUALITY "$out"
  fi

  size=$(stat -f%z "$out")
  printf "  %-60s %6d KB\n" "$clean.webp" $((size / 1024))
  count=$((count + 1))
done

echo ""
echo "Done. Converted $count files to $DST"
ls -1 "$DST" | wc -l | awk '{print "Total in web/: " $1}'
