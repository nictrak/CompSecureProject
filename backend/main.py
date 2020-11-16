
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

        #mongo api

        return status

@app.route('/post/all' , methods = ['GET'])
def post_all():

        #mongo api

        return []

@app.route('/post/<post_id>' , methods = ['GET'])
def post_post_id(post_id):

        #mongo api

        return user_id , content , create_at , comment_id
#comment
@app.route('/post/comment/add', methods=['POST'])
def post_delete(post_id):
    # mongo api

    return status


if __name__ == '__main__' :
    app.run(debug= True)
