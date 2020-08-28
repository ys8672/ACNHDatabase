#This is just the file I use for debugging stuff. You can ignore.

import json
from models import app, db, Construction, Recipes

def load_json(filename):
    with open(filename) as file:
        jsn = json.load(file)
        file.close()
    return jsn

# def create_items_helper(files):
    # index = 0
    # slist = [] 
    # for string in files:
        # housewares = load_json(string)
        # for (k, item) in housewares.items():                   
            # for i in item:
                # v = i['tag']
                # if not v in slist:
                    # slist.append(v)
                    
    # slist.sort()
    # real_list = []
    # for i in slist:
        # real_list.append(("'") + i + str("': '") + i + str("'"))
    # variant = ""
    # variant = ',\n'.join(real_list)
    # print(variant)

# files = ['houseware.json', 'misc.json', 'wallmounted.json']
# create_items_helper(files)

# def create_construction():
    # db.session.query(Construction).delete()
    # construction = load_json('json/construction.json')
    # for cons in construction:
        # print(cons['name'])

# create_construction()

def create_cons():
    index = 0
    slist = [] 
    construction = load_json('json/recipes.json')
    for item in construction:                   
        v = item['cardColor']
        if not v in slist and v != None:
            slist.append(v)
                    
    slist.sort()
    real_list = []
    for i in slist:
        real_list.append(("'") + str(i) + str("': '") + str(i) + str("'"))
    variant = ""
    variant = ',\n'.join(real_list)
    print(variant)

create_cons()