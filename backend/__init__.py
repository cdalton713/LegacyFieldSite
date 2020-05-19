from flask import Flask, jsonify, has_request_context, request
from flask_sqlalchemy import SQLAlchemy
import os
from flask_login import LoginManager
from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_session import Session
from authlib.integrations.flask_client import OAuth
from loginpass import Azure, create_flask_blueprint
from backend.api import api
from flask_cors import CORS

login = LoginManager()

PKG_NAME = os.path.dirname(os.path.realpath(__file__)).split('/')[-1]


db = SQLAlchemy()

ma = Marshmallow()
sess = Session()
oauth = OAuth()
cors = CORS()

from backend.api.auth import fetch_token, update_token


def create_app(app_name=PKG_NAME, **kwargs):
    """Start app.  Setup config profiles as needed."""
    app = Flask(__name__)
                # instance_relative_config=True, static_folder='./frontend/build', static_url_path='/')
    if app.config['ENV'] == "production":
        app.config.from_object("config.ProductionConfig")
    elif app.config['ENV'] == "testing":
        app.config.from_object("config.TestingConfig")
    else:
        app.config.from_object("config.DevelopmentConfig")

    # if kwargs.get('celery'):
    #     init_celery(kwargs.get('celery'), app)

    login.init_app(app)
    db.init_app(app)
    ma.init_app(app)
    cors.init_app(app, resources={r"/api/v1/*": {"origins": "http://localhost:*"}})
    # sess.init_app(app)
    # bootstrap.init_app(app)
    # mail.init_app(app)

    oauth.init_app(app, fetch_token=fetch_token, update_token=update_token)

    # from uploadApp.errors import bp as error_bp
    # app.register_blueprint(error_bp)
    #
    # from uploadApp.upload import bp as upload_bp
    # app.register_blueprint(upload_bp)
    #
    # from uploadApp.home import bp as home_bp
    # app.register_blueprint(home_bp)
    #
    # from uploadApp.incident import bp as incident_bp
    # app.register_blueprint(incident_bp)
    #
    # from uploadApp.remote import bp as remote_bp
    # app.register_blueprint(remote_bp)

    from backend.api import bp as api_bp, api
    from backend.api.endpoints.jobs import ns as jobs_namespace

    api.add_namespace(jobs_namespace)
    app.register_blueprint(api_bp, url_prefix='/api/v1')



    azure_bp = create_flask_blueprint(Azure, oauth, handle_authorize)
    app.register_blueprint(azure_bp, url_prefix='/azure')


    # app.jinja_env.globals['EDITORS'] = app.config['INCIDENT_EDITORS']
    # with app.app_context():
    #     app.jinja_env.globals.update({
    #         'NOW': datetime.now()
    #     })

    if not os.path.exists('logs'):
        os.mkdir('logs')

    # if not app.debug:
        # if app.config['MAIL_SERVER']:
        #     auth = None
        #     if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
        #         auth = (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
        #     secure = None
        #     if app.config['MAIL_USE_TLS']:
        #         secure = ()
        #     mail_handler = SMTPHandler(
        #         mailhost=(app.config['MAIL_SERVER'], app.config['MAIL_PORT']),
        #         fromaddr='design@legacydirectional.com',
        #         toaddrs=['cdalton@legacydirectional.com'], subject='Website Error',
        #         credentials=auth, secure=secure)
        #
        #     mail_handler.setLevel(logging.WARNING)
        #     mail_handler.setFormatter(email_request_formatter)
        #     app.logger.addHandler(mail_handler)

    # if not os.path.exists('logs'):
    #     os.mkdir('logs')

    # app.logger.setLevel(logging.INFO)
    # app.logger.info('Legacy startup')

    return app

def handle_authorize(remote, token, user_info):
    return jsonify(user_info)
    # if token:
    #     save_token(remote.name, token)
    # if user_info:
    #     save_user(user_info)
    #     return user_page