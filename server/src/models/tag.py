from app import db
from sqlalchemy_serializer import SerializerMixin
import datetime

class Tag(db.Model, SerializerMixin):
    """
    Tag Model for storing tag related details
    """
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag = db.Column(db.String(500), unique=True, nullable=False)
    hex_color = db.Column(db.String(300), unique=False, nullable=False)
    created_on = db.Column(db.DateTime, nullable=False)
    modified_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, tag, hex_color):
        self.tag = tag
        self.hex_color = hex_color
        self.created_on = datetime.datetime.now()
        self.modified_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: tag: {}'.format(self.tag)
    
    def serialize(self):
        return {
            'id': self.id,
            'tag': self.tag,
            'hex_color': self.hex_color,
            'created_on': self.created_on,
            'modified_on': self.modified_on
        }