# Model for Groups for sharing recipes

from connection import db

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    members = db.Column(db.JSON, nullable=False)
    recipes = db.relationship('Recipe', backref='group', lazy=True)
    admin = db.Column(db.String(100), nullable=False)
    join_code = db.Column(db.String(7), nullable=True, unique=True, default=None)
    is_private = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, name, members, recipes, admin, join_code, is_private):
        self.name = name
        if not members:
            members = []
        group_admin = { "email": admin, "role": "admin" }
        if not group_admin in members:
            members.append(group_admin)
        self.members = members
        self.recipes = recipes if recipes else []
        self.admin = admin
        self.join_code = join_code
        self.is_private = is_private

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'members': self.members,
            'recipes': self.recipes,
            'admin': self.admin,
            'join_code': self.join_code,
            'is_private': self.is_private
        }
    