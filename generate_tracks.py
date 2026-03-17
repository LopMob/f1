"""
F1 Track SVG Generator
Запуск: python generate_tracks.py

Установи зависимости:
    pip install fastf1 numpy

Скрипт скачивает GPS телеметрию реальных кругов с серверов F1
и генерирует SVG path для каждой трассы.
Результат сохраняется в tracks_generated.json — вставь его в data/tracks.json
"""

import fastf1
import numpy as np
import json
import os

# Кэш чтобы не скачивать дважды
os.makedirs("./f1_cache", exist_ok=True)
fastf1.Cache.enable_cache("./f1_cache")

# Трассы: (year, gp_name, session, track_id)
TRACKS = [
    (2024, "Monaco",       "Q", "monaco"),
    (2024, "Monza",        "Q", "monza"),
    (2024, "Belgium",      "Q", "spa"),
    (2024, "British",      "Q", "silverstone"),
    (2024, "Japanese",     "Q", "suzuka"),
    (2024, "Brazil",       "Q", "interlagos"),
    (2024, "Bahrain",      "Q", "bahrain"),
    (2024, "Singapore",    "Q", "singapore"),
]

SVG_SIZE = 480      # размер viewBox
SVG_PADDING = 40    # отступ от краёв


def coords_to_svg_path(x, y, size=SVG_SIZE, padding=SVG_PADDING):
    """
    Берёт массивы X, Y GPS координат (метры) и
    возвращает строку SVG path нормализованную под viewBox size x size.
    """
    # Центрируем и нормализуем
    x = np.array(x, dtype=float)
    y = np.array(y, dtype=float)

    x_min, x_max = x.min(), x.max()
    y_min, y_max = y.min(), y.max()

    x_range = x_max - x_min or 1
    y_range = y_max - y_min or 1

    # Сохраняем пропорции
    scale = (size - 2 * padding) / max(x_range, y_range)

    # Центрируем в квадрате
    x_offset = padding + (size - 2 * padding - x_range * scale) / 2
    y_offset = padding + (size - 2 * padding - y_range * scale) / 2

    sx = (x - x_min) * scale + x_offset
    # Y инвертируем — в SVG ось Y идёт вниз
    sy = size - ((y - y_min) * scale + y_offset)

    # Прореживаем точки — берём каждую N-ю чтобы не было слишком
    # много точек в path (оптимально ~200-400 точек)
    total = len(sx)
    step = max(1, total // 300)
    sx = sx[::step]
    sy = sy[::step]

    # Строим path: M (move to) + L (line to) для каждой точки + Z (close)
    parts = [f"M {sx[0]:.1f} {sy[0]:.1f}"]
    for xi, yi in zip(sx[1:], sy[1:]):
        parts.append(f"L {xi:.1f} {yi:.1f}")
    parts.append("Z")

    return " ".join(parts)


def get_track_svg(year, gp, session_type):
    """Загружает сессию и возвращает SVG path быстрейшего круга."""
    print(f"  Загружаю {gp} {year} ({session_type})...")

    session = fastf1.get_session(year, gp, session_type)
    session.load(telemetry=True, weather=False, messages=False)

    # Берём быстрейший круг сессии
    fastest = session.laps.pick_fastest()
    print(f"    Быстрейший круг: {fastest['Driver']} — {fastest['LapTime']}")

    # Позиционные данные (GPS)
    pos = fastest.get_pos_data()

    x = pos["X"].dropna().values
    y = pos["Y"].dropna().values

    if len(x) < 10:
        raise ValueError(f"Слишком мало точек: {len(x)}")

    print(f"    Точек GPS: {len(x)} → прореженных: ~{len(x)//max(1,len(x)//300)}")

    return coords_to_svg_path(x, y)


def main():
    results = {}
    errors = []

    for year, gp, session_type, track_id in TRACKS:
        print(f"\n{'='*50}")
        print(f"Трасса: {gp} ({track_id})")
        try:
            svg_path = get_track_svg(year, gp, session_type)
            results[track_id] = svg_path
            print(f"  ✓ SVG path сгенерирован ({len(svg_path)} символов)")
        except Exception as e:
            print(f"  ✗ Ошибка: {e}")
            errors.append((track_id, str(e)))

    # Сохраняем результаты
    output = {
        "svg_paths": results,
        "errors": errors,
        "count": len(results)
    }

    with open("tracks_svg_paths.json", "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*50}")
    print(f"Готово! Сгенерировано: {len(results)}/{len(TRACKS)} трасс")
    if errors:
        print(f"Ошибки: {[e[0] for e in errors]}")
    print(f"Результат сохранён в: tracks_svg_paths.json")
    print()
    print("Следующий шаг:")
    print("  Запусти patch_tracks.py чтобы вставить пути в data/tracks.json")


if __name__ == "__main__":
    main()
