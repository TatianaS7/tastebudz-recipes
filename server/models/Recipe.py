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

    def __init__(self, name, ingredients, instructions, servings, time, image, tags, user):
        self.name = name
        self.ingredients = ingredients
        self.instructions = instructions
        self.servings = servings
        self.time = time
        self.image = image
        self.tags = tags
        self.user = user

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
            'user': self.user
        }