from flask import Blueprint, request, jsonify
from connection import db

from models import Recipe, Group

search = Blueprint('search', __name__)

# RECIPES ROUTES
# Search Recipes (by name, ingredient, or tag)
@search.route('/recipes', methods=['GET'])
def search_recipes():
    try:
        query = request.args.get('query')
        if not query:
            return jsonify({'error': 'No query provided'})
        
        recipe_data = []

        # Search for public recipes by name
        recipes_by_name = Recipe.query.filter(
            (Recipe.name.ilike(f'%{query}%'))
        ).filter_by(is_public=True).all()

        # Add the recipes to the recipe_data list
        recipe_data.extend([recipe.serialize() for recipe in recipes_by_name])

        # Search for public recipes by ingredient
        all_recipes = Recipe.query.filter_by(is_public=True).all()
        for recipe in all_recipes:
            ingredients = recipe.ingredients
            if any(query.lower() in ingredient['ingredient'].lower() for ingredient in ingredients):
                recipe_data.append(recipe.serialize())

        # Search for public recipes by tag
        recipes_by_tag = Recipe.query.filter(
            Recipe.tags.like(f'%"{query}"%')
        ).filter_by(is_public=True).all()
                
        # Add the recipes with the tag to the recipe_data list
        recipe_data.extend([recipe.serialize() for recipe in recipes_by_tag])

        # Make sure there are no duplicate recipes
        recipe_data = list({recipe['id']: recipe for recipe in recipe_data}.values())

        return jsonify(recipe_data)
    except Exception as e:
        return(str(e))
    

# Search Groups (by name)
@search.route('/groups', methods=['GET'])
def search_groups():
    try:
        query = request.args.get('query')
        group_data = []

        if not query:
            return jsonify({'error': 'No query provided'})
        
        # Search for groups by name
        groups = Group.query.filter(Group.name.ilike(f'%{query}%')).all()

        if not groups:
            return jsonify({'error': 'No groups found'})
        
        # Return only the group names
        for group in groups:
            sanitized_group = {
                "id": group.id,
                "name": group.name, 
                "admin_email": group.admin_email,
                "is_private": group.is_private,
                "join_code": group.join_code
            }
            group_data.append(sanitized_group)
        
        return jsonify(group_data)
    except Exception as e:
        return(str(e))

