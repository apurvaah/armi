import os
from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./build', static_url_path='/')

# enabling and initializing cross origin resource sharing
CORS(app)

# configuring headers for app
app.config['CORS_HEADERS'] = 'Content-Type'

# when app is accessed, should show reactJS file
@app.route("/")
def hello_world():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')