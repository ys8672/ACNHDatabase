import json
from models import app, db, Villagers, Songs

#Loads JSON file 
def load_json(filename):
    with open(filename) as file:
        jsn = json.load(file)
        file.close()
    return jsn

#Create database of villagres
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
        icon = villager['icon_uri']
        id = villager['id']
        new_villager = Villagers(name = name, personality = personality, birthday = birthday,
            species = species, gender = gender, catchPhrase = catchPhrase, image = image, icon = icon, id = id)
        db.session.add(new_villager)
        db.session.commit()

#Create database of songs       
def create_songs():
    db.session.query(Songs).delete()
    songs = load_json('songs.json')
    for (k, song) in songs.items():
        name = song['name']['name-USen']
        buyPrice = song['buy-price']
        sellPrice = song['sell-price']
        isOrderable = song['isOrderable']
        image = song['image_uri']
        music = song['music_uri']
        id = song['id']
        new_song = Songs(name = name, buyPrice = buyPrice, sellPrice = sellPrice,
            isOrderable = isOrderable, image = image, music = music, id = id)
        db.session.add(new_song)
        db.session.commit()

#Create all databases
def create_database():
    create_villagers()
    create_songs()

create_database()