from model import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_posts():
    demo = Post(
        title="Hello World",
        body="This is a test seed",
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    db.session.add(demo)
    db.session.commit()


def undo_posts():
    if environment == "production":
         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
