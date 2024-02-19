from app import db
from flask_mail import Message
import mailtrap as mt
import os

class ProjectCollaborator(db.Model):
    """
    ProjectCollaborators Model for storing association projects and collaborators
    """
    __tablename__ = 'project_collaborators'
    # use collaborator's email and project id
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    collaborator_email = db.Column(db.String(50), unique=False, nullable=False)
    
    def invite_collaborator_email(self, project_id, collaborator_email):
        """
        Invite a user via email to collaborate on a project.
        """
        mail = mt.Mail(
            sender=mt.Address(email= os.environ.get('MAILTRAP_MAIL'), name="TaskTrek Project Management"),
            to=[mt.Address(email=collaborator_email)],
            subject="Invitation to a TaskTrek Projext",
            html=f"""
                <!doctype html>
                <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                </head>
                <body style="font-family: sans-serif;">
                    <div style="display: block; margin: auto; max-width: 600px;" class="main">
                    <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">
                        Invitation to Collaborate on TaskTrek Project
                    </h1>
                    <p>Hello,</p>
                    <p>You have been invited to collaborate on a project in TaskTrek!</p>
                    <p>Please <a href="http://localhost:3000/login">log in</a> to your TaskTrek account to accept the invitation and start collaborating with your team.</p>
                    <p>Thank you!</p>
                    </div>
                    <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
                    <style>
                    .main {{ background-color: white; }}
                    a:hover {{ border-left-width: 1em; min-height: 2em; }}
                    </style>
                </body>
            </html>
            """,
            category="Integration Test",
        )
        client = mt.MailtrapClient(token=os.environ.get('MAILTRAP_TOKEN'))
        client.send(mail)
        return "Mail Sent"
                

    def serialize(self):
        """
        Serialize the ProjectCollaborator object to a dictionary.
        """
        return {
            'id': self.id,
            'project_id': self.project_id,
            'collaborator_email': self.collaborator_email
        }

    def __init__(self, project_id, collaborator_email):
        self.project_id = project_id
        self.collaborator_email = collaborator_email

    def __repr__(self):
        return '<id: Project collaborator: {}'.format(self.id)