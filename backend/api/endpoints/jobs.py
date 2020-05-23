from backend.models import Job, GeneralJobSchema, Well
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
from backend.api.serializers import job
from sqlalchemy.orm import joinedload
from backend.api.jwt import validate
ns = api.namespace('Jobs', description='Operations related to jobs.')


@ns.route('/')
class JobCollection(Resource):

    @validate
    @api.marshal_with(job)
    def get(self):
        jobs = db.session.query(Job).options(joinedload(Job.well)).all()
        return jobs


@ns.route('/<int:job_num>')
@api.response(404, 'Job not found.')
class JobItem(Resource):

    @validate
    @api.marshal_with(job)
    def get(self, job_num):
        return Job.query.filter(Job.job_num == job_num).one()


# @bp.route('/jobs/details/active', methods=['GET'])
# # @login_required
# def get_active_jobs():
#     query = f'''
#     SELECT {SCHEMA_MAIN}.jobs.job_id   AS {SCHEMA_MAIN}_jobs_job_id,
#     {SCHEMA_MAIN}.jobs.rig      AS {SCHEMA_MAIN}_jobs_rig,
#     {SCHEMA_MAIN}.jobs.operator AS {SCHEMA_MAIN}_jobs_operator,
#     {SCHEMA_MAIN}.wells.well_name AS {SCHEMA_MAIN}_wells_well_name,
#     {SCHEMA_MAIN}.jobs.job_num  AS {SCHEMA_MAIN}_jobs_job_num
#
#     FROM {SCHEMA_MAIN}.jobs
#     LEFT OUTER JOIN {SCHEMA_MAIN}.wells ON {SCHEMA_MAIN}.wells.well_id = {SCHEMA_MAIN}.jobs.well_id
#     WHERE (({SCHEMA_MAIN}.jobs.sp_start_date > "{(datetime.now() + timedelta(-60)).date().strftime('%Y-%m-%d')}")
#     OR ({SCHEMA_MAIN}.jobs.sp_start_date IS NULL
#     AND right({SCHEMA_MAIN}.jobs.job_id, length({SCHEMA_MAIN}.jobs.job_id) - 2) > 200000))
#     ORDER BY right({SCHEMA_MAIN}.jobs.job_id, length({SCHEMA_MAIN}.jobs.job_id) - 2) DESC
#     '''
#
#     jobs = db.session.query(Job).filter(
#         Job.status.in_(['PENDING', 'ACTIVE', 'COMPLETE PARTIAL BUILD'])).all()
#
#     result = GeneralJobSchema(only=("job_id", "job_num", "rig", "operator", "well.well_name")).dump(jobs, many=True)
#     response = {
#         'data': result,
#         'status_code': 202
#     }
#     return jsonify(response)
