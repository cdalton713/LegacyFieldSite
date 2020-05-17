import os
import redis
# from cryptography.fernet import Fernet
from dotenv import load_dotenv

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# load_dotenv(dotenv_path=r'/mnt/c/Users/bstephan/Desktop/Data Pipeline/project files/source/.env')
SCHEMA_MAIN = os.environ.get('SCHEMA_MAIN')
SCHEMA_WEBSITE = os.environ.get('WEBSITE_SCHEMA')

AZURE_STORAGE_ACCOUNT = 'lddstorage'
AZURE_STORAGE_CONTAINER = os.environ.get('AZURE_STORAGE_CONTAINER')
AZURE_STORAGE_KEY = os.environ.get('AZURE_STORAGE_KEY')
AZURE_STORAGE_CONNECTION_STRING = os.environ.get('AZURE_STORAGE_CONNECTION_STRING')

REDIS_HOST = os.environ.get('REDIS_HOST')
REDIS_KEY = os.environ.get('REDIS_KEY')
SESSION_REDIS = os.environ.get('SESSION_REDIS')


class BaseConfig(object):

    SECRET_KEY = os.environ.get('SECRET_KEY')
    TESTING = False
    DEBUG = False
    # URL_KEY = Fernet.generate_key()
    # CIPHER = Fernet(URL_KEY)
    CSRF_ENABLED = True
    # CKEDITOR_FILE_UPLOADER = '/data/ckeditor/'
    UPLOADED_PATH = os.path.join(BASE_DIR, 'uploads')
    DATA = os.path.join('home', 'data')
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.StrictRedis(host=REDIS_HOST, port=6380, db=0,
                                      password=REDIS_KEY, ssl=True)

    # Use NullSessionInterface if you don't have a redis server.
    # SESSION_TYPE = 'NullSessionInterface'

    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_recycle': 90,
        'pool_timeout': 900,
        'pool_size': 10,
        'max_overflow': 5}

    if SQLALCHEMY_DATABASE_URI is None:
        print('MISSING SQL URL')

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_PERMANENT = True

    SESSION_COOKIE_PATH = '/'
    # FLASK_ADMIN_SWATCH = 'cerulean'
    # ADMINS = os.environ.get('ADMINS').split()

    # Who gets the Incident emails
    # INCIDENT_EDITORS = os.environ.get('INCIDENT_EDITORS').split()
    #
    # # Who gets the DD Quick form email DDs.
    # DD_FORM_TO_LIST = os.environ.get('DD_FORM_TO_LIST').split()

    # Settings for OAuth auto sign-in.
    AZURE_CLIENT_ID = os.environ.get('REACT_OAUTH_CLIENT_ID')
    # AZURE_CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
    # SECRET_KEY = os.environ.get('CLIENT_SECRET')
    TENANT_ID = os.environ.get('REACT_OAUTH_TENANT_ID')
    AZURE_ACCESS_TOKEN_URL = f'https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token'
    AZURE_AUTHORIZE_URL = f'https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize'
    AZURE_API_BASE_URL = 'https://graph.microsoft.com/v1.0/'
    AZURE_CLIENT_KWARGS = {'scope': 'Sites.Read.All openid offline_access User.ReadBasic.All Mail.Send'}
    REDIRECT_URI = os.environ.get('REACT_OAUTH_REDIRECT_URI')
    PREFERRED_URL_SCHEME = 'https'

    # Settings for the Logging SMTPHandler.
    # MAIL_SERVER = os.environ.get('MAIL_SERVER')
    # MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
    # MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
    # MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    # MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    # MAIL_DEBUG = True
    # MAIL_SUPPRESS_SEND = False
    # TESTING = False


class ProductionConfig(BaseConfig):
    pass


class TestingConfig(BaseConfig):
    print("TESTING MODE")
    TESTING = True
    PREFERRED_URL_SCHEME = 'https'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')  # or \'sqlite:///' + os.path.join(BASE_DIR, 'app.db')


class DevelopmentConfig(BaseConfig):
    print("DEVELOPER MODE")
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')  # or \'sqlite:///' + os.path.join(BASE_DIR, 'app.db')
    SQLALCHEMY_ECHO = True

    DATA = os.path.join(r'C:\testData')