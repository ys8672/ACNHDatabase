import json
from models import app, db, Villagers

def load_json(filename):
    with open(filename) as file:
        jsn = json.load(file)
        file.close()
    return jsn

def create_villagers():
    db.session.query(Villagers).delete()
    villagers = load_json('villagers.json')
    for (k, villager) in villagers.items():
        name = villager['name']['name-USen']
        personality = villager['personality']
        birthday = villager['birthday-string']
        species = villager['species']
        gender = villager['gender']
        catchPhrase = villager['catch-phrase']
        image = villager['image_uri']
        id = villager['id']
        new_villager = Villagers(name = name, personality = personality, birthday = birthday,
            species = species, gender = gender, catchPhrase = catchPhrase, image = image, id = id)
        db.session.add(new_villager)
        db.session.commit()

create_villagers()
