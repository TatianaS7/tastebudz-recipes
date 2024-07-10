# Model for Saved Recipes and Users 

from connection import db
from datetime import datetime

class Saves(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    save_type = db.Column(db.String(100), nullable=False)
    creator = db.Column(db.String(100), nullable=False)
    recipe_id = db.Column(db.String(100), nullable=False)
    saved_by = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime)

    def __init__(self, save_type, creator, recipe_id, saved_by, created_at):
        self.save_type = save_type
        self.creator = creator
        self.recipe_id = recipe_id
        self.saved_by = saved_by
        self.created_at = created_at

    def serialize(self):
        return {
            'id': self.id,
            'save_type': self.save_type,
            'creator': self.creator,
            'recipe_id': self.recipe_id,
            'saved_by': self.saved_by,
            'created_at': self.created_at
        }