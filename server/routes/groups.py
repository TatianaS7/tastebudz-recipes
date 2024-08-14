from flask import Blueprint, request, jsonify
from sqlalchemy.orm.attributes import flag_modified
from connection import db
import random

from models import Group, Recipe

groups = Blueprint('groups', __name__)

acceptable_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

# GROUP ROUTES
# Create a Group (admin)
@groups.route('/', methods=['POST'])
def create_group():
    try:
        data = request.get_json()
        
        if 'name' not in data or 'admin_email' not in data:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if the group name is unique
        existing_group = Group.query.filter_by(name=data['name']).first()
        if existing_group:                
            return jsonify({'error': 'Group name already exists; Try a different name'})
            
        # Check if group is private
        is_private = data.get('is_private', False)
        if is_private:
            # Generate a random join code
            join_code = ''.join(random.choice(acceptable_chars) for i in range(7))
        else:
            join_code = None

        new_group = Group(
                name=data['name'],
                members=data.get('members', None),
                recipes=data.get('recipes', None),
                admin_email=data['admin_email'],
                join_code=join_code,
                is_private=is_private
        )

        db.session.add(new_group)
        db.session.commit()

        return jsonify(new_group.serialize())
    except Exception as e:
        return(str(e))

# Get a Group (any member)
@groups.route('/<group_id>', methods=['GET'])
def get_group(group_id):
    try:
        group = Group.query.get(group_id)
        if not group:
            return jsonify({'error': 'Group not found'})
        
        # Serialize Recipes to avoid type errors
        recipes_data = [recipe.to_dict() for recipe in group.recipes]

        # Create a dictionary to return the group data
        group_data = {
            'id': group.id,
            'name': group.name,
            'members': group.members,
            'recipes': recipes_data,
            'admin_email': group.admin_email,
            'join_code': group.join_code,
            'is_private': group.is_private
        }

        return jsonify(group_data)
    except Exception as e:
        return(str(e))

# Get all Groups (any member)
@groups.route('/all', methods=['GET'])
def get_all_groups():
    try:
        groups = Group.query.all()
        if not groups:
            return jsonify({'error': 'No groups found'})
        
        groups_data = []
        for group in groups:
            # Serialize Recipes to avoid type errors
            recipes_data = [recipe.to_dict() for recipe in group.recipes]

            # Create a dictionary to return the group data
            group_data = {
                'id': group.id,
                'name': group.name,
                'members': group.members,
                'recipes': recipes_data,
                'admin_email': group.admin_email,
                'join_code': group.join_code,
                'is_private': group.is_private
            }
            groups_data.append(group_data)

        return jsonify(groups_data)
    except Exception as e:
        return(str(e))

# Join a Group (member)
@groups.route('/join/<group_id>', methods=['PUT'])
def join_group(group_id):
    try:
        group = Group.query.get(group_id)
        if not group:
            return jsonify({'error': 'Group not found'})
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({'error': 'Email is required'})
        
        if group.is_private:
            if 'join_code' not in data:
                return jsonify({'error': 'Join code is required'})
            if data['join_code'] != group.join_code:
                return jsonify({'error': 'Invalid join code'}), 400
        
        for member in group.members:
            if member['email'] == data['email']:
                return jsonify({'error': 'User already in group'})
        
        new_member = { "email": data['email'], "role": "member" }
        group.members.append(new_member)
        flag_modified(group, 'members')
        db.session.commit()

        # Serialize Recipes to avoid type errors
        recipes_data = [recipe.to_dict() for recipe in group.recipes]

        # Create a dictionary to return the group data
        group_data = {
            'id': group.id,
            'name': group.name,
            'members': group.members,
            'recipes': recipes_data,
            'admin_email': group.admin_email,
            'join_code': group.join_code,
            'is_private': group.is_private
        }


        return jsonify(group_data), 200
    except Exception as e:
        return(str(e))

