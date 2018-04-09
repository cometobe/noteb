from flask import Flask, render_template, request, jsonify, redirect, abort
import datetime,json
from bson.objectid import ObjectId
import re
from flask_restful import Resource
from flask_restful import Api
# from flask_restful.utils import cors
# from flask_cors import CORS
from pymongo import MongoClient
url='mongodb://mymongo:1234qwer.@localhost/note'
client = MongoClient(url,27017)
dbc =client.note


app = Flask(__name__)
# CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/__webpack_hmr')
def npm():
    return redirect('http://localhost:8080/__webpack_hmr')

collpost = dbc.post
colltag = dbc.tags
collr = dbc.restore

def tag_lists():
    tag_list=[]
    for x in colltag.find():
        tag_list.append(x['name'])
    return tag_list

class Encoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        else:
            return obj

from flask_cors import cross_origin
class Postlist(Resource):
    @cross_origin(origins="http://localhost:5000*")
    def get(self):
        posts = collpost.find().sort([('lastedittime', -1), ('createtime', -1)])
        post = []
        for x in posts:
            post.append(x)
        return json.dumps(post,cls=Encoder)

@app.route("/hello")
def helloWorld():
  return "Hello, cross-origin-world!"

api = Api(app)
api.add_resource(Postlist,'/api/posttable')
# api.decorators=[cors.crossdomain(origin='*')]
if __name__ == '__main__':
    app.run(debug=True)
