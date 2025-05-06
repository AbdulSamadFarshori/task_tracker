from flask_smorest import Blueprint, abort
from flask.views import MethodView
from flask_jwt_extended import create_access_token, get_jwt_identity
from src.models import TokensModel
from src.schemas.schema import TokensSchema


bp = Blueprint("Tokens", __name__, url_prefix="tokens", description="handle token related operations.")

