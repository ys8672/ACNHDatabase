from flask import Flask, render_template, url_for, request, Response, json, redirect
from flask_cors import CORS
import io
import contextlib
from create_db import db, Villagers
from sqlalchemy.orm.exc import NoResultFound
import requests


app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
@app.route('/villagers/')
def index():
    return app.send_static_file('index.html')
    

def get_villager_dict(villager):
    return {"name": villager.name, "personality": villager.personality, "birthday": villager.birthday, "species": villager.species,
            "gender": villager.gender, "catchPhrase": villager.catchPhrase, "image": villager.image, "id": villager.id}
    
@app.route('/api/villagers/')
def data():
    response = []
    villagers_list = db.session.query(Villagers).all()
    for villager in villagers_list:
        new_one = get_villager_dict(villager)
        response.append(new_one)
    new_list = {'villagers': response}
    return new_list


if __name__ == '__main__':
    app.run()
