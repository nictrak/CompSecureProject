
print("Flask start server")

#return redirect("http://www.example.com", code=302)
#return redirect('/you_were_redirected')

import json
from flask import Flask, redirect, url_for, request, Response
import pymongo
from database import MongoDB
import security
import database
app = Flask(__name__)
guard = security.Guard()
mongo = database.MongoDB()

#register
@app.route('/register' , methods = ['POST'])
def register():

        #mongo api
        username = request.form['username']
        password = request.form['password']
        encrypted_pwd = guard.hash_password(password)
        payload = {
            'username': username,
            'password': encrypted_pwd,
            'role': 'user' 
        }
        if mongo.add_user(payload):
            return Response('{}', status=201, mimetype='application/json')
        return Response('{}', status=400, mimetype='application/json')

#login
@app.route('/login' , methods = ['POST'])
def login():
        username = request.form['username']
        password = request.form['password']
        encrypted_pwd = guard.hash_password(password) 
        payload = {
            'username': username,
            'password': encrypted_pwd
        }
        success, data = mongo.login(payload)
        if success:
            data['_id'] = str(data['_id'])
            del data['password']
            data['token'] = guard.dumps_user(data)
            return data
        return Response('{}',status=400, mimetype='application/json')

#post
@app.route('/post/create' , methods = ['POST'])
def post_create():
        content = request.form['content']
        username = request.form['username']
        uid = request.form['uid']
        payload = {
            'content': content,
            'username': username,
            'uid': uid,
        }
        if mongo.post(payload):
            return Response('{}', status=201, mimetype='application/json')
        return Response('{}', status=400, mimetype='application/json')

@app.route('/post/all' , methods = ['GET'])
def post_all():
        post_list = mongo.get_all_post()
        for data in post_list:
            data['_id'] = str(data['_id'])
        return post_list

@app.route('/post/<post_id>' , methods = ['GET'])
def post_post_id(post_id):
        data = mongo.get_one_post(post_id)
        data['_id'] = str(data['_id'])
        return data

# post
@app.route('/post/delete/<post_id>', methods=['DELETE'])
def post_delete(post_id):
    payload = {
        'post_id': post_id
    }
    if mongo.post_delete(payload):
        return Response('{}', status=202, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')

#comment
@app.route('/post/comment/add', methods=['POST'])
def comment_add(post_id):
    content = request.form['content']
    username = request.form['username']
    uid = request.form['uid']
    pid = request.form['pid']
    payload = {
        'content': content,
        'username': username,
        'uid': uid,
        'pid': pid
    }
    if mongo.comment(payload):
        return Response('{}', status=201, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')

if __name__ == '__main__' :
    app.run(debug= True)
