import requests
from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
import jwt
from datetime import timedelta
from flask import request
from flask import current_app as app
from flask import Response
from functools import wraps


class InvalidAuthorizationToken(Exception):
    def __init__(self, details):
        super().__init__('Invalid authorization token: ' + details)


def get_public_key(access_token):
    """ Retrieve public key for access token """
    token_header = jwt.get_unverified_header(access_token)

    res = requests.get('https://login.microsoftonline.com/common/.well-known/openid-configuration')
    jwk_uri = res.json()['jwks_uri']

    res = requests.get(jwk_uri)
    jwk_keys = res.json()

    x5c = None
    # Iterate JWK keys and extract matching x5c chain
    for key in jwk_keys['keys']:
        if key['kid'] == token_header['kid']:
            x5c = key['x5c']
            break
        else:
            raise InvalidAuthorizationToken('kid not recognized')

    cert = ''.join([
        '-----BEGIN CERTIFICATE-----\n',
        x5c[0],
        '\n-----END CERTIFICATE-----\n',
    ])
    try:
        public_key = load_pem_x509_certificate(cert.encode(), default_backend()).public_key()
    except Exception as error:
        raise InvalidAuthorizationToken('Failed to load public key: {}'.format(error))

    return public_key, key['kid']



def authorize(token):
    client_id = app.config['AZURE_CLIENT_ID']
    public_key, kid = get_public_key(token)
    decoded = None
    try:
        decoded = jwt.decode(
            token,
            public_key,
            algorithms='RS256',
            audience=client_id,
            leeway=timedelta(seconds=10)
        )
        if decoded is None:
            InvalidAuthorizationToken('Authorization Failed')
        return decoded
    except Exception as error:
        return InvalidAuthorizationToken('Authorization Failed: {}'.format(error))


def validate(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            token = request.headers.environ['HTTP_AUTHORIZATION'].split(' ')[-1]
        except KeyError:
            return Response('Access denied.  Token not provided.', 401)
        auth = authorize(token)
        if isinstance(auth, InvalidAuthorizationToken):
            return Response(auth.args[0], 401)
        return f(*args, **kwargs)

    return decorated_function