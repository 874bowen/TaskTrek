from app import db, app
from sqlalchemy_serializer import SerializerMixin
import datetime

class Status(db.Model, SerializerMixin):
    """
    Status Model for storing status related details
    """
    __tablename__ = 'status'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.String(500), unique=True, nullable=False)
    hex_color = db.Column(db.String(300), unique=False, nullable=False)
    created_on = db.Column(db.DateTime, nullable=False)
    modified_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, status, hex_color):
        self.status = status
        self.hex_color = hex_color
        self.created_on = datetime.datetime.now()
        self.modified_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: status: {}'.format(self.status)