from flask import Flask, render_template, abort, jsonify
import json
import os

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def load_json(filename):
    path = os.path.join(BASE_DIR, "data", filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/tracks")
def tracks():
    return render_template("tracks.html", tracks=load_json("tracks.json"))

@app.route("/tracks/<track_id>")
def track_detail(track_id):
    tracks_data = load_json("tracks.json")
    track = next((t for t in tracks_data if t["id"] == track_id), None)
    if not track:
        abort(404)
    return render_template("track_detail.html", track=track)

@app.route("/drivers")
def drivers():
    return render_template("drivers.html", drivers=load_json("drivers.json"))

@app.route("/races")
def races():
    return render_template("races.html", races=load_json("races.json"))

@app.route("/standings")
def standings():
    return render_template("standings.html",
                           drivers=load_json("drivers.json"),
                           constructors=load_json("constructors.json"))

@app.route("/compare")
def compare():
    return render_template("compare.html", drivers=load_json("drivers.json"))

@app.route("/api/drivers")
def api_drivers():
    return jsonify(load_json("drivers.json"))

@app.route("/api/races")
def api_races():
    return jsonify(load_json("races.json"))

@app.route("/api/tracks")
def api_tracks():
    return jsonify(load_json("tracks.json"))

@app.route("/api/constructors")
def api_constructors():
    return jsonify(load_json("constructors.json"))

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
