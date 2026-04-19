import random
import math

def get_weather_data(lat, lon):
    """Mock BMKG API response"""
    return {
        "temperature": round(26 + random.uniform(-2, 3), 1),
        "humidity": round(70 + random.uniform(-10, 15), 0),
        "wind_speed": round(2 + random.uniform(0, 3), 1),
        "solar_radiation": round(180 + random.uniform(-30, 50), 0),
        "rain_probability": random.randint(0, 100),
        "condition": random.choice(["Cerah", "Berawan", "Hujan Ringan", "Hujan Sedang"])
    }

def calculate_et0_penman_monteith(weather):
    """
    Simplified Penman-Monteith FAO-56 reference evapotranspiration (mm/day)
    """
    T = weather['temperature']
    RH = weather['humidity'] / 100
    u2 = weather['wind_speed']
    Rs = weather['solar_radiation']  # W/m2, convert to MJ/m2/day

    # Simplified formula for demo
    es = 0.6108 * math.exp(17.27 * T / (T + 237.3))
    ea = es * RH
    delta = 4098 * es / ((T + 237.3) ** 2)
    gamma = 0.000665 * 101.3
    Rn = Rs * 0.0864  # approximate net radiation

    et0 = (0.408 * delta * (Rn - 0) + gamma * (900 / (T + 273)) * u2 * (es - ea)) / (delta + gamma * (1 + 0.34 * u2))
    return max(et0, 1.0)