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
    
@post_routes_blueprint.route("/<int:id>", methods=["GET"])
def get_by_id(id):
    try:
        post = Post.query.get(id)
    except BaseException as e:
        return handle_error(e)
    if post:
        return jsonify({"post": post},200)
    else:
        return (
            jsonify({"message":"Error: No Post Located", "status":"404"}, 404)
        )    

@post_routes_blueprint.route("/<int:id>", methods=["PUT"])
@login_required
def modify_post(id):
    try:
        post = Post.query.get(id)
    except BaseException as e:
        return handle_error(e)
    if post:
        if int(post.user_id) == int(session["__user_id"]):
            # come look at this later
            post.title = request.json.get("title")
            post.body = request.json.get("body")
            db.session.commit()
            return jsonify(post.to_dict(), 200)
        else:
            return jsonify({"message":"Unauthorized User", "status":"403"},403)
    else:
        return jsonify({"message":"Post could not be found", "status code":404},404)


# @post_routes_blueprint.route("/<int:id>", methods=["DELETE"])
# @login_required
# def delete_post(id):
    """
    todo
    """

# @post_routes_blueprint.route("/", methods=["POST"])
# @login_required
# def create_post():
    """
    todo
    """