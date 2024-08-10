from flask import Blueprint, request, jsonify
from connection import db

from models import User

users = Blueprint('users', __name__)



# Get a User
@users.route('/', methods=['POST'])
def get_user():
    try:
        data = request.get_json()
        if 'email' not in data:
            return jsonify({'error': 'Email is required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            user = User(
                email=data['email'],
                username=data.get('username', None)
            )
            db.session.add(user)
            db.session.commit()
            user = User.query.filter_by(email=data['email']).first()
        
        return jsonify(user.serialize()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500