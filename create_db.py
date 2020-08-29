import json
from models import app, db, Villagers, Songs, Sea,      \
    Items, Fossils, Fishes, Bugs, Arts, Construction,   \
    Recipes, Search, Reactions, Clothes
    
#Run this file with 'python create_db.py' to create the database.

#Loads JSON file 
def load_json(filename):
    realfilename = str('json/') + filename
    with open(realfilename, encoding='utf-8') as file:
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
        birthdayString = villager['birthday-string']
        species = villager['species']
        gender = villager['gender']
        catchPhrase = villager['catch-phrase']
        image = villager['image_uri']
        icon = villager['icon_uri']
        id = villager['id']
        new_villager = Villagers(name = name, personality = personality, birthday = birthday,
            birthdayString = birthdayString, species = species, gender = gender, catchPhrase = catchPhrase, 
            image = image, icon = icon, id = id)
        db.session.add(new_villager)
        db.session.commit()

#Create database of songs       
def create_songs():
    db.session.query(Songs).delete()
    songs = load_json('songs.json')
    for (k, song) in songs.items():
        name = song['name']['name-USen']
        buyPrice = song['buy-price']
        if buyPrice == None:
            buyPrice = -1
        sellPrice = song['sell-price']
        isOrderable = "Yes"
        if song['isOrderable'] == False:
            isOrderable = "No"
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
        if monthNorth == "":
            monthNorth = "All Year"
        monthSouth = sea['availability']['month-southern']
        if monthSouth == "":
            monthSouth = "All Year"
        time = sea['availability']['time']
        if time == "":
            time = "All Day"
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
    index = 1
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
        if monthNorth == "":
            monthNorth = "All Year"
        monthSouth = fish['availability']['month-southern']
        if monthSouth == "":
            monthSouth = "All Year"
        time = fish['availability']['time']
        if time == "":
            time = "All Day"
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
            location = location, rarity = rarity, shadow = shadow, price = price, 
            catchPhrase = catchPhrase, museumPhrase = museumPhrase, image = image, icon = icon, id = id)
        db.session.add(new_fish)
        db.session.commit()

def create_bugs():
    db.session.query(Bugs).delete()
    bugs = load_json('bugs.json')
    for (k, bug) in bugs.items():
        name = bug['name']['name-USen']
        monthNorth = bug['availability']['month-northern']
        if monthNorth == "":
            monthNorth = "All Year"
        monthSouth = bug['availability']['month-southern']
        if monthSouth == "":
            monthSouth = "All Year"
        time = bug['availability']['time']
        if time == "":
            time = "All Day"
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
        
def create_items():
    db.session.query(Items).delete()
    files = ['houseware.json', 'misc.json', 'wallmounted.json']
    create_items_helper(files)
        
def create_items_helper(files):
    index = 1
    for string in files:
        housewares = load_json(string)
        for (k, item) in housewares.items():
            name = item[0]['name']['name-USen']
            kitCost = item[0]['kit-cost']
            if kitCost == None:
                kitCost = -1
            size = item[0]['size'].replace(" ", "")
            source = item[0]['source']
            isInteractive = item[0]['isInteractive']
            if type(item[0]['isInteractive']) == str:
                isInteractive = True
            buyPrice = item[0]['buy-price']
            sellPrice = item[0]['sell-price']
            category = item[0]['tag']
            if category == "":
                category = str('N/A')
            variant_list = []
            image_list = []  
            pattern_list = []
            for i in item:
                v = i['variant']
                if not v in variant_list:
                    variant_list.append(v)
                img = i['image_uri']
                if not img in image_list:
                    image_list.append(img)
                p = i['pattern']
                if not p in pattern_list:
                    pattern_list.append(p)
            variant = ""
            if variant_list[0] != None:
                variant = ', '.join(variant_list)
            image = ','.join(image_list)
            pattern = ""
            if pattern_list[0] != None:
                pattern = ', '.join(pattern_list)
            id = index
            new_item = Items(name = name, kitCost = kitCost, size = size,
                source = source, isInteractive = isInteractive, buyPrice = buyPrice, sellPrice = sellPrice,
                image = image, category = category, variant = variant, pattern = pattern, id = id)
            db.session.add(new_item)
            db.session.commit()
            index += 1       

