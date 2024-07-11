# Model for Groups for sharing recipes

from connection import db

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    members = db.Column(db.String(500), nullable=False)
    recipes = db.Column(db.String(500), nullable=False)
    created_by = db.Column(db.String(100), nullable=False)

    def __init__(self, name, members, recipes, created_by):
        self.name = name
        self.members = members
        self.recipes = recipes
        self.created_by = created_by

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'members': self.members,
            'recipes': self.recipes,
            'created_by': self.created_by
        }