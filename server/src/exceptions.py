class KeyNotFoundError(Exception):
    def __init__(self, key):
        self.key = key
        super().__init__("Key ({}) not found".format(key))