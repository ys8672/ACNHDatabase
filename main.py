from flask import Flask, render_template, url_for, request, Response, json, redirect
from flask_cors import CORS
import io
import contextlib
from create_db import db, Villagers, Songs, Sea, Items, Fossils, Fishes, Bugs, Arts, \
    Construction, Recipes, Search, Reactions, Clothes
from sqlalchemy.orm.exc import NoResultFound
import requests

app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
@app.route('/villagers/')
@app.route('/songs/')
@app.route('/sea/')
@app.route('/recipes/')
@app.route('/reactions/')
@app.route('/items/')
@app.route('/fossils/')
@app.route('/fish/')
@app.route('/construction/')
@app.route('/clothes/')
@app.route('/bugs/')
@app.route('/art/')
@app.route('/about/')
@app.route('/search/')
def index():
    return app.send_static_file('index.html')
    
@app.route('/villagers/<int:user_id>/')
@app.route('/songs/<int:user_id>/')
@app.route('/sea/<int:user_id>/')
@app.route('/recipes/<int:user_id>/')
@app.route('/reactions/<int:user_id>/')
@app.route('/items/<int:user_id>/')
@app.route('/fossils/<int:user_id>/')
@app.route('/fish/<int:user_id>/')
@app.route('/construction/<int:user_id>/')
@app.route('/clothes/<int:user_id>/')
@app.route('/bugs/<int:user_id>/')
@app.route('/art/<int:user_id>/')
def data_detail(user_id):
    return app.send_static_file('index.html')
    
#search
@app.route('/api/search/')
def search_data():
    response = []
    search_list = db.session.query(Search).all()
    for search in search_list:
        new_one = {"name": search.name, "category": search.category, "id": search.id, "searchID": search.searchID}
        response.append(new_one)
    new_list = {'search': response}
    return new_list
    
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
    
#reactions
def get_reaction_dict(reaction):
    return {'name': reaction.name, 'image': reaction.image, 'source': reaction.source, 'sourceNotes': reaction.sourceNotes,
        'id': reaction.id}

@app.route('/api/reactions/')
def reaction_data():
    response = []
    reaction_list = db.session.query(Reactions).all()
    for reaction in reaction_list:
        new_one = get_reaction_dict(reaction)
        response.append(new_one)
    new_list = {'reactions': response}
    return new_list

@app.route('/api/reactions/<int:reaction_id>/')
def reaction_by_ID(reaction_id):
    if reaction_id <= 0 or reaction_id > db.session.query(Reactions).count():
        new_dict = {'code': 404, 'message': 'Reaction not found'}
    else:
        reaction = db.session.query(Reactions).filter_by(id = reaction_id).one()
        new_dict = get_reaction_dict(reaction)
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

#fossils
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

@app.route('/api/fossils/<int:fossil_id>/')
def fossil_by_ID(fossil_id):
    if fossil_id <= 0 or fossil_id > db.session.query(Fossils).count():
        new_dict = {'code': 404, 'message': 'Fossil not found'}
    else:
        fossil = db.session.query(Fossils).filter_by(id=fossil_id).one()
        new_dict = get_fossil_dict(fossil)
    return new_dict

#fish
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

@app.route('/api/fish/<int:fish_id>/')
def fish_by_ID(fish_id):
    if fish_id <= 0 or fish_id > db.session.query(Fishes).count():
        new_dict = {'code': 404, 'message': 'Fish not found'}
    else:
        fish = db.session.query(Fishes).filter_by(id=fish_id).one()
        new_dict = get_fish_dict(fish)
    return new_dict

#construction
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
    
@app.route('/api/construction/<int:cons_id>/')
def construction_by_ID(cons_id):
    if cons_id <= 0 or cons_id > db.session.query(Construction).count():
        new_dict = {'code':404, 'message': 'Construction not found'}
    else:
        cons = db.session.query(Construction).filter_by(id=cons_id).one()
        new_dict = get_construction_dict(cons)
    return new_dict

#clothes
def get_cloth_dict(cloth):
    return {'name': cloth.name, 'image': cloth.image, 'sourceSheet': cloth.sourceSheet, 'buy': cloth.buy, 'sell': cloth.sell,
        'source': cloth.source, 'seasonal': cloth.seasonal, 'villager': cloth.villager, 'themes': cloth.themes,
        'variations': cloth.variations, 'id': cloth.id}
        
@app.route('/api/clothes/')
def clothes_data():
    response = []
    clothes_list = db.session.query(Clothes).all()
    for cloth in clothes_list:
        new_one = get_cloth_dict(cloth)
        response.append(new_one)
    new_list = {'clothes': response}
    return new_list
    
@app.route('/api/clothes/<int:cloth_id>/')
def cloth_by_ID(cloth_id):
    if cloth_id <= 0 or cloth_id > db.session.query(Clothes).count():
        new_dict = {'code':404, 'message': 'Clothe not found'}
    else:
        cloth = db.session.query(Clothes).filter_by(id=cloth_id).one()
        new_dict = get_cloth_dict(cloth)
    return new_dict

#bugs
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
    
@app.route('/api/bugs/<int:bug_id>/')
def bug_by_ID(bug_id):
    if bug_id <= 0 or bug_id > db.session.query(Bugs).count():
        new_dict = {'code': 404, 'message': 'Bug not found'}
    else:
        bugs = db.session.query(Bugs).filter_by(id=bug_id).one()
        new_dict = get_bug_dict(bugs)
    return new_dict
    
#art
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
    
@app.route('/api/art/<int:art_id>/')
def art_by_ID(art_id):
    if art_id <= 0 or art_id > db.session.query(Arts).count():
        new_dict = {'code': 404, 'message': 'Art not found'}
    else:
        art = db.session.query(Arts).filter_by(id=art_id).one()
        new_dict = get_art_dict(art)
    return new_dict

if __name__ == '__main__':
    app.run()
