from flask import render_template, request, jsonify
from app import app
from app.database import get_or_create_pair

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-buddy', methods=['POST'])
def get_buddy():
    name = request.json.get('name')
    if not name:
        return jsonify({"error": "Name is required"}), 400
    
    buddy = get_or_create_pair(name)
    
    if buddy:
        return jsonify({"name": name, "buddy": buddy})
    else:
        return jsonify({"error": "No available buddies"}), 404
