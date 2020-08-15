from flask import Flask, render_template, url_for, request, Response, json, redirect
from flask_cors import CORS
import io
import contextlib
from create_db import db, Villagers, Songs, Sea, Items, Fossils, Fishes, Bugs, Arts, \
    Construction, Recipes
from sqlalchemy.orm.exc import NoResultFound
import requests

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
@app.route('/villagers/')
@app.route('/songs/')
@app.route('/sea/')
@app.route('/recipes/')
@app.route('/items/')
@app.route('/fossils/')
@app.route('/fish/')
@app.route('/construction/')
@app.route('/bugs/')
@app.route('/art/')
@app.route('/about/')
@app.route('/search/')
def index():
    return app.send_static_file('index.html')
    
@app.route('/villagers/<int:user_id>')
@app.route('/songs/<int:user_id>')
@app.route('/sea/<int:user_id>')
@app.route('/recipes/<int:user_id>')
@app.route('/items/<int:user_id>')
def data_detail(user_id):
    return app.send_static_file('index.html')
    
#villagers
def get_villager_dict(villager):
    return {"name": villager.name, "personality": villager.personality, "birthday": villager.birthday,
        "birthdayString": villager.birthdayString, "species": villager.species, "gender": villager.gender, 
        "catchPhrase": villager.catchPhrase, "image": villager.image, "icon": villager.icon, "id": villager.id}
    
@app.route('/api/villagers/')
def villager_data():
    response = []
    villagers_list = db.session.query(Villagers).all()
    for villager in villagers_list:
        new_one = get_villager_dict(villager)
        response.append(new_one)
    new_list = {'villagers': response}
    return new_list
    
@app.route('/api/villagers/<int:villager_id>/')
def villager_by_ID(villager_id):
    if villager_id <= 0 or villager_id > db.session.query(Villagers).count():
        dict = {'code': 404, 'message': 'Villager not found'}
    else:
        villager = db.session.query(Villagers).filter_by(id=villager_id).one()
        dict = get_villager_dict(villager)
    return dict

#songs
def get_song_dict(song):
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
    
@app.route('/api/songs/<int:song_id>/')
def song_by_ID(song_id):
    if song_id <= 0 or song_id > db.session.query(Songs).count():
        dict = {'code': 404, 'message': 'Song not found'}
    else:
        song = db.session.query(Songs).filter_by(id=song_id).one()
        dict = get_song_dict(song)
    return dict

#sea
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
    
@app.route('/api/sea/<int:sea_id>/')
def sea_by_ID(sea_id):
    if sea_id <= 0 or sea_id > db.session.query(Sea).count():
        dict = {'code': 404, 'message': 'Sea creature not found'}
    else:
        sea = db.session.query(Sea).filter_by(id=sea_id).one()
        dict = get_sea_dict(sea)
    return dict
    
#recipes
def get_recipe_dict(recipe):
    return {'name': recipe.name, 'buyPrice': recipe.buyPrice, 'sellPrice': recipe.sellPrice, "source": recipe.source,
        "recipesToUnlock": recipe.recipesToUnlock, 'category': recipe.category, 'cardColor': recipe.cardColor,
        'materials': recipe.materials, 'sourceNotes': recipe.sourceNotes, 'id': recipe.id}

@app.route('/api/recipes/')
def recipe_data():
    response = []
    recipe_list = db.session.query(Recipes).all()
    for recipe in recipe_list:
        new_one = get_recipe_dict(recipe)
        response.append(new_one)
    new_list = {'recipes': response}
    return new_list
    
@app.route('/api/recipes/<int:recipe_id>/')
def recipe_by_ID(recipe_id):
    if recipe_id <= 0 or recipe_id > db.session.query(Recipes).count():
        new_dict = {'code': 404, 'message': 'Recipe not found'}
    else:
        recipe = db.session.query(Recipes).filter_by(id=recipe_id).one()
        new_dict = get_recipe_dict(recipe)
    return new_dict
    
#items
def get_item_dict(item):
    return {'name': item.name, 'canCustomize': item.canCustomize, 'kitCost': item.kitCost, 'size': item.size, 'source': item.source,
        'isInteractive': item.isInteractive, 'buyPrice': item.buyPrice, 'sellPrice': item.sellPrice, 'image': item.image, 
        'category': item.category, 'variant': item.variant, 'id': item.id}
        
@app.route('/api/items/')
def item_data():
    response = []
    item_list = db.session.query(Items).all()
    for item in item_list:
        new_one = get_item_dict(item)
        response.append(new_one)
    new_list = {'items': response}
    return new_list

@app.route('/api/items/<int:item_id>/')
def item_by_ID(item_id):
    if item_id <= 0 or item_id > db.session.query(Items).count():
        new_dict = {'code': 404, 'message': 'Item not found'}
    else:
        recipe = db.session.query(Items).filter_by(id=item_id).one()
        new_dict = get_item_dict(recipe)
    return new_dict

    
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
    
def get_construction_dict(cons):  
    return {'name': cons.name, 'image': cons.image, 'buyPrice': cons.buyPrice, 'source': cons.source,
        'category': cons.category, 'id': cons.id}
    
@app.route('/api/construction/')
def construction_data():
    response = []
    cons_list = db.session.query(Construction).all()
    for cons in cons_list:
        new_one = get_construction_dict(cons)
        response.append(new_one)
    new_list = {'construction': response}
    return new_list
    
if __name__ == '__main__':
    app.run()
