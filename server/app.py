from flask import Flask
import os

app = Flask(__name__)

if 'WEBSITE_HOSTNAME' not in os.environ:
    # local development, where we'll use environment variables
    print("Loading config.development and environment variables from .env file.")
    app.config.from_object('config.development')
else:
    # production
    print("Loading config.production.")
    app.config.from_object('config.production')

# 127.0.0.1
app.config.update(
    SQLALCHEMY_DATABASE_URI=app.config.get('DATABASE_URI'),
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
)

app.config['SECRET_KEY'] = "ade24rset6TEFY4434fdy4ss"

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)
from flask_cors import CORS
CORS(app)

from src.routes.auth import auth_bp
app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route("/")
def hello_world():
    return "<p>Welcome to TaskTrek!</p>"