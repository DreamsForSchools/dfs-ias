from flask import Flask
import api.dfsapi

db = api.dfsapi.get_db()

def create_app():
    app = Flask(__name__)

    from .views import main
    app.register_blueprint(main)

    return app