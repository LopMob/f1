import json, os

SVG_SIZE    = 480
SVG_PADDING = 40

TRACK_MAP = {
    "monaco":      "mc-1929",
    "monza":       "it-1922",
    "spa":         "be-1925",
    "silverstone": "gb-1948",
    "suzuka":      "jp-1962",
    "interlagos":  "br-1977",
    "bahrain":     "bh-2002",
    "singapore":   "sg-2008",
}

CIRCUITS_DIR = "./f1-circuits/circuits"


def load_coords(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    coords = []
    features = data["features"] if data["type"] == "FeatureCollection" else \
               [data] if data["type"] == "Feature" else \
               [{"geometry": data}]
    for feat in features:
        geom = feat.get("geometry", {})
        t    = geom.get("type", "")
        if   t == "LineString":      coords.extend(geom["coordinates"])
        elif t == "MultiLineString": [coords.extend(l) for l in geom["coordinates"]]
        elif t == "Polygon":         coords.extend(geom["coordinates"][0])
    return coords


def to_svg(coords):
    if not coords:
        raise ValueError("Нет координат")
    xs = [c[0] for c in coords]
    ys = [c[1] for c in coords]
    xr = max(xs) - min(xs) or 1
    yr = max(ys) - min(ys) or 1
    usable = SVG_SIZE - 2 * SVG_PADDING
    scale  = usable / max(xr, yr)
    xoff   = SVG_PADDING + (usable - xr * scale) / 2
    yoff   = SVG_PADDING + (usable - yr * scale) / 2
    step   = max(1, len(coords) // 400)
    coords = coords[::step]
    parts  = []
    for i, (lon, lat) in enumerate(coords):
        sx = (lon - min(xs)) * scale + xoff
        sy = SVG_SIZE - ((lat - min(ys)) * scale + yoff)
        parts.append(f"{'M' if i == 0 else 'L'} {sx:.1f} {sy:.1f}")
    parts.append("Z")
    return " ".join(parts)


def main():
    results, errors = {}, []

    for track_id, filename in TRACK_MAP.items():
        path = os.path.join(CIRCUITS_DIR, filename + ".geojson")
        if not os.path.exists(path):
            print(f"  — {track_id}: файл не найден ({filename}.geojson)")
            errors.append((track_id, "файл не найден"))
            continue
        try:
            coords = load_coords(path)
            svg    = to_svg(coords)
            results[track_id] = svg
            print(f"  ✓ {track_id} ({len(coords)} точек)")
        except Exception as e:
            print(f"  ✗ {track_id}: {e}")
            errors.append((track_id, str(e)))

    with open("tracks_svg_paths.json", "w", encoding="utf-8") as f:
        json.dump({"svg_paths": results, "errors": errors}, f, indent=2)

    print(f"\nГотово: {len(results)}/{len(TRACK_MAP)}")
    if errors:
        print(f"Пропущены: {[e[0] for e in errors]}")
    print("Далее: python patch_tracks.py --tracks data/tracks.json")


if __name__ == "__main__":
    main()
