from flask.cli import AppGroup
# from .models import environment

# So we can type `flask seed --help`
seed_commands = AppGroup("seed")

# @seed_commands.command("all")
# def seed():
#     if environment == "production":

# @seed_commands.command("undo")
# def undo():
