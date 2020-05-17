import logging
import traceback
from backend.api import api
from sqlalchemy.orm.exc import NoResultFound

logger = logging.getLogger(__name__)

@api.errorhandler
def default_error_handler(e):
    message = 'An unhandled exception occurred.'
    logger.exception(message)

    # if not settings.FLASK_DEBUG:
    #     return {'message': message}, 500

@api.errorhandler(NoResultFound)
def database_not_found_error_handler(e):
    logger.warning(traceback.format_exc())
    return {'message': 'A database result was required but none was found.'}, 404