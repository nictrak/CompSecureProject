
print("Use flask here.")

#return redirect("http://www.example.com", code=302)
#return redirect('/you_were_redirected')

from flask import Flask, redirect, url_for, request , Response
import pymongo
from database import MongoDB
mongo = database.MongoDB()


app = Flask(__name__)

#finish-----------------------------------------------------------

#unfinish---------------------------------------------------------

#register
@app.route('/register' , methods = ['POST'])
def register():

        #mongo api

        return status

#login
@app.route('/login' , methods = ['GET'])
def login():
        user_id = request.form['user_id']
        role = request.form['role']
        token = request.form['token']

        #mongo api

        return userID , role , token

#post
@app.route('/post/create' , methods = ['POST'])
def post_create():
    # mongo api
    content = request.form['content']
    username = request.form['username']
    uid = request.form['uid']
    payload = {
        'content' : content,
        'username': username,
        'uid': uid,
    }
    if mongo.post(payload):
        return Response('{}', status=201, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')


@app.route('/post/all' , methods = ['GET'])
def post_all():

        #mongo api

        return ???

@app.route('/post/<post_id>' , methods = ['GET'])
def post_post_id(post_id):

        #mongo api

        return user_id , content , create_at , comment_id

# post
@app.route('/post/delete/<post_id>', methods=['DELETE'])
def post_delete(post_id):

    # mongo api

    return status

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

    return status

    if __name__ == '__main__' :
    app.run(debug= True)