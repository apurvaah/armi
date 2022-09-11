from flask import Flask
import math
from flask_cors import CORS, cross_origin
from dataset import *


app = Flask(__name__, static_folder='./build', static_url_path='/')

# enabling and initializing cross origin resource sharing
CORS(app)

# configuring headers for app
app.config['CORS_HEADERS'] = 'Content-Type'

# when app is accessed, should show reactJS file
@app.route("/")
def hello_world():
    return app.send_static_file('index.html')

@app.route("/rewards")
def print_rewards():
    prob = score_calculation(75,25)
    return random_rewards(int(math.floor(prob*100)))