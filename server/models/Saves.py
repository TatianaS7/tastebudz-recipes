# Model for Saved Recipes and Users 

from connection import db

class Saves(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    creator = db.Column(db.String(100), db.ForeignKey('recipe.user'), nullable=False)
    recipe_id = db.Column(db.String(100), db.ForeignKey('recipe.id'), nullable=False)
    saved_by = db.Column(db.String(100), db.ForeignKey('user.email'), nullable=False)
    
    def __init__(self, creator, recipe_id, saved_by):
        self.creator = creator
        self.recipe_id = recipe_id
        self.saved_by = saved_by

    def serialize(self):
        return {
            'id': self.id,
            'creator': self.creator,
            'recipe_id': self.recipe_id,
            'saved_by': self.saved_by
        }