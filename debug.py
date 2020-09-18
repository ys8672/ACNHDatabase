#This is just the file I use for debugging stuff. You can ignore.

import json


def load_json(filename):
    with open(filename ,encoding='utf-8') as file:
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

# def create_cons():
    # index = 0
    # slist = [] 
    # clothes_list = ['accessories.json', 'bags.json', 'bottoms.json', 'clothing_other.json', 'dress_up.json',
        # 'headwear.json', 'shoes.json', 'socks.json', 'tops.json']
    # for clothes in clothes_list:
        # construction = load_json('json/' + clothes)
        # for item in construction:  
            # #source = ', '.join(cloth['source'])         
            # v = item['seasonalAvailability']
            # if not v in slist and v != None:
                # slist.append(v)
                    
    # slist.sort()
    # real_list = []
    # for i in slist:
        # real_list.append(("'") + str(i) + str("': '") + str(i) + str("'"))
    # variant = ""
    # variant = ',\n'.join(real_list)
    # print(variant)

# create_cons()
# def buyPrice():
    # price_list = []
    # construction = load_json('json/construction.json')
    # for cons in construction:
        # price_list.append(cons['buy'])
    # print(price_list)  
    # fig = plt.figure(figsize =(10, 7)) 
    # plt.boxplot(price_list) 
    # plt.show() 

# buyPrice()
def color():
    color_list = []
    file = load_json('json/wallpapers.json')
    for w in file:
        # for c in w['concepts']:
            # if not c in color_list:
                # color_list.append(c)
        thing = w['tag']
        if thing == None:
            thing = 'None'
        if not thing in color_list:
            color_list.append(thing)
    color_list.sort()
    real_list = []
    for i in color_list:
        real_list.append(("'") + str(i) + str("': '") + str(i) + str("'"))
    variant = ""
    variant = ',\n'.join(real_list)
    print(variant)

color()
