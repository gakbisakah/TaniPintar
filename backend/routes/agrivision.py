from flask import Blueprint, request, jsonify
from services.cnn_mock import analyze_leaf_image
from services.weather_mock import get_weather_data
import json
import os

agrivision_bp = Blueprint('agrivision', __name__)

@agrivision_bp.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']
    lat = request.form.get('lat', '-6.200000')
    lon = request.form.get('lon', '106.816666')

    # Mock CNN analysis
    analysis = analyze_leaf_image(file)

    # Get weather context
    weather = get_weather_data(lat, lon)

    # Integrate with soil data mock (BBSDLP)
    soil_data = {
        "soil_type": "Aluvial",
        "pH": 6.2,
        "organic_carbon": "1.8%",
        "nitrogen": "Low",
        "phosphorus": "Medium",
        "potassium": "High"
    }

    recommendation = generate_recommendation(analysis, weather, soil_data)

    return jsonify({
        "status": "success",
        "analysis": analysis,
        "weather": weather,
        "soil": soil_data,
        "recommendation": recommendation
    })

def generate_recommendation(analysis, weather, soil):
    deficiency = analysis.get("deficiency", "Unknown")
    if "Nitrogen" in deficiency:
        return "Terlihat gejala klorosis pada daun. Rekomendasi: Aplikasikan pupuk urea 50 kg/ha secara terbagi. Kombinasikan dengan pupuk organik cair."
    elif "Potassium" in deficiency:
        return "Defisiensi Kalium: tepi daun menguning. Rekomendasi: KCl 75 kg/ha dan perbaiki drainase."
    elif "Phosphorus" in deficiency:
        return "Defisiensi Fosfor: daun keunguan. Rekomendasi: SP-36 100 kg/ha + bokashi."
    else:
        return "Tanaman terlihat sehat. Lakukan pemupukan pemeliharaan sesuai jadwal."