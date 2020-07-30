from flask import Flask, render_template, url_for, request, Response, json, redirect
from flask_cors import CORS
import io
import contextlib
from create_db import db, Villagers, Songs, Sea
from sqlalchemy.orm.exc import NoResultFound
import requests


app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
@app.route('/villagers/')
@app.route('/songs/')
@app.route('/sea/')
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

if __name__ == '__main__':
    app.run()
