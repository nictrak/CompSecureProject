import pymongo

DATABASE_URL = "mongodb+srv://admin01:8WpQSvdZxdygzSt@cluster0.az2zn.mongodb.net/"

DATABASE_NAME = "project"

AUTH_DATA = "users"

POST_DATA = "posts"

REGISTER_KEYS = ["username", "password", "type"]

LOGIN_KEYS = ["username", "password"]

POST_KEYS = ["content","username", "uid"]

COMMENT_KEYS = ["content", "pid"]



class MongoDB:
    def __init__(self):
        self.client = pymongo.MongoClient(DATABASE_URL)
        self.database = self.client[DATABASE_NAME]
        self.auth_col = self.database[AUTH_DATA]
        self.post_col = self.database[POST_DATA]

    def check_keys(payload, form):
        if payload.keys() == form:
            return True
        return False

    def add_user(self, payload):
        if self.check_keys(payload, REGISTER_KEYS):
            self.auth_col.insert_one(payload)
            return True
        return False

    def login(self, payload):
        if not self.check_keys(payload, LOGIN_KEYS):
            return False
        if not is_auth_col(payload):
            return False
        temp = list(self.auth_col.find(payload))
        if len(temp) >= 1:
            return True
        return False

    def post(self, payload):
        if self.check_keys(payload, POST_KEYS):
            real_payload = dict(payload)
            real_payload["comments"] = []
            self.post_col.insert_one(real_payload)
            return True
        return False

    def comment(self, payload):
        if self.check_keys(payload, COMMENT_KEYS):
            self.post_col.update({"_id": payload["pid"]},
                                 {"$push": {"comments": payload["content"]}})
        return False