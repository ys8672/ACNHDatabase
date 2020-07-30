from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",'postgres://postgres:password@localhost:5432/acnh')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

class Villagers(db.Model):
    """
    Villagers have the following attributes
    name        (the villager's name)
    personality (the villager's personality affecting their dialogue)
    birthday    (the villager's date of birth)
    species     (the villager's animal type)
    gender      (the villager's gender)
    catchPhrase (the vilager's greeting to the player)
    image       (the villager's photo)
    icon        (the villager's face)
    id          (the id of the villager in the database)
    """
    __tablename__ = 'villagers'

    name = db.Column(db.String(256), nullable = False)
    personality = db.Column(db.String(256), nullable = False)
    birthday = db.Column(db.String(256), nullable = False)
    species = db.Column(db.String(256), nullable = False)
    gender = db.Column(db.String(256), nullable = False)
    catchPhrase = db.Column(db.String(256), nullable = False)
    image = db.Column(db.String(256), nullable = False)
    icon = db.Column(db.String(256), nullable = False)
    id = db.Column(db.Integer, primary_key = True)
    
class Songs(db.Model):
    """
    Songs have the following attributes
    name        (the song's name)
    buyPrice    (the song's price from store)
    sellPrice   (the song's sell price at store)
    isOrderable (boolean determining if song can be bought)
    image       (the song cover photo)
    music       (link to the song)
    id          (the id of the song in the database)
    """
    __tablename__= 'songs'
    
    name = db.Column(db.String(256), nullable = False)
    buyPrice = db.Column(db.Integer, nullable = True)
    sellPrice = db.Column(db.Integer, nullable = False)
    isOrderable = db.Column(db.Boolean, nullable = False)
    image = db.Column(db.String(256), nullable = False)
    music = db.Column(db.String(256), nullable = False)
    id = db.Column(db.Integer, primary_key = True)

db.create_all()
