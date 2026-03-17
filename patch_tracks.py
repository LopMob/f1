"""
Patch tracks.json с новыми SVG путями из tracks_svg_paths.json

Запуск (из папки f1-project):
    python ../patch_tracks.py

Или укажи пути явно:
    python patch_tracks.py --svg tracks_svg_paths.json --tracks f1-project/data/tracks.json
"""

import json
import argparse
import os

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--svg",    default="tracks_svg_paths.json")
    parser.add_argument("--tracks", default="f1-project/data/tracks.json")
    args = parser.parse_args()

    # Загружаем сгенерированные пути
    with open(args.svg, "r", encoding="utf-8") as f:
        svg_data = json.load(f)

    svg_paths = svg_data["svg_paths"]
    print(f"Загружено SVG путей: {len(svg_paths)}")

    # Загружаем tracks.json
    with open(args.tracks, "r", encoding="utf-8") as f:
        tracks = json.load(f)

    # Патчим
    updated = 0
    for track in tracks:
        tid = track["id"]
        if tid in svg_paths:
            track["svg_path"] = svg_paths[tid]
            print(f"  ✓ {tid} — обновлён ({len(svg_paths[tid])} символов)")
            updated += 1
        else:
            print(f"  — {tid} — не найден в SVG данных, оставлен старый путь")

    # Сохраняем
    with open(args.tracks, "w", encoding="utf-8") as f:
        json.dump(tracks, f, indent=2, ensure_ascii=False)

    print(f"\nОбновлено {updated}/{len(tracks)} трасс в {args.tracks}")


if __name__ == "__main__":
    main()