def create_construction():
    db.session.query(Construction).delete()
    construction = load_json('construction.json')
    index = 1
    for cons in construction:
        name = cons['name']
        image = cons['image']
        buyPrice = cons['buy']
        source = cons['source'][0]
        category = cons['category']
        id = index
        new_item = Construction(name = name, image = image, buyPrice = buyPrice, source = source,
            category = category, id = id)
        db.session.add(new_item)
        db.session.commit()
        index += 1       
    
def create_recipes():
    db.session.query(Recipes).delete()
    recipes = load_json('recipes.json')
    index = 1
    for recipe in recipes:
        name = recipe['name']
        buyPrice = ""
        if recipe['buy'] == -1 and recipe['milesPrice'] == None:
            buyPrice = "Not Purchasable"
        elif recipe['buy'] != -1 and recipe['milesPrice'] == None:
            buyPrice = str(recipe['buy']) + " bells"
        elif recipe['buy'] == -1 and recipe['milesPrice'] != None:
            buyPrice = str(recipe['milesPrice']) + " Nook Miles"
        else:
            buyPrice = str(recipe['buy']) + " bells, " + str(recipe['milesPrice']) + " Nook Miles"
        sellPrice = recipe['sell']
        source = ', '.join(recipe['source'])
        sourceNotes = ""
        if recipe['sourceNotes'] != None:
            sourceNotes = recipe['sourceNotes']
        recipesToUnlock = recipe['recipesToUnlock']
        category = recipe['category']
        cardColor = recipe['cardColor']
        if cardColor == None:
            cardColor = "No Color"
        materials = ""
        for (key, value) in recipe['materials'].items():
            materials += str(value) + " " + key + "(s), "
        materials = materials[:-2]
        id = index
        new_item = Recipes(name = name, buyPrice = buyPrice, sellPrice = sellPrice, source = source,
            recipesToUnlock = recipesToUnlock, category = category, cardColor = cardColor, 
            materials = materials, sourceNotes = sourceNotes, id = id)
        db.session.add(new_item)
        db.session.commit()
        index += 1  
        
def create_reactions():
    db.session.query(Reactions).delete()
    reactions = load_json('reactions.json')
    index = 1
    for reaction in reactions:
        name = reaction['name']
        image = reaction['image']
        source = reaction['source'][0] + " Villagers"
        sourceNotes = reaction['sourceNotes']
        id = index
        new_item = Reactions(name = name, image = image, source = source, sourceNotes = sourceNotes, id = id)
        db.session.add(new_item)
        db.session.commit()
        index += 1
            
def create_clothes():
    db.session.query(Clothes).delete()
    #Note: umbrellas are not current used.
    clothes_list = ['accessories.json', 'bags.json', 'bottoms.json', 'clothing_other.json', 'dress_up.json',
        'headwear.json', 'shoes.json', 'socks.json', 'tops.json']
    index = 1
    for string in clothes_list:
        clothes = load_json(string)
        for cloth in clothes:
            name = cloth['name']
            # Get first from variation if this does not exist.
            image = ''
            if 'closetImage' in cloth:
                image = cloth['closetImage']
            # else:
                # variant = cloth['variations'][0]
                # image = variant['closetImage']
            if 'variation' in cloth and cloth['variation'] == None:
                variations = None
            else:
                variant_list = []
                image_list = []
                for variant in cloth['variations']:
                    variant_list.append(str(variant['variation']))
                    image_list.append(str(variant['closetImage']))
                variations = ", ".join(variant_list)
                image = ",".join(image_list)
                
            sourceSheet = cloth['sourceSheet']
            buy = cloth['buy']
            sell = cloth['sell']
            source = ', '.join(cloth['source']) 
            if cloth['sourceNotes'] != None:
                source += ' (' + cloth['sourceNotes'] + ')'
            seasonal = cloth['seasonalAvailability']
            villager = cloth['villagerEquippable']
            themes = ', '.join(cloth['themes'])
            id = index
            new_item = Clothes(name = name, image = image, sourceSheet = sourceSheet, buy = buy, sell = sell,
                source = source, seasonal = seasonal, villager = villager, themes = themes, variations = variations, id = id)
            db.session.add(new_item)
            db.session.commit()
            index += 1
    #Umbrella is lacks certain keys, and I didn't want to do more if statements just to check for 1 type of clothing, so it is done here.
    umbrellas = load_json('umbrellas.json')
    for umbrella in umbrellas:
        name = umbrella['name']
        image = umbrella['closetImage']
        sourceSheet = umbrella['sourceSheet']
        buy = umbrella['buy']
        sell = umbrella['sell']
        source = ', '.join(umbrella['source']) 
        if umbrella['sourceNotes'] != None:
            source += ' (' + umbrella['sourceNotes'] + ')'
        seasonal = "All Year"
        villager = umbrella['villagerEquippable']
        themes = "N/A"
        variations = None
        id = index
        new_item = Clothes(name = name, image = image, sourceSheet = sourceSheet, buy = buy, sell = sell,
            source = source, seasonal = seasonal, villager = villager, themes = themes, variations = variations, id = id)
        db.session.add(new_item)
        db.session.commit()
        index += 1

