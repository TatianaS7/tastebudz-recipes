# Seed Data Functions

from models import Group, Recipe
import json
from connection import db

def seed_groups():
    db.session.query(Group).delete()

    with open('server/seed_data/seedGroups.json') as f:
        data = json.load(f)

        for group in data:
            new_group = Group(
                name=group['name'],
                members=group['members'],
                recipes=group['recipes'],
                admin=group['admin']
            )
            db.session.add(new_group)
            db.session.commit()

def seed_recipes():
    db.session.query(Recipe).delete()

    with open('server/seed_data/seedRecipes.json') as f:
        data = json.load(f)

        for recipe in data:
            new_recipe = Recipe(
                name=recipe['name'],
                ingredients=recipe['ingredients'],
                instructions=recipe['instructions'],
                servings= recipe.get('servings', None),
                time= recipe.get('time', None),
                image= recipe.get('image', None),
                tags=recipe['tags'],
                user=recipe['user'],
                group_id= recipe.get('group_id', None),
                is_public= recipe.get('is_public', True)
            )
            db.session.add(new_recipe)
            db.session.commit()

def seedData():
    seed_groups()
    seed_recipes()
    print('Seeded Data')