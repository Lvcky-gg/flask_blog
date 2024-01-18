from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__="posts"

    if environment == "production":
        __table_args = {"schema": SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    body = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    user = db.relationship("User", back_populates="user_posts")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body":self.body,
            "user":self.user.to_dict(),
            "created_at": self.created_at,
        }