def create_search():
    searchID = 1
    def create_search_normal(file):
        f = load_json(file)
        nonlocal searchID
        for (k, val) in f.items():
            name = val['name']['name-USen']
            category = file.split(".")[0]
            id = val['id']
            new = Search(name = name, category = category, id = id, searchID = searchID)
            db.session.add(new)
            db.session.commit()        
            searchID += 1

    def create_search_items(files):
        index = 1
        nonlocal searchID
        for string in files:
            housewares = load_json(string)
            for (k, item) in housewares.items():
                name = item[0]['name']['name-USen']
                category = 'items'
                id = index
                new_item = Search(name = name, category = category, id = id ,searchID = searchID)
                db.session.add(new_item)
                db.session.commit()
                index += 1                 
                searchID += 1
                
    db.session.query(Search).delete()
    #normal add
    files = ['villagers.json', 'songs.json', 'sea.json', 'fish.json', 'bugs.json', 'art.json']
    for file in files:
        create_search_normal(file)
    #fossil add
    fossils = load_json('fossils.json')
    index = 1
    for (k, fossil) in fossils.items():
        name = fossil['name']['name-USen']
        category = 'fossils'
        id = index
        new = Search(name = name, category = category, id = id, searchID = searchID)
        db.session.add(new)
        db.session.commit()
        index += 1
        searchID += 1
    #items add
    item_files = ['houseware.json', 'misc.json', 'wallmounted.json']
    create_search_items(item_files)
    #construction add
    construction = load_json('construction.json')
    index = 1
    for cons in construction:
        name = cons['name']
        category = 'construction'
        id = index
        new = Search(name = name, category = category, id = id, searchID = searchID)
        db.session.add(new)
        db.session.commit()
        index += 1      
        searchID += 1
    #recipe add
    recipes = load_json('recipes.json')
    index = 1
    for recipe in recipes:
        name = recipe['name']
        category = 'recipes'
        id = index
        new_item = Search(name = name, category = category, id = id, searchID = searchID)
        db.session.add(new_item)
        db.session.commit()
        index += 1  
        searchID += 1
    #reactions add
    reactions = load_json('reactions.json')
    index = 1
    for reaction in reactions:
        name = reaction['name']
        category = 'reactions'
        id = index
        new_item = Search(name = name, category = category, id = id, searchID = searchID)
        db.session.add(new_item)
        db.session.commit()
        index += 1
        searchID += 1
    #clothing add
    clothes_list = ['accessories.json', 'bags.json', 'bottoms.json', 'clothing_other.json', 'dress_up.json',
        'headwear.json', 'shoes.json', 'socks.json', 'tops.json', 'umbrellas.json']
    index = 1
    for clothes in clothes_list:
        cloth = load_json(clothes)
        for c in cloth:
            name = c['name']
            category = 'clothes'
            id = index
            new_item = Search(name = name, category = category, id = id, searchID = searchID)
            db.session.add(new_item)
            db.session.commit()
            index += 1
            searchID += 1
        
    
    


#Create all databases
def create_database():
    create_villagers()
    create_songs()
    create_sea()
    create_items()
    create_fossils()
    create_fishes()
    create_bugs()
    create_arts()
    create_construction()
    create_recipes()
    create_reactions()
    create_clothes()
    create_search()

create_database()
