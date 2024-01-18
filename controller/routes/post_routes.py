from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from model import Post, db
from model.utils import (
    BaseException,
    ValidationException,
    NotFoundException,
    ForbiddenException,
    handle_error
)
from datetime import datetime

post_routes_blueprint = Blueprint("posts", __name__)

@post_routes_blueprint.route("/", methods=["GET"])
def get_all_posts():
    try:
        all_posts = Post.query().all()
    except BaseException as e:
        return handle_error(e)
    return jsonify({"posts": all_posts},200)