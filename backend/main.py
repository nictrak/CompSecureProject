
print("Flask start server")

#return redirect("http://www.example.com", code=302)
#return redirect('/you_were_redirected')

import json
from flask import Flask, redirect, url_for, request, Response
import pymongo
from database import MongoDB
import security
import database
user_data = {}
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
            data['token'] = guard.dumps_username(username)
            user_data[data['token']] = data['role']
            data['_id'] = str(data['_id'])
            data['password'] = "...."
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
    if mongo.post(payload):
        return Response('{}', status=202, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')

@app.route('/post/update/<post_id>', methods=['UPDATE'])
def post_delete(post_id):
    # mongo api

    return status

#comment
@app.route('/post/comment/add', methods=['POST'])
def post_delete(post_id):
    # mongo api

    return status

@app.route('/post/comment/comment_id', methods=['GET'])
def post_delete(post_id):
    # mongo api

    return user_id , content , create_at , post_id

@app.route('/post/comment/delete/comment_id', methods=['DELETE'])
def post_delete(post_id):
    # mongo api

    return status

@app.route('/post/comment/add', methods=['UPDATE'])
def post_delete(post_id):
    # mongo api


if __name__ == '__main__' :
    app.run(debug= True)
