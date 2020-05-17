from flask import Blueprint
from  flask_restx import Api
bp = Blueprint('api', __name__)

api = Api(bp, version='1.0', title='API')
