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
        all_posts = Post.query.all()
    except BaseException as e:
        return handle_error(e)
    if all_posts:
        return jsonify({"posts": [post.to_dict() for post in all_posts]},200)
    else:
        return (
            jsonify({"message":"Error: No Posts Located", "status":"404"}, 404)
        )
    
# @post_routes_blueprint.route("/<int:id>", methods=["GET"])
# def get_by_id(id):
    """
    todo
    """
# @post_routes_blueprint.route("/<int:id>", methods=["PUT"])
# @login_required
# def modify_post(vote_id):
    """
    todo
    """
# @post_routes_blueprint.route("/<int:id>", methods=["DELETE"])
# @login_required
# def delete_post(vote_id):
    """
    todo
    """

# @post_routes_blueprint.route("/", methods=["POST"])
# @login_required
# def create_post():
    """
    todo
    """