
print("Use flask here.")

#return redirect("http://www.example.com", code=302)
#return redirect('/you_were_redirected')

from flask import Flask, redirect, url_for, request
import pymongo
from database import MongoDB


app = Flask(__name__)

#test
"""
@app.route('/admin')
def hello_admin():
    return 'Hello Admin'

@app.route('/guest/<guest>')
def hello_guest(guest):
    return 'Hello %s as Guest' % guest

@app.route('/user/<name>')
def hello_user(name):
    if name == 'admin':
        return redirect(url_for('hello_admin'))
    else:
        return redirect(url_for('hello_guest', guest = name))


@app.route('/success/<name>')
def success(name):
    return 'welcome %s' % name

@app.route('/login' , methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['nm']
        return redirect(url_for('success',name = user))
    else:
        user = request.args.get('nm')
        return  redirect(url_for('success',name = user))
"""
#test end

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

        #mongo api

        return status

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