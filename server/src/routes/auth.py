# app/routes/auth.py

from flask import Blueprint, request, jsonify
from src.models.user import User
from app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    # Logic to register a new user
    data = request.get_json()
    # Create a new user object and add it to the database
    new_user = User(username=data['username'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    # Logic to authenticate user and generate JWT token
    pass
data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username, password=password).first()

    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@auth_bp.route('/logout', methods=['GET'])
def logout():
    # Logic to logout user
    pass
 # Assuming you're using sessions for authentication
    if 'user_id' in session:
        session.pop('user_id')
        return jsonify({'message': 'Logout successful'}), 200
    else:
        return jsonify({'message': 'Not logged in'}), 401


@auth_bp.route('/users', methods=['GET'])
def users():


