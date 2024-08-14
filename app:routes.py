{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 from flask import render_template, request, jsonify\
from app import app\
from app.database import get_or_create_pair\
\
@app.route('/')\
def index():\
    return render_template('index.html')\
\
@app.route('/get-buddy', methods=['POST'])\
def get_buddy():\
    name = request.json.get('name')\
    if not name:\
        return jsonify(\{"error": "Name is required"\}), 400\
    \
    buddy = get_or_create_pair(name)\
    \
    if buddy:\
        return jsonify(\{"name": name, "buddy": buddy\})\
    else:\
        return jsonify(\{"error": "No available buddies"\}), 404\
}