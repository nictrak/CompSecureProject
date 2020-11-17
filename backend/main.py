
import database
import security
from database import MongoDB
import pymongo
from flask import Flask, redirect, url_for, request, Response
import json
print("Flask start server")

# return redirect("http://www.example.com", code=302)
# return redirect('/you_were_redirected')

app = Flask(__name__)
guard = security.Guard()
mongo = database.MongoDB()


# register
@app.route('/api/register', methods=['POST'])
def register():
    req_data = request.get_json(force=True)
    username = req_data['username']
    password = req_data['password']
    encrypted_pwd = guard.hash_password(password)
    payload = {
        'username': username,
        'password': encrypted_pwd,
        'role': 'user'
    }
    if mongo.add_user(payload):
        return Response('{}', status=201, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')


# login
@app.route('/api/login', methods=['POST'])
def login():
    req_data = request.get_json(force=True)
    username = req_data['username']
    password = req_data['password']
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
    return Response('{}', status=400, mimetype='application/json')

# post


@app.route('/api/post/create', methods=['POST'])
def post_create():
    req_data = request.get_json(force=True)
    content = req_data['content']
    is_pass, user_data = guard.loads_token(request.headers['Authorization'])
    if not is_pass:
        return Response('{}', status=401, mimetype='application/json')
    username = user_data['username']
    uid = user_data['_id']
    payload = {
        'content': content,
        'username': username,
        'uid': uid,
    }
    if mongo.post(payload):
        return Response('{}', status=201, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')


@app.route('/api/post/all', methods=['GET'])
def post_all():
    is_pass, user_data = guard.loads_token(request.headers['Authorization'])
    if not is_pass:
        return Response('{}', status=401, mimetype='application/json')
    post_list = mongo.get_all_post()
    for data in post_list:
        data['_id'] = str(data['_id'])
    return {'posts': post_list}


@app.route('/api/post/<post_id>', methods=['GET'])
def post_post_id(post_id):
    is_pass, user_data = guard.loads_token(request.headers['Authorization'])
    if not is_pass:
        return Response('{}', status=401, mimetype='application/json')
    data = mongo.get_one_post(post_id)
    data['_id'] = str(data['_id'])
    return data

# post


@app.route('/api/post/delete/<post_id>', methods=['DELETE'])
def post_delete(post_id):
    is_pass, user_data = guard.loads_token(request.headers['Authorization'])
    if not is_pass:
        return Response('{}', status=401, mimetype='application/json')
    access_uid = mongo.get_one_post(post_id)['uid']
    if access_uid != user_data['_id']:
        return Response('{}', status=401, mimetype='application/json')
    mongo.delete_post(post_id)
    return Response('{}', status=200, mimetype='application/json')


@app.route('/api/post/update', methods=['PATCH'])
def post_update():
    req_data = request.get_json(force=True)
    content = req_data['content']
    pid = req_data['pid']
    is_pass, user_data = guard.loads_token(request.headers['Authorization'])
    if not is_pass:
        return Response('{}', status=401, mimetype='application/json')
    access_uid = mongo.get_one_post(pid)['uid']
    if access_uid != user_data['_id']:
        return Response('{}', status=401, mimetype='application/json')
    payload = {
        'pid': pid,
        'content': content
    }
    if mongo.update_post(payload):
        return Response('{}', status=200, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')


# comment
@app.route('/api/post/comment/add', methods=['POST'])
def comment_add():
    req_data = request.get_json(force=True)
    pid = req_data['pid']
    content = req_data['content']
    is_pass, user_data = guard.loads_token(request.headers['Authorization'])
    if not is_pass:
        return Response('{}', status=401, mimetype='application/json')
    access_uid = mongo.get_one_post(pid)['uid']
    if access_uid != user_data['_id']:
        return Response('{}', status=401, mimetype='application/json')
    username = user_data['username']
    uid = user_data['_id']
    payload = {
        'content': content,
        'username': username,
        'uid': uid,
        'pid': pid
    }
    if mongo.comment(payload):
        return Response('{}', status=201, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')


@app.route('/api/post/comment/delete', methods=['DELETE'])
def comment_delete():
    req_data = request.get_json(force=True)
    print(req_data)
    pid = req_data['pid']
    cid = req_data['cid']
    # pid = request.args.get('pid')
    # cid = request.args.get('cid')
    # print(pid, cid)
    is_pass, user_data = guard.loads_token(request.headers['Authorization'])
    if not is_pass:
        return Response('{}', status=401, mimetype='application/json')
    access_uid = mongo.get_one_post(pid)['uid']
    if access_uid != user_data['_id']:
        return Response('{}', status=401, mimetype='application/json')
    mongo.delete_comment(pid, cid)
    return Response('{}', status=200, mimetype='application/json')


@app.route('/api/post/comment/update', methods=['PATCH'])
def comment_update():
    req_data = request.get_json(force=True)
    content = req_data['content']
    pid = req_data['pid']
    cid = req_data['cid']
    is_pass, user_data = guard.loads_token(request.headers['Authorization'])
    if not is_pass:
        return Response('{}', status=401, mimetype='application/json')
    access_uid = mongo.get_one_post(pid)['uid']
    if access_uid != user_data['_id']:
        return Response('{}', status=401, mimetype='application/json')
    payload = {
        'pid': pid,
        'cid': cid,
        'content': content
    }
    if mongo.update_comment(payload):
        return Response('{}', status=200, mimetype='application/json')
    return Response('{}', status=400, mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True)
