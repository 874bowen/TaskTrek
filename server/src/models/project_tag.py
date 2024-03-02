from app import db

class ProjectTag(db.Model):
    """
    ProjectTags Model for storing association projects and tags
    """
    __tablename__ = 'project_tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)

    def __init__(self, project_id, tag_id):
        self.project_id = project_id
        self.tag_id = tag_id
    
    def __repr__(self):
        return '<id: Project tag: {}'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'tag_id': self.tag_id
        }
