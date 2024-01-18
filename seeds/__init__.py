from flask.cli import AppGroup
from .user import seed_users, undo_users
from model import environment

# So we can type `flask seed --help`
seed_commands = AppGroup("seed")

@seed_commands.command("all")
def seed():
    if environment == "production":
            undo_users()
    seed_users()

@seed_commands.command("undo")
def undo():
      undo_users()
