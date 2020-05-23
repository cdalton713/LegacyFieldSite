from backend.models import Job, GeneralJobSchema, Well, Upload
from flask import current_app as app
from flask import render_template
from flask import jsonify
from config import SCHEMA_MAIN, SCHEMA_WEBSITE
from datetime import datetime, timedelta
from backend import db
from flask_login import login_required
from flask import request
from flask_restx import Resource
from backend.api import api
from backend.api.serializers import upload
from sqlalchemy.orm import joinedload
from backend.api.jwt import validate
ns = api.namespace('Uploads', description='Operations related to file uploads.')

@ns.route('/')
class UploadCollection(Resource):

    @validate
    @api.marshal_with(upload)
    def get(self):
        uploads = db.session.query(Upload)
        return uploads


@ns.route('/<int:job_num>')
@api.response(404, 'Files not found.')
class UploadItem(Resource):

    @validate
    @api.marshal_with(upload)
    def get(self, job_num):
        # TODO: Setup blob storage modules for this to work.
        return None