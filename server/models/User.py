# Model for Creating Users

from connection import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(25), unique=True, nullable=True)
    created_recipes = db.relationship('Recipe', backref='creator', lazy=True)
    saved_recipes = db.relationship('Saves', backref='saver', lazy=True)
    groups = db.Column(db.JSON, nullable=False)

    # Init Method: Initialize the User
    def __init__(self, email, username=None, groups=None):
        self.email = email
        self.username = username if username else None
        self.groups = groups if groups else []

    # Serialize Method: Return the User as a JSON Object
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'created_recipes': [recipe.serialize() for recipe in self.created_recipes],
            'saved_recipes': [recipe.serialize() for recipe in self.saved_recipes],
            'groups': self.groups
        }