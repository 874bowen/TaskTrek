from app import db

class TaskTag(db.Model):
    """
    TaskTags Model for storing association task and tags
    """
    __tablename__ = 'task_tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)

    def __init__(self, task_id, tag_id):
        self.task_id = task_id
        self.tag_id = tag_id
    
    def __repr__(self):
        return '<id: Project tag: {}'.format(self.id)
    
    def serialize(self):
        return {
            'id': self.id,
            'task_id': self.task_id,
            'tag_id': self.tag_id
        }
