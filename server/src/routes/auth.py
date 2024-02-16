# app/routes/auth.py

from flask import Blueprint, request, jsonify
from src.models.user import User, BlacklistToken
from app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    # Logic to register a new user
    post_data = request.get_json()
        # check if user already exists
    user = User.query.filter_by(email=post_data.get('email')).first()
    if not user:
        try:
            user = User(
                email=post_data.get('email'),
                password=post_data.get('password'),
                username=post_data.get('username')
            )

            # insert the user
            db.session.add(user)
            db.session.commit()
            # generate the auth token
            auth_token = user.encode_auth_token(user.id)
            responseObject = {
                'status': 'success',
                'message': 'Successfully registered.',
                'auth_token': auth_token,
                'username': user.username,
                'user_id': user.id
            }
            return jsonify(responseObject), 201
        except Exception as e:
            responseObject = {
                'status': 'fail',
                'message': 'Some error occurred. Please try again.'
            }
            # print(auth_token, e)
            return jsonify(responseObject), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return jsonify(responseObject), 202

@auth_bp.route('/login', methods=['POST'])
def login():
    # Logic to authenticate user and generate JWT token
    post_data = request.get_json()
    try:
        # fetch the user data
        user = User.query.filter_by(
            email=post_data.get('email')
            ).first()
        if user and user.check_password(post_data.get('password')):
            auth_token = user.encode_auth_token(user.id)
            if auth_token:
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token,
                    'username': user.username,
                    'user_id': user.id
                }
                return jsonify(responseObject), 200
        else:
            responseObject = {
                'status': 'fail',
                'message': 'Please provide a valid email and password.'
            }
            return jsonify(responseObject), 202
        
    except Exception as e:
        print(e)
        responseObject = {
            'status': 'fail',
            'message': 'Try again'
        }
        return jsonify(responseObject), 500

@auth_bp.route('/logout', methods=['GET'])
def logout():
    # Logic to logout user
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        resp = User.decode_auth_token(auth_token)
        if not isinstance(resp, str):
            # mark the token as blacklisted
            blacklist_token = BlacklistToken(token=auth_token)
            try:
                # insert the token
                db.session.add(blacklist_token)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged out.'
                }
                return jsonify(responseObject), 200
            except Exception as e:
                responseObject = {
                    'status': 'fail',
                    'message': e
                }
                return jsonify(responseObject), 200
        else:
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return jsonify(responseObject), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return jsonify(responseObject), 403


@auth_bp.route('/users', methods=['GET'])
def user():
    users = User.query.all()

    # Serialize user data into JSON format
    users_data = [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]

    # Return JSON response containing user data
    return jsonify({'users': users_data}), 200
