from flask import Flask, render_template, url_for, request, Response, json, redirect
from flask_cors import CORS

app = Flask(__name__, static_folder='build', static_url_path='/')
CORS(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run()
