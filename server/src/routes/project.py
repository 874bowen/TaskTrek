from flask import Blueprint, request, jsonify
from src.models.project import Project
from src.models.project_collaborator import ProjectCollaborator
from src.models.project_tag import ProjectTag
from src.models.user import User
from src.models.status import Status
from src.models.tag import Tag
from app import db

project_bp = Blueprint('projects', __name__)
@project_bp.route('/', methods=['GET'])
def get_all_projects():
    token = request.headers.get('Authorization')
    if token:
        user_id = User.decode_auth_token(token)
        user = User.query.filter_by(id=user_id).first()
        if not isinstance(user_id, str):
            user_collaboration_projects = []
            projects = Project.query.filter_by(created_by=user_id).all()
            collaboration_projects = ProjectCollaborator.query.filter_by(collaborator_email=user.email).all()
            for project in collaboration_projects:
                user_collaboration_projects.append(Project.query.filter_by(id=project.project_id).first())
            # return an object with user_projects and collaboration_projects
            responseObject = {
                'status': 'success',
                'user_projects': [project.serialize() for project in projects],
                'collaboration_projects': [project.serialize() for project in user_collaboration_projects]
            }
            return jsonify(responseObject), 200
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
    

@project_bp.route('/', methods=['POST'])
def create_project():
    token = request.headers.get('Authorization')
    if token:
        user_id = User.decode_auth_token(token)
        if not isinstance(user_id, str):
            post_data = request.get_json()
            title = post_data.get('title')
            description = post_data.get('description')
            due_date = post_data.get('due_date')
            status = post_data.get('status')
            tags = post_data.get('tags')

            project = Project(
                title=title,
                description=description,
                due_date=due_date,
                status=int(status),
                created_by=user_id
            )
            db.session.add(project)
            db.session.commit()

            for tag in tags:
                tag = Tag.query.filter_by(id=int(tag)).first()
                if tag:
                    project_tag = ProjectTag(
                        project_id=project.id,
                        tag_id=tag.id
                    )
                    db.session.add(project_tag)
                    db.session.commit()
                else:
                    tag = Tag(name=tag)
                    db.session.add(tag)
                    db.session.commit()
                    project_tag = ProjectTag(
                        project_id=project.id,
                        tag_id=tag.id
                    )
                    db.session.add(project_tag)
                    db.session.commit()  

            responseObject = {
                'status': 'success',
                'message': 'Project created successfully.'
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


@project_bp.route('/tags', methods=['GET'])
def get_all_tags():
    token = request.headers.get('Authorization')
    if token:
        tags = Tag.query.all()
        responseObject = {
            'status': 'success',
            'data': [tag.to_dict() for tag in tags]
        }
        return jsonify(responseObject), 200
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return jsonify(responseObject), 401

@project_bp.route('/status', methods=['GET'])
def get_all_status():
    token = request.headers.get('Authorization')
    if token:
        status = Status.query.all()
        responseObject = {
            'status': 'success',
            'data': [s.to_dict() for s in status]
        }
        return jsonify(responseObject), 200
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return jsonify(responseObject), 401
    
@project_bp.route('/<project_id>', methods=['GET'])
def get_project(project_id):
    token = request.headers.get('Authorization')
    if token:
        user_id = User.decode_auth_token(token)
        user = User.query.filter_by(id=user_id).first()
        if not isinstance(user_id, str):
            project = Project.query.filter_by(id=project_id).first()
            # update projects status to status name
            collaboration = ProjectCollaborator.query.filter_by(project_id=project_id, collaborator_email=user.email).first()
            if project:
                # get all tags associated with the project
                project_tags = ProjectTag.query.filter_by(project_id=project.id).all()
                status = Status.query.filter_by(id=project.status).first()
                tags = []
                for project_tag in project_tags:
                    tag = Tag.query.filter_by(id=project_tag.tag_id).first()
                    tags.append(tag.serialize())

                if project.created_by != user_id and not collaboration:
                    if not collaboration:
                        responseObject = {
                            'status': 'fail',
                            'message': 'You are not authorized to view this project.'
                        }
                        return jsonify(responseObject), 401
                else: 
                    responseObject = {
                        'status': 'success',
                        # return project details with tags
                        'data': {
                            'project': project.serialize(),
                            'tags': tags,
                            'status': status.serialize()
                        }
                    }
                    return jsonify(responseObject), 200
            else:
                responseObject = {
                    'status': 'fail',
                    'message': 'Project not found.'
                }
                return jsonify(responseObject), 404
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