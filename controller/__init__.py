import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from model import db
# from .seeds import seed_commands
from .config import Config


def create_app():
    app = Flask(__name__, static_folder="../../frontend/build", static_url_path="/")


    login = LoginManager(app)
    login.login_view = "auth.unauthorized"

    # @login.user_loader
    # def load_user(id):
    #     return User.query.get(int(id))
    # app.cli.add_command(seed_commands)


    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)

    flask_env = os.environ.get("FLASK_ENV")
    if flask_env == "development":
        CORS(
            app,
            origins=["http://localhost:3000", "http://localhost:5000"],
            supports_credentials=True,
        )
    elif flask_env == "production":
        CORS(
            app, origins="https://pet-overload.onrender.com/", supports_credentials=True
        )

    @app.before_request
    def https_redirect():
        if os.environ.get("FLASK_ENV") == "production":
            if request.headers.get("X-Forwarded-Proto") == "http":
                url = request.url.replace("http://", "https://", 1)
                code = 301
                return redirect(url, code=code)

    @app.after_request
    def inject_csrf_token(response):
        print(f"FLASK_ENV: {os.environ.get('FLASK_ENV')}")
        response.set_cookie(
            "csrf_token",
            generate_csrf(),
            secure=True if os.environ.get("FLASK_ENV") == "production" else False,
            samesite="Strict" if os.environ.get("FLASK_ENV") == "production" else None,
            httponly=False,
        )
        return response

    return app


app = create_app()


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    route_list = {
        rule.rule: [
            [method for method in rule.methods if method in acceptable_methods],
            app.view_functions[rule.endpoint].__doc__,
        ]
        for rule in app.url_map.iter_rules()
        if rule.endpoint != "static"
    }
    return route_list


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    if path == "favicon.ico":
        return app.send_from_directory("public", "favicon.ico")
    return app.send_static_file("index.html")



@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")