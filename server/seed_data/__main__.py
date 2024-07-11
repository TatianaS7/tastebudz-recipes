# Seed Data Functions

from models import Group, Recipe
import json
from connection import db

def seed_groups():
    db.session.query(Group).delete()

    with open('seed_data/seedGroups.json') as f:
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



def seedData():
    seed_groups()
    print('Seeded Data')