# Leave a Group (member)
@groups.route('/leave/<group_id>', methods=['PUT'])
def leave_group(group_id):
    try:
        group = Group.query.get(group_id)
        if not group:
            return jsonify({'error': 'Group not found'}), 404
        
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({'error': 'Email is required'}), 400
        
        # Loop through the group's members to find the user
        for member in group.members:
            # If the user is present, and a member, remove them from the group
            if member['email'] == data['email'] and member['role'] == 'member':
                group.members.remove(member)
                # Flag the group's members list as modified to recognize the change
                flag_modified(group, 'members')
                db.session.commit()

                # Serialize Recipes to avoid type errors
                recipes_data = [recipe.to_dict() for recipe in group.recipes]

                # Create a dictionary to return the group data
                group_data = {
                    'id': group.id,
                    'name': group.name,
                    'members': group.members,
                    'recipes': recipes_data,
                    'admin_email': group.admin_email,
                    'join_code': group.join_code,
                    'is_private': group.is_private
                }

                return jsonify(group_data), 200
            
            # If the user is an admin, they cannot leave the group
            elif member['email'] == data['email'] and member['role'] == 'admin':
                return jsonify({'error': 'Admin cannot leave group'}), 400
        
        return jsonify({'error': 'User not in group'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Delete a Group (admin)
@groups.route('/<group_id>', methods=['DELETE'])
def delete_group(group_id):
    try:
        group = Group.query.get(group_id)
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({'error': 'Email is required'})
        if group.admin_email == data['email']:
            db.session.delete(group)
            db.session.commit()
            return jsonify({'message': 'Group deleted'})
        else:
            return jsonify({'error': 'Only the admin can delete this group'})
    except Exception as e:
        return(str(e))


# RECIPES ROUTES
# Add a Recipe to a Group (any member)
@groups.route('/<group_id>/recipe', methods=['PUT'])
def add_group_recipe(group_id):
    try:
        # Get the group
        group = Group.query.get(group_id)
        if not group:
            return jsonify({'error': 'Group not found'})
        # Get the recipe data from the request
        data = request.get_json()
        
        # Check if required fields are present
        for field in data:
            if field not in ['name', 'ingredients', 'instructions', 'tags', 'user']:
                return jsonify({'error': 'Missing required fields'})
        
        # Check if user is a member of the group
        for member in group.members:
            if member['email'] == data['user']:
                break
        else:
            return jsonify({'error': 'Unauthorized user'})
        
        # Check if recipe name is unique
        for recipe in group.recipes:
            if recipe['name'] == data['name']:
                return jsonify({'error': 'Recipe already exists; Try a different name'})
            
        # Create a new Recipe object
        new_recipe = Recipe(
            name=data['name'],
            ingredients=data['ingredients'],
            instructions=data['instructions'],
            servings=data.get('servings', None),
            time=data.get('time', None),
            image=data.get('image', None),
            tags=data['tags'],
            user=data['user'],
            group_id=group_id,
            is_public=data.get('is_public', False)
        )
                
        db.session.add(new_recipe)
        db.session.commit()

        recipes_data = [recipe.to_dict() for recipe in group.recipes]

        return jsonify(recipes_data), 200
    except Exception as e:
        return(str(e))
    
# Get all Recipes in a Group (any member)
@groups.route('/<group_id>/recipes/all', methods=['GET'])
def get_group_recipes(group_id):
    try:
        group = Group.query.get(group_id)
        if not group:
            return jsonify({'error': 'Group not found'})
        
        recipes = Recipe.query.filter_by(group_id=group_id).all()
        recipes_data = [recipe.to_dict() for recipe in recipes]

        if not recipes_data:
            return jsonify({'error': 'No recipes found'})

        return jsonify(recipes_data)
    except Exception as e:
        return(str(e))

# Update a Recipe in a Group (if created by the user or admin)
@groups.route('/<group_id>/recipe/<recipe_id>', methods=['PUT'])
def update_group_recipe(group_id, recipe_id):
    try:
            group = Group.query.get(group_id)
            if not group:
                return jsonify({'error': 'Group not found'})
            
            group_recipe = Recipe.query.get(recipe_id)
            
            if not group_recipe:
                return jsonify({'error': 'Recipe not found'})
            data = request.get_json()
            if not data:
                return jsonify({'error': 'Missing required fields'})
            if group_recipe.user == data['email'] or data['email'] == Group.query.get(group_id).admin_email:
                if 'name' in data:
                    group_recipe.name = data['name']
                if 'ingredients' in data:
                    group_recipe.ingredients = data['ingredients']
                if 'instructions' in data:
                    group_recipe.instructions = data['instructions']
                if 'servings' in data:
                    group_recipe.servings = data['servings']
                if 'time' in data:
                    group_recipe.time = data['time']
                db.session.commit()
                return jsonify(group_recipe.serialize())
            else:
                return jsonify({'error': 'You are not the owner of this recipe'})
    except Exception as e:
        return(str(e))
    
# Delete a Recipe from a Group (if created by the user or admin)
@groups.route('/<group_id>/recipe/<recipe_id>', methods=['DELETE'])
def delete_group_recipe(group_id, recipe_id):
    try:
        group = Group.query.get(group_id)
        if not group:
            return jsonify({'error': 'Group not found'})
        
        group_recipe = next((recipe for recipe in group.recipes if str(recipe.id) == recipe_id), None)
        
        if not group_recipe:
            return jsonify({'error': 'Recipe not found'})
        
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({'error': 'Missing required fields'})
        
        if group_recipe.user == data['email'] or data['email'] == group.admin_email:
            db.session.delete(group_recipe)
            db.session.commit()
            return jsonify({'message': 'Recipe deleted'})
        else:
            return jsonify({'error': 'You are not the owner of this recipe'})
    except Exception as e:
        return(str(e))
    

# Search Recipes in a Group (any member)
@groups.route('/<groupID>/recipes', methods=['GET'])
def search_group_recipes(groupID):
    try:
        query = request.args.get('query')
        if not query:
            return jsonify({'error': 'No query provided'})
        
        data = request.get_json()
        if not data or 'email' not in data:
            return jsonify({'error': 'Email is required'})
        
        recipe_data = []

        # Check if the group exists
        group = Group.query.get(groupID)
        if not group:
            return jsonify({'error': 'Group not found'})
        
        # Check if user is a member of the group
        for member in group.members:
            if member['email'] == data['email']:
                break
        else:
            return jsonify({'error': 'Unauthorized user'})

        # Search for public recipes by name
        recipes_by_name = Recipe.query.filter(
            (Recipe.name.ilike(f'%{query}%'))
        ).filter_by(group_id=groupID).all()

        # Add the recipes to the recipe_data list
        recipe_data.extend([recipe.serialize() for recipe in recipes_by_name])

        # Search for public recipes by ingredient
        all_recipes = Recipe.query.filter_by(group_id=groupID).all()
        for recipe in all_recipes:
            ingredients = recipe.ingredients
            if any(query.lower() in ingredient['ingredient'].lower() for ingredient in ingredients):
                recipe_data.append(recipe.serialize())

        # Search for public recipes by tag
        recipes_by_tag = Recipe.query.filter(
            Recipe.tags.like(f'%"{query}"%')
        ).filter_by(group_id=groupID).all()
                
        # Add the recipes with the tag to the recipe_data list
        recipe_data.extend([recipe.serialize() for recipe in recipes_by_tag])

        if not recipe_data:
            return jsonify({'error': 'No recipes found'})

        # Make sure there are no duplicate recipes
        recipe_data = list({recipe['id']: recipe for recipe in recipe_data}.values())

        return jsonify(recipe_data)
    except Exception as e:
        return(str(e))

