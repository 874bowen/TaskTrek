from flask import Flask
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

app.config['SECRET_KEY'] = "\x03m\x87\t\x80\x9b\x8f\xfd\x15\xecVV\xa6h\x05g\x1a\xfe\xb2\xc9\x9f\xa9\xd27"
app.config['BCRYPT_LOG_ROUNDS'] = 13

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