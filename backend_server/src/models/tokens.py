from db import db
from src.models.base import BaseModel

class TokensModel(BaseModel):

    __tablename__ = "Tokens"
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    users = db.relationship('UserModel', back_populates='tokens')
    access_token = db.Column(db.Text, nullable=False, unique=True)
    refresh_token = db.Column(db.Text, nullable=False, unique=True)
