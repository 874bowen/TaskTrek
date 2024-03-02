from flask import Blueprint, request, jsonify
from src.models.project_collaborator import ProjectCollaborator
from src.models.project import Project

from src.models.user import User
from app import db

project_collaborator_bp = Blueprint('project_collaborator', __name__)
@project_collaborator_bp.route('/', methods=['POST'])
def add_collaborator():
    token = request.headers.get('Authorization')
    if token:
        user_id = User.decode_auth_token(token)
        if not isinstance(user_id, str):
            post_data = request.get_json()
            project_id = post_data.get('project_id')
            collaborator_email = post_data.get('collaborator_email')
            # get project name and created by -< username
            project = Project.query.filter_by(id=project_id).first()
            # check if the user exists
            
            user = User.query.filter_by(id=user_id).first()
            # if not, send an email to the user to join the platform
            project_collaborator = ProjectCollaborator(
                project_id=project_id,
                collaborator_email=collaborator_email
            )
            project_collaborator.invite_collaborator_email(project_id, collaborator_email, user.username, project.title)
            db.session.add(project_collaborator)
            db.session.commit()
            responseObject = {
                'status': 'success',
                'message': 'Successfully added collaborator.'
            }
            return jsonify(responseObject), 201
        else:
            responseObject = {
                'status': 'fail',
                'message': user_id
            }
            return jsonify(responseObject), 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return jsonify(responseObject), 401
    