from flask import Flask, render_template, request, jsonify, redirect, abort
import datetime, json
from bson.objectid import ObjectId
import re

from flask_cors import cross_origin
from flask_restful import Resource, Api, reqparse
from flask_restful.utils import cors
# from flask_cors import CORS
from pymongo import MongoClient

url = 'mongodb://mymongo:1234qwer.@localhost/note'
client = MongoClient(url, 27017)
dbc = client.note

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
  tag_list = []
  for x in colltag.find():
    tag_list.append(x['name'])
  return tag_list


class Encoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, ObjectId):
      return str(obj)
    else:
      return obj


class Postlist(Resource):
  @cross_origin(origins="http://localhost:5000*")
  def __init__(self):
    self.parser = reqparse.RequestParser()
    self.parser.add_argument('title', type=str, location=['json','args'], required=True)
    self.parser.add_argument('date', type=str, location=['json','args'], required=True)
    self.parser.add_argument('tags', type=str, location=['json','args'], required=True)
    self.parser.add_argument('text', type=str, location=['json','args'], required=True)
    super(Postlist, self).__init__()

  @cross_origin(origins="http://localhost:5000*")
  def get(self):#得到文章列表
    posts = collpost.find().sort([('lastedittime', -1), ('createtime', -1)])
    post = []
    for x in posts:
      post.append(x)
    return json.dumps(post, cls=Encoder)

  @cross_origin(origins="http://localhost:5000*")
  def post(self):#发新文章
    newpost = self.parser.parse_args()#获取post的json数据
    time = str(datetime.datetime.now())[0:19]#加入时戳
    newpost["createtime"]=time
    newpost["lastedittime"]=time
    title = newpost["title"]
    exist = collpost.find_one({'title': title})
    if not exist:
      # 如果是新标题，直接写入数据库
      collpost.insert(newpost)
    else:#标题已存在
      newpost["title"] = newpost["title"] + '-' + newpost["date"]  # 标题加时戳
      # newtitlepost=postid.pop("title")
      #如果是重复的标题,去除标题
      # collpost.update({'title': title}, {'$set':postid }, True)
      collpost.insert(newpost)
      print('插入更换标题后的数据')
    return json.dumps({'msg': 'post updated.', 'data': '111'}), 200

class Post(Resource):
  # @cross_origin(origins="http://localhost:5000*")
  def __init__(self):
    self.parser = reqparse.RequestParser()
    self.parser.add_argument('title', type=str, location=['json','args'], required=True)
    self.parser.add_argument('date', type=str, location=['json','args'], required=True)
    self.parser.add_argument('tags', type=str, location=['json','args'], required=True)
    self.parser.add_argument('text', type=str, location=['json','args'], required=True)
    super(Post, self).__init__()

  @cross_origin(origins="http://localhost:5000*")
  def get(self, id):#读取一篇文章
    postbyid = collpost.find_one({'_id': ObjectId(id)})
    return json.dumps(postbyid, cls=Encoder)

  @cross_origin(origins="http://localhost:5000*")
  def put(self,id):#更新文章
    putpost = self.parser.parse_args()#获取post的json数据
    postid = collpost.find_one({'_id': ObjectId(id)})
    print(postid)
    time = str(datetime.datetime.now())[0:19]#加入时戳
    postid["createtime"]=time
    postid["lastedittime"]=time
    title = postid["title"]
    exist = collpost.find_one({'title': title})
    if not exist:
      # 如果是新标题，直接写入数据库
      collpost.insert(postid)
      print('插入数据1')
    else:#标题已存在
      postid["title"] = postid["title"] + '-' + postid["date"]  # 标题加时戳
      # newtitlepost=postid.pop("title")#如果是重复的标题,去除标题
      # collpost.update({'title': title}, {'$set':postid }, True)
      collpost.insert(postid)
      print('插入更换标题后的数据')
    return json.dumps({'msg': 'post updated.', 'data': '111'}), 200

  def delete(self, id):#删除文章
    return {'msg': 'post Deleted'}, 202


@app.route("/hello")
def helloWorld():
  return "Hello, cross-origin-world!"


api = Api(app)
api.add_resource(Postlist, '/api/posttable')
api.add_resource(Post, '/api/post/<id>')
# api.decorators=[cors.crossdomain(origin='*')]
if __name__ == '__main__':
  app.run(debug=True)
