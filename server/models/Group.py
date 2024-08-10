# Model for Groups for sharing recipes

from connection import db

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    members = db.Column(db.JSON, nullable=False)
    recipes = db.relationship('Recipe', backref='group', lazy=True)
    admin_email = db.Column(db.String(100), db.ForeignKey('user.email'), nullable=False)
    join_code = db.Column(db.String(7), nullable=True, unique=True, default=None)
    is_private = db.Column(db.Boolean, nullable=False, default=False)

    def __init__(self, name, members, recipes, admin_email, join_code, is_private):
        self.name = name
        if not members:
            members = []
        group_admin = { "email": admin_email, "role": "admin" }
        if not group_admin in members:
            members.append(group_admin)
        self.members = members
        self.recipes = recipes if recipes else []
        self.admin_email = admin_email
        self.join_code = join_code
        self.is_private = is_private

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'members': self.members,
            'recipes': self.recipes,
            'admin_email': self.admin_email,
            'join_code': self.join_code,
            'is_private': self.is_private
        }
    