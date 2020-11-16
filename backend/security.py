from itsdangerous.url_safe import URLSafeSerializer
import hashlib

class Guard:
    def __init__(self):
        self.serializer = URLSafeSerializer("secret-key", salt="upgrade")

    def hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

    def dumps_username(self, username):
        return self.serializer.dumps(username)

