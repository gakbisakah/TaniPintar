from flask import Blueprint, request, jsonify
import json
import os
from datetime import datetime
import random

pestalert_bp = Blueprint('pestalert', __name__)

# Mock database for pest reports
PEST_REPORTS_FILE = os.path.join(os.path.dirname(__file__), '../data/mock_db.json')

def load_reports():
    if not os.path.exists(PEST_REPORTS_FILE):
        return []
    with open(PEST_REPORTS_FILE, 'r') as f:
        data = json.load(f)
        return data.get('pest_reports', [])

def save_report(report):
    data = {}
    if os.path.exists(PEST_REPORTS_FILE):
        with open(PEST_REPORTS_FILE, 'r') as f:
            data = json.load(f)
    else:
        data = {"pest_reports": []}
    data['pest_reports'].append(report)
    with open(PEST_REPORTS_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@pestalert_bp.route('/report', methods=['POST'])
def report_pest():
    data = request.json
    report = {
        "id": random.randint(1000, 9999),
        "lat": data.get('lat'),
        "lon": data.get('lon'),
        "pest_type": data.get('pest_type'),
        "severity": data.get('severity', 'medium'),
        "timestamp": datetime.now().isoformat(),
        "reported_by": data.get('user_id', 'anonymous')
    }
    save_report(report)
    return jsonify({"status": "reported", "report_id": report['id']})

@pestalert_bp.route('/alerts', methods=['GET'])
def get_alerts():
    lat = float(request.args.get('lat', '-6.2'))
    lon = float(request.args.get('lon', '106.816'))
    radius_km = float(request.args.get('radius', 5))

    reports = load_reports()
    # Filter by distance (mock simplification)
    nearby = []
    for r in reports:
        # Mock distance calculation
        nearby.append({
            "id": r['id'],
            "pest_type": r['pest_type'],
            "severity": r['severity'],
            "distance_km": round(random.uniform(0.5, radius_km), 1),
            "timestamp": r['timestamp']
        })
    return jsonify({"alerts": nearby[:5]})