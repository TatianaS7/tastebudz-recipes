from flask import Blueprint, request, jsonify
from connection import db

from models import Recipe

recipes = Blueprint('recipes', __name__)

# Create a Recipe
@recipes.route('/', methods=['POST'])
def create_recipe():
    try:
        data = request.get_json()
        
        if 'name' not in data or 'ingredients' not in data or 'instructions' not in data or 'tags' not in data or 'user' not in data:
            return jsonify({'error': 'Missing required fields'})

        new_recipe = Recipe(
                name=data['name'],
                ingredients=data['ingredients'],
                instructions=data['instructions'],
                servings= data.get('servings', None),
                time= data.get('time', None),
                image= data.get('image', None),
                tags=data['tags'],
                user=data['user'],
                group_id= data.get('group_id', None),
                is_public= data.get('is_public', True)
        )
        db.session.add(new_recipe)
        db.session.commit()
        return jsonify(new_recipe.serialize())
    except Exception as e:
        return(str(e))


# Get All Recipes (if public)
@recipes.route('/all', methods=['GET'])
def get_all_recipes():
    try:
        public_recipes = Recipe.query.filter_by(is_public=True).all()
        results = [recipe.serialize() for recipe in public_recipes]
        return jsonify(results)
    except Exception as e:
        return(str(e))

# Get All User Recipes
@recipes.route('/user/all', methods=['POST'])
def get_recipes_by_user():
    try:
        data = request.get_json()
        if 'email' not in data:
            return jsonify({'error': 'Email is required'})
        
        user_recipes = Recipe.query.filter_by(user=data['email']).all()

        if not user_recipes:
            return jsonify({'error': 'No recipes found for this user'})
        
        results = [recipe.serialize() for recipe in user_recipes]
        return jsonify(results)
    except Exception as e:
        return(str(e))
    
# Update a Recipe (has to be the user who created the recipe)
@recipes.route('/<id>', methods=['PUT'])
def update_recipe(id):
    try:
        recipe = Recipe.query.get(id)
        data = request.get_json()
        if recipe.user == data['user']:
            if 'name' in data:
                recipe.name = data['name']
            if 'ingredients' in data:
                recipe.ingredients = data['ingredients']
            if 'instructions' in data:
                recipe.instructions = data['instructions']
            if 'servings' in data:
                recipe.servings = data['servings']
            if 'time' in data:
                recipe.time = data['time']
            if 'image' in data:
                recipe.image = data['image']
            if 'tags' in data:
                recipe.tags = data['tags']
            if 'is_public' in data:
                recipe.is_public = data['is_public']
            db.session.commit()
            return jsonify(recipe.serialize())
        else:
            return jsonify({'error': 'You are not the owner of this recipe'})
    except Exception as e:
        return(str(e))
    
# Delete a Recipe (has to be the user who created the recipe)
@recipes.route('/<id>', methods=['DELETE'])
def delete_recipe(id):
    try:
        recipe = Recipe.query.get(id)
        if recipe is None:
            return jsonify({'error': 'Recipe not found'})
        data = request.get_json()
        if recipe.user == data['user']:
            db.session.delete(recipe)
            db.session.commit()
            return jsonify({'message': 'Recipe deleted'})
        else:
            return jsonify({'error': 'You are not the owner of this recipe'})
    except Exception as e:
        return(str(e))
