from flask import Blueprint, request, jsonify
from services.weather_mock import get_weather_data, calculate_et0_penman_monteith

hydromind_bp = Blueprint('hydromind', __name__)

@hydromind_bp.route('/irrigation', methods=['GET'])
def irrigation_advice():
    lat = request.args.get('lat', '-6.200000')
    lon = request.args.get('lon', '106.816666')
    crop_type = request.args.get('crop', 'padi')
    growth_stage = request.args.get('stage', 'vegetative')

    weather = get_weather_data(lat, lon)
    et0 = calculate_et0_penman_monteith(weather)

    # Crop coefficients (Kc) based on FAO
    kc_values = {
        "padi": {"vegetative": 1.05, "reproductive": 1.20, "ripening": 0.85},
        "jagung": {"vegetative": 0.70, "reproductive": 1.15, "ripening": 0.60},
        "cabai": {"vegetative": 0.75, "flowering": 1.05, "fruiting": 0.90}
    }
    kc = kc_values.get(crop_type, {}).get(growth_stage, 0.85)
    etc = et0 * kc  # mm/day

    # Rain deferral logic
    rain_prob = weather.get("rain_probability", 0)
    defer_irrigation = rain_prob > 60
    advice = "Tunda irigasi karena prediksi hujan >60%" if defer_irrigation else f"Irigasi diperlukan: {etc:.1f} mm/hari"

    return jsonify({
        "status": "success",
        "et0": round(et0, 1),
        "kc": kc,
        "etc": round(etc, 1),
        "rain_probability": rain_prob,
        "defer_irrigation": defer_irrigation,
        "advice": advice,
        "water_saved_percent": 35 if defer_irrigation else 0
    })