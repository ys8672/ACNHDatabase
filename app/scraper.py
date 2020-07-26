import requests
import json

#Creates JSON file for each catego
def makeJsonFile(files):
    for string in files:
        URL = "https://acnhapi.com/v1/"
        response = requests.get(URL + str(string) + '/')
        my_json = response.text
        parsed = json.loads(my_json)
        
        out = open(string + ".json", "w", encoding='utf-8')
        out.write(json.dumps(parsed, indent=4))
        out.close()
        print(string + ".json was created")
        
files = ["fish", "sea", "bugs", "fossils", "villagers", "songs", "art"]
makeJsonFile(files)