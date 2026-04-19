from flask import Blueprint, request, jsonify
import random
import json
import os

carbontrace_bp = Blueprint('carbontrace', __name__)

# Mock carbon data storage
CARBON_DATA_FILE = os.path.join(os.path.dirname(__file__), '../data/mock_db.json')

def load_carbon():
    if not os.path.exists(CARBON_DATA_FILE):
        return {"total_co2e": 0, "farmers_contributions": []}
    with open(CARBON_DATA_FILE, 'r') as f:
        data = json.load(f)
        return data.get('carbon', {"total_co2e": 0, "farmers_contributions": []})

def save_carbon(carbon_data):
    data = {}
    if os.path.exists(CARBON_DATA_FILE):
        with open(CARBON_DATA_FILE, 'r') as f:
            data = json.load(f)
    else:
        data = {"pest_reports": [], "carbon": {}}
    data['carbon'] = carbon_data
    with open(CARBON_DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

@carbontrace_bp.route('/my_credits', methods=['GET'])
def my_credits():
    user_id = request.args.get('user_id', 'farmer_001')
    carbon = load_carbon()
    # Find user contribution
    user_contrib = next((c for c in carbon.get('farmers_contributions', []) if c['user_id'] == user_id), None)
    if not user_contrib:
        user_contrib = {"total_credits": 2.5, "pending": 1.2, "co2_saved": 180}
    return jsonify({
        "total_credits_ton": user_contrib.get("total_credits", 0),
        "pending_verification": user_contrib.get("pending", 0),
        "co2_saved_kg": user_contrib.get("co2_saved", 0),
        "revenue_share_percent": 50,
        "estimated_rp": user_contrib.get("total_credits", 0) * 150000  # Rp150k per credit
    })

@carbontrace_bp.route('/add_emission_reduction', methods=['POST'])
def add_reduction():
    data = request.json
    user_id = data.get('user_id', 'farmer_001')
    reduction_tco2 = data.get('reduction_tco2', 0.1)

    carbon = load_carbon()
    farmers = carbon.get('farmers_contributions', [])
    found = False
    for f in farmers:
        if f['user_id'] == user_id:
            f['total_credits'] += reduction_tco2
            f['co2_saved'] += reduction_tco2 * 1000
            found = True
            break
    if not found:
        farmers.append({
            "user_id": user_id,
            "total_credits": reduction_tco2,
            "pending": 0,
            "co2_saved": reduction_tco2 * 1000
        })
    carbon['total_co2e'] += reduction_tco2
    carbon['farmers_contributions'] = farmers
    save_carbon(carbon)
    return jsonify({"status": "added", "reduction": reduction_tco2})