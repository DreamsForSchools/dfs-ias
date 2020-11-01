class KeyNotFoundError(Exception):
    def __init__(self, key):
        self.key = key
        super().__init__("Key ({}) not found".format(key))

class KeyExists(Exception):
    def __init__(self, key):
        self.key = key
        super().__init__("Key ({}) already exists".format(key))