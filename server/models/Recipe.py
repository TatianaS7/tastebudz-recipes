# Model for Recipes

from connection import db

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.JSON, nullable=False)
    instructions = db.Column(db.JSON, nullable=False)
    servings = db.Column(db.Integer, nullable=True)
    time = db.Column(db.Integer, nullable=True)
    image = db.Column(db.String(500), nullable=True)
    tags = db.Column(db.JSON, nullable=False)
    user = db.Column(db.String(100), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=True)
    is_public = db.Column(db.Boolean, nullable=False, default=True)

    def __init__(self, name, ingredients, instructions, servings, time, image, tags, user, group_id, is_public):
        self.name = name
        self.ingredients = ingredients
        self.instructions = instructions
        self.servings = servings
        self.time = time
        self.image = image
        self.tags = tags
        self.user = user
        self.group_id = group_id
        self.is_public = is_public

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'ingredients': self.ingredients,
            'instructions': self.instructions,
            'servings': self.servings,
            'time': self.time,
            'image': self.image,
            'tags': self.tags,
            'user': self.user,
            'group_id': self.group_id,
            'is_public': self.is_public
        }
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ingredients': self.ingredients,
            'instructions': self.instructions,
            'servings': self.servings,
            'time': self.time,
            'image': self.image,
            'tags': self.tags,
            'user': self.user,
            'group_id': self.group_id,
            'is_public': self.is_public
        }