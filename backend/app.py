import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from routes.agrivision import agrivision_bp
from routes.hydromind import hydromind_bp
from routes.pestalert import pestalert_bp
from routes.carbontrace import carbontrace_bp

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Register blueprints
app.register_blueprint(agrivision_bp, url_prefix='/api/agrivision')
app.register_blueprint(hydromind_bp, url_prefix='/api/hydromind')
app.register_blueprint(pestalert_bp, url_prefix='/api/pestalert')
app.register_blueprint(carbontrace_bp, url_prefix='/api/carbontrace')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "TaniPintar Backend Running", "version": "1.0.0"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)