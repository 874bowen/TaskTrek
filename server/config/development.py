import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Database Configuration for MySQL
DATABASE_URI = 'mysql+pymysql://{dbuser}:{dbpass}@{dbhost}/{dbname}'.format(
    dbuser=os.environ.get('DBUSER'),
    dbpass=os.environ.get('DBPASS'),
    dbhost=os.environ.get('DBHOST'),
    dbname=os.environ.get('DBNAME')
)

# Timezone Configuration
TIME_ZONE = 'UTC'

# Static Files Configuration
STATICFILES_DIRS = [str(BASE_DIR.joinpath('static'))]
STATIC_URL = '/static/'
