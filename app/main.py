from flask import Flask, render_template, url_for, request, Response, json, redirect
from flask_cors import CORS
import io
import contextlib
from create_db import db, Villagers, Songs, Sea, Fossils, Fishes, Bugs, Arts
from sqlalchemy.orm.exc import NoResultFound
import requests

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
@app.route('/villagers/')
@app.route('/songs/')
@app.route('/sea/')
@app.route('/details/')
@app.route('/fossils/')
@app.route('/fish/')
@app.route('/bugs/')
@app.route('/art/')
def index():
    return app.send_static_file('index.html')

def get_villager_dict(villager):
    return {"name": villager.name, "personality": villager.personality, "birthday": villager.birthday, "species": villager.species,
            "gender": villager.gender, "catchPhrase": villager.catchPhrase, "image": villager.image, "icon": villager.icon, "id": villager.id}
    
@app.route('/api/villagers/')
def villager_data():
    response = []
    villagers_list = db.session.query(Villagers).all()
    for villager in villagers_list:
        new_one = get_villager_dict(villager)
        response.append(new_one)
    new_list = {'villagers': response}
    return new_list

def get_song_dict(song):
    if song.buyPrice == None:
        return {"name": song.name, "buyPrice": -1, "sellPrice": song.sellPrice, "isOrderable": song.isOrderable,
            "image": song.image, "music": song.music, "id": song.id}
    return {"name": song.name, "buyPrice": song.buyPrice, "sellPrice": song.sellPrice, "isOrderable": song.isOrderable,
            "image": song.image, "music": song.music, "id": song.id}
   
@app.route('/api/songs/')
def song_data():
    response = []
    songs_list = db.session.query(Songs).all()
    for song in songs_list:
        new_one = get_song_dict(song)
        response.append(new_one)
    new_list = {'songs': response}
    return new_list
    
def get_sea_dict(sea):
    return {"name": sea.name, "monthNorth": sea.monthNorth, "monthSouth": sea.monthSouth, "time": sea.time, "speed": sea.speed,
        "shadow": sea.shadow, "price": sea.price, "catchPhrase": sea.catchPhrase, "museumPhrase": sea.museumPhrase,
        "image": sea.image, "icon": sea.icon, "id": sea.id}

@app.route('/api/sea/')
def sea_data():
    response = []
    sea_list = db.session.query(Sea).all()
    for sea in sea_list:
        new_one = get_sea_dict(sea)
        response.append(new_one)
    new_list = {'sea': response}
    return new_list
    
def get_fossil_dict(fossil):
    return {"name": fossil.name, "price": fossil.price, "museumPhrase": fossil.museumPhrase,
        "image": fossil.image, "id": fossil.id}
    
@app.route('/api/fossils/')
def fossil_data():
    response = []
    fossils_list = db.session.query(Fossils).all()
    for fossil in fossils_list:
        new_one = get_fossil_dict(fossil)
        response.append(new_one)
    new_list = {'fossils': response}
    return new_list

def get_fish_dict(fish):
    return {"name": fish.name, "monthNorth": fish.monthNorth, "monthSouth": fish.monthSouth, "time": fish.time, "location": fish.location,
        "rarity": fish.rarity, "shadow": fish.shadow, "price": fish.price, "catchPhrase": fish.catchPhrase, "museumPhrase": fish.museumPhrase,
        "image": fish.image, "icon": fish.icon, "id": fish.id}

@app.route('/api/fish/')
def fish_data():
    response = []
    fish_list = db.session.query(Fishes).all()
    for fish in fish_list:
        new_one = get_fish_dict(fish)
        response.append(new_one)
    new_list = {'fish': response}
    return new_list
    
def get_bug_dict(bug):
    return {"name": bug.name, "monthNorth": bug.monthNorth, "monthSouth": bug.monthSouth, "time": bug.time, "location": bug.location,
        "rarity": bug.rarity, "price": bug.price, "catchPhrase": bug.catchPhrase, "museumPhrase": bug.museumPhrase,
        "image": bug.image, "icon": bug.icon, "id": bug.id}

@app.route('/api/bugs/')
def bug_data():
    response = []
    bug_list = db.session.query(Bugs).all()
    for bug in bug_list:
        new_one = get_bug_dict(bug)
        response.append(new_one)
    new_list = {'bugs': response}
    return new_list
    
def get_art_dict(art):
    return {'name': art.name, 'hasFake': art.hasFake, 'buyPrice': art.buyPrice, 'sellPrice': art.sellPrice, 'image': art.image,
        'museum': art.museum, 'id': art.id}
        
@app.route('/api/art/')
def art_data():
    response = []
    art_list = db.session.query(Arts).all()
    for art in art_list:
        new_one = get_art_dict(art)
        response.append(new_one)
    new_list = {'arts': response}
    return new_list

if __name__ == '__main__':
    app.run()
