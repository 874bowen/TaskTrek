from flask import Flask
from flask_mail import Mail
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)

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

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['BCRYPT_LOG_ROUNDS'] = os.environ.get('BCRYPT_LOG_ROUNDS')

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_seeder import FlaskSeeder

db = SQLAlchemy(app)
migrate = Migrate(app, db)
from flask_cors import CORS
CORS(app)
seeder = FlaskSeeder(app, db)
mail = Mail(app)

from src.routes.auth import auth_bp
from src.routes.project import project_bp
from src.routes.collaborator import project_collaborator_bp
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(project_bp, url_prefix='/projects')
app.register_blueprint(project_collaborator_bp, url_prefix='/project_collaborator')

@app.route("/")
def hello_world():
    return "<p>Welcome to TaskTrek!</p>"