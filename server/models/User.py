# Model for Creating Users

from connection import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(25), unique=True, nullable=True)
    created_recipes = db.relationship('Recipe', backref='creator', lazy=True)
    saved_recipes = db.relationship('Saves', backref='saver', lazy=True)
    groups = db.relationship('Group', backref='admin', lazy=True)

    # Init Method: Initialize the User
    def __init__(self, email, username=None):
        self.email = email
        self.username = username

    # Serialize Method: Return the User as a JSON Object
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'created_recipes': [recipe.serialize() for recipe in self.created_recipes],
            'saved_recipes': [recipe.serialize() for recipe in self.saved_recipes],
            'groups': [group.serialize() for group in self.groups]
        }