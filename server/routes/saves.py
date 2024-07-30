from flask import Blueprint, request, jsonify
from connection import db
from models import Saves, Recipe, Group

saves = Blueprint('saves', __name__)

# Add a New Save
@saves.route('/add', methods=['POST'])
def add_save():
    try:
        data = request.get_json()

        if not data['recipe_id'] or not data['saved_by']:
            return jsonify({'message': 'Please provide all required fields'}), 400

        # Get Recipe
        recipe = Recipe.query.filter_by(id=data['recipe_id']).first()
        if not recipe:
            return jsonify({'message': 'Recipe not found'}), 400

        # Check if recipe is public, and if not, check if user is a member of the group
        if not recipe.is_public:
            group = Group.query.filter_by(id=recipe.group_id).first()
            if not any(user['email'] == data['saved_by'] for user in group.members):
                return jsonify({'message': 'User is not a member of the group that owns this recipe'}), 400

        # Check if save already exists
        existing_save = Saves.query.filter_by(recipe_id=data['recipe_id'], saved_by=data['saved_by']).first()
        if existing_save:
            return jsonify({'message': 'Save already exists'}), 400
        
        save = Saves(
            creator=recipe.user,
            recipe_id=data['recipe_id'],
            saved_by=data['saved_by'],
        )

        db.session.add(save)
        db.session.commit()
    
        return jsonify({'message': 'Save added successfully!'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400
    

# Get All Saves (by User)
@saves.route('/all', methods=['GET'])
def get_all_saves():
    try:
        data = request.get_json()
        if not data['saved_by']:
            return jsonify({'message': 'Please provide a user'}), 400
        
        saves = Saves.query.filter_by(saved_by=data['saved_by']).all()
        if not saves:
            return jsonify({'message': 'No saves found'}), 400
        
        # Return saves with recipe details
        recipes = []
        for save in saves:
            recipe = Recipe.query.filter_by(id=save.recipe_id).first()
            recipe_data = recipe.serialize()
            recipe_data['save_id'] = save.id
            recipes.append(recipe_data)

        saves_data = {
            'saved_by': data['saved_by'],
            'saves': recipes
        }

        return jsonify(saves_data), 200        
    except Exception as e:
        return jsonify({'message': str(e)}), 400
    

# Search for a Save (by User and Recipe)
@saves.route('/search', methods=['GET'])
def search_saves():
    try:
        query = request.args.get('query')
        if not query:
            return jsonify({'message': 'Please provide a query'}), 400
        
        data = request.get_json()
        if not data['saved_by']:
            return jsonify({'message': 'Please provide a user'}), 400
        
        saves_data = []

        # Search by Recipe Name
        saves_by_name = db.session.query(Saves, Recipe).join(Recipe, Saves.recipe_id == Recipe.id).filter(
            Saves.saved_by == data['saved_by'],
            Recipe.name.ilike(f'%{query}%')
        ).all()

        for save, recipe in saves_by_name:
            save_data = save.serialize()
            save_data['recipe'] = recipe.serialize()
            saves_data.append(save_data)

        # Search by Recipe Ingredients
        all_saves = Saves.query.filter_by(saved_by=data['saved_by']).all()
    
        for save in all_saves:
            recipe = Recipe.query.filter_by(id=save.recipe_id).first()
            if any(query.lower() in ingredient['ingredient'].lower() for ingredient in recipe.ingredients):
                save_data = save.serialize()
                save_data['recipe'] = recipe.serialize()
                saves_data.append(save_data)

        # Search by Recipe Tags
        saves_by_tag = db.session.query(Saves, Recipe).join(Recipe, Saves.recipe_id == Recipe.id).filter(
            Saves.saved_by == data['saved_by'],
            Recipe.tags.like(f'%"{query}"%')
        ).all()

        for save, recipe in saves_by_tag:
            save_data = save.serialize()
            save_data['recipe'] = recipe.serialize()
            saves_data.append(save_data)

        if not saves_data:
            return jsonify({'message': 'No saves found'}), 400
        
        # Make sure there are no duplicates
        saves_data = list({save['id']: save for save in saves_data}.values())

        return jsonify(saves_data), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400
