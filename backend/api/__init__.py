from flask import Blueprint
from flask_restx import Api
from flask import request, Response
from backend.api.jwt import authorize
from backend.api.jwt import InvalidAuthorizationToken
bp = Blueprint('api', __name__)

def validate():
    try:
        token = request.headers.environ['HTTP_AUTHORIZATION'].split(' ')[-1]
    except KeyError:
        return None
    auth = authorize(token)
    if isinstance(auth, InvalidAuthorizationToken):
        return Response(auth.args[0], 401)
    pass

# bp.before_request(validate)

authorizations = {
'Bearer Auth': {
        'type': 'basic',
        'in': 'header',
        'name': 'Authorization'
    },
}

api = Api(bp, version='1.0', title='API', authorizations=authorizations)
