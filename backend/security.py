from itsdangerous.url_safe import URLSafeSerializer
import hashlib

class Guard:
    def __init__(self):
        self.serializer = URLSafeSerializer("secret-key", salt="upgrade")

    def hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

    def dumps_user(self, username):
        return self.serializer.dumps(username)

    def loads_token(self, token):
        return self.serializer.loads_unsafe(token[7:])
