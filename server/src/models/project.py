from app import db
from src.models.project_tag import ProjectTag
from src.models.project_collaborator import ProjectCollaborator
import datetime

class Project(db.Model):
    """
    Project Model for storing project related details
    """
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(500), unique=True, nullable=False)
    description = db.Column(db.String(500), nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Integer, db.ForeignKey('status.id'), nullable=False)
    tags = db.relationship('Tag', secondary='project_tags', backref=db.backref('projects', lazy='dynamic'))
    # collaborators = db.relationship('ProjectCollaborator', secondary='project_collaborators', backref=db.backref('projects', lazy='dynamic'))
    created_on = db.Column(db.DateTime, nullable=False)
    modified_on = db.Column(db.DateTime, nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __init__(self, title, description, due_date, status, created_by):
        self.title = title
        self.description = description
        self.due_date = due_date
        self.status = status
        self.created_by = created_by
        self.created_on = datetime.datetime.now()
        self.modified_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: title: {}'.format(self.title)
    
    def serialize(self):
        """
        Serialize the Project object to a dictionary.
        """
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'due_date': self.due_date.strftime('%Y-%m-%d'),
            'status': self.status,
            'created_on': self.created_on.strftime('%Y-%m-%d %H:%M:%S'),
            'modified_on': self.modified_on.strftime('%Y-%m-%d %H:%M:%S'),
            'created_by': self.created_by
        }

