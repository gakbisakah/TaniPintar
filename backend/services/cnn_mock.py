import base64
from PIL import Image
import io
import random

def analyze_leaf_image(image_file):
    """
    Mock CNN analysis for leaf nutrient deficiency.
    In production, this would load a trained model (TensorFlow/PyTorch).
    """
    # Simulate processing
    img = Image.open(image_file)
    img.thumbnail((224, 224))

    # Mock prediction based on random + simple pattern
    deficiencies = [
        {"deficiency": "Nitrogen (N) - Klorosis parah", "confidence": 0.87, "action": "Aplikasikan urea 100 kg/ha"},
        {"deficiency": "Kalium (K) - Nekrosis tepi daun", "confidence": 0.76, "action": "Tambahkan KCl 50 kg/ha"},
        {"deficiency": "Fosfor (P) - Daun keunguan", "confidence": 0.68, "action": "SP-36 75 kg/ha"},
        {"deficiency": "Sehat - Tidak ada defisiensi", "confidence": 0.92, "action": "Pemupukan pemeliharaan"}
    ]
    result = random.choice(deficiencies)
    return result