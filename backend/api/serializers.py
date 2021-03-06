from flask_restx import fields
from backend.api import api

well = api.model('Well', {
    'well_id': fields.Integer(readOnly=True),
    'api': fields.String(readOnly=True),
    'well_name': fields.String(readOnly=True),
    'country': fields.String(readOnly=True),
    'basin': fields.String(readOnly=True),
    'state': fields.String(readOnly=True),
    'county': fields.String(readOnly=True),
    'township': fields.String(readOnly=True),
    'section': fields.String(readOnly=True),
    'range': fields.String(readOnly=True),
    'field': fields.String(readOnly=True),
    'target': fields.String(readOnly=True),
    'type': fields.String(readOnly=True),
    'lat': fields.Float(readOnly=True),
    'long': fields.Float(readOnly=True),
    'elevation': fields.Float(readOnly=True),
    'rkb': fields.Float(readOnly=True),
})

job = api.model('Job', {
    'job_num': fields.Integer(readOnly=True),
    'job_id': fields.String(readOnly=True),
    'well_id': fields.Integer(attribute='well.well_id'),
    'operator': fields.String(readOnly=True),
    'rig': fields.String(readOnly=True),
    'dd_job': fields.String(readOnly=True),
    'mwd_job': fields.String(readOnly=True),
    'mwd_vendor': fields.String(readOnly=True),
    'status': fields.String(readOnly=True),
    'office': fields.String(readOnly=True),
    'sp_start_date': fields.Date(readOnly=True),
    'sp_end_date': fields.Date(readOnly=True),
    'well': fields.Nested(well)

})

# TODO: This should not have an email column.  It should be linked to the Users table.  Will require local db or a
#  website_dev2
upload = api.model('Upload', {
    'id': fields.Integer(readOnly=True),
    'email': fields.String(readOnly=True),
    'job_id': fields.String(readOnly=True),
    'job_num': fields.Integer(readOnly=True),
    'file_name': fields.String(readOnly=True),
    'file_group': fields.String(readOnly=True),
    'run_num': fields.Integer(readOnly=True),
    'bha_num': fields.Integer(readOnly=True),
    'file_path': fields.String(readOnly=True),
    'datetime_uploaded': fields.DateTime(readOnly=True),
    'uuid': fields.String(readOnly=True),
    'action': fields.String(readOnly=True),
    'type': fields.String(readOnly=True),

})
