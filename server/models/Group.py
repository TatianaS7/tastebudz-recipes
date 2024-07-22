# Model for Groups for sharing recipes

from connection import db

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    members = db.Column(db.JSON, nullable=False)
    recipes = db.relationship('Recipe', backref='group', lazy=True)
    admin = db.Column(db.String(100), nullable=False)

    def __init__(self, name, members, recipes, admin):
        self.name = name
        if not members:
            members = []
        group_admin = { "email": admin, "role": "admin" }
        if not group_admin in members:
            members.append(group_admin)
        self.members = members
        self.recipes = recipes if recipes else []
        self.admin = admin

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'members': self.members,
            'recipes': self.recipes,
            'admin': self.admin
        }
    