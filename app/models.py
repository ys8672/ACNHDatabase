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
    
class Sea(db.Model):
    '''
    Sea have the following attributes
    name        (the sea creature's name)
    monthNorth  (what months the sea creature is available in the Northern Hemisphere)
    monthSouth  (what months the sea creature is available in the Southern Hemisphere)
    time        (what time the sea creature can be found)
    speed       (how fast the sea creature swims)
    shadow      (size of sea creature shadow)
    price       (bells acquired from selling sea creature at Nook's Cranny)
    catchPhrase (game phrase when you acquired this sea creature)
    museumPhrase(museum plack describing sea creature)
    image       (URL to image of sea creature)
    icon        (URL to image of sea creature in your inventory)
    id          (the id of the sea creature in the database)
    '''
    __tablename__= 'sea'
    
    name = db.Column(db.String(256), nullable = False)
    monthNorth = db.Column(db.String(256), nullable = False)
    monthSouth = db.Column(db.String(256), nullable = False)
    time = db.Column(db.String(256), nullable = False)
    speed = db.Column(db.String(256), nullable = False)
    shadow = db.Column(db.String(256), nullable = False)
    price = db.Column(db.Integer, nullable = False)
    catchPhrase = db.Column(db.String(256), nullable = False)
    museumPhrase = db.Column(db.String(65536), nullable = False)
    image = db.Column(db.String(256), nullable = False)
    icon = db.Column(db.String(256), nullable = False)
    id = db.Column(db.Integer, primary_key = True)
    
class Fossils(db.Model):
    '''
    Fossils has the following attributes
    name            (the fossil's name)
    price           (the sale price of the fossil at Nook's Cranny)
    museumphrase    (the museum description of the fossil)
    image           (picture of the fossil)
    id              (id of the fossil)
    '''
    __tablename__ = 'fossils'
    
    name = db.Column(db.String(256), nullable = False)
    price = db.Column(db.Integer, nullable = False)
    museumPhrase = db.Column(db.String(65536), nullable = False)
    image = db.Column(db.String(256), nullable = False)
    id = db.Column(db.Integer, primary_key = True)

db.create_all()
