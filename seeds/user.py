from model import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo User",
        email="demo@aa.io",
        password="password",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    marnie = User(
        username="Marnie",
        email="marnie@aa.io",
        password="marnieisawesome",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    bobbie = User(
        username="Bobbie",
        email="bobbie@aa.io",
        password="ilovepets1234",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

def undo_users():
    if environment == "production":
         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()