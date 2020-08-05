import json
from models import app, db, Villagers, Songs, Sea, Fossils, Fishes, Bugs, Arts

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
        birthday = villager['birthday']
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
        
def create_sea():
    db.session.query(Sea).delete()
    seas = load_json('sea.json')
    for (k, sea) in seas.items():
        name = sea['name']['name-USen']
        monthNorth = sea['availability']['month-northern']
        monthSouth = sea['availability']['month-southern']
        time = sea['availability']['time']
        speed = sea['speed']
        shadow = sea['shadow']
        price = sea['price']
        catchPhrase = sea['catch-phrase']
        museumPhrase = sea['museum-phrase']
        image = sea['image_uri']
        icon = sea['icon_uri']
        id = sea['id']
        new_sea = Sea(name = name, monthNorth = monthNorth, monthSouth = monthSouth, time = time,
            speed = speed, shadow = shadow, price = price, catchPhrase = catchPhrase, 
            museumPhrase = museumPhrase, image = image, icon = icon, id = id)
        db.session.add(new_sea)
        db.session.commit()
    
def create_fossils():
    db.session.query(Fossils).delete()
    fossils = load_json('fossils.json')
    index = 0
    for (k, fossil) in fossils.items():
        name = fossil['name']['name-USen']
        price = fossil['price']
        museumPhrase = fossil['museum-phrase']
        image = fossil['image_uri']
        id = index
        new_fossil = Fossils(name = name, price = price, museumPhrase = museumPhrase,
            image = image, id = id)
        db.session.add(new_fossil)
        db.session.commit()
        index += 1
        
def create_fishes():
    db.session.query(Fishes).delete()
    fishes = load_json('fish.json')
    for (k, fish) in fishes.items():
        name = fish['name']['name-USen']
        monthNorth = fish['availability']['month-northern']
        monthSouth = fish['availability']['month-southern']
        time = fish['availability']['time']
        location = fish['availability']['location']
        rarity = fish['availability']['rarity']
        shadow = fish['shadow']
        price = fish['price']
        catchPhrase = fish['catch-phrase']
        museumPhrase = fish['museum-phrase']
        image = fish['image_uri']
        icon = fish['icon_uri']
        id = fish['id']
        new_fish = Fishes(name = name, monthNorth = monthNorth, monthSouth = monthSouth, time = time,
            location = location, rarity = rarity, shadow = shadow, price = price, catchPhrase = catchPhrase, 
            museumPhrase = museumPhrase, image = image, icon = icon, id = id)
        db.session.add(new_fish)
        db.session.commit()

def create_bugs():
    db.session.query(Bugs).delete()
    bugs = load_json('bugs.json')
    for (k, bug) in bugs.items():
        name = bug['name']['name-USen']
        monthNorth = bug['availability']['month-northern']
        monthSouth = bug['availability']['month-southern']
        time = bug['availability']['time']
        location = bug['availability']['location']
        rarity = bug['availability']['rarity']
        price = bug['price']
        catchPhrase = bug['catch-phrase']
        museumPhrase = bug['museum-phrase']
        image = bug['image_uri']
        icon = bug['icon_uri']
        id = bug['id']
        new_bug = Bugs(name = name, monthNorth = monthNorth, monthSouth = monthSouth, time = time,
            location = location, rarity = rarity, price = price, catchPhrase = catchPhrase, 
            museumPhrase = museumPhrase, image = image, icon = icon, id = id)
        db.session.add(new_bug)
        db.session.commit()
        
def create_arts():
    db.session.query(Arts).delete()
    arts =load_json('art.json')
    for (k, art) in arts.items():
        name = art['name']['name-USen']
        hasFake = art['hasFake']
        buyPrice = art['buy-price']
        sellPrice = art['sell-price']
        image = art['image_uri']
        museum = art['museum-desc']
        id = art['id']
        new_art = Arts(name = name, hasFake = hasFake, buyPrice = buyPrice, sellPrice = sellPrice,
            image = image, museum = museum, id = id)
        db.session.add(new_art)
        db.session.commit()
    
#Create all databases
def create_database():
    create_villagers()
    create_songs()
    create_sea()
    create_fossils()
    create_fishes()
    create_bugs()
    create_arts()

create_database()