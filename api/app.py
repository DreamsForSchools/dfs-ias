from flask import Flask, request, jsonify
import fbstoresort
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def main_view():
    return "Online Host for DFS-IAS Sorter API"

@app.route('/sort', methods=['GET','POST'])
def sort():
    sortparams = request.get_json()
    program = sortparams['Program']
    matches = fbstoresort.upload_matches(program)
    return jsonify(matches)

# def create_app():

#     from views import main
#     app.register_blueprint(main)

#     return app

if __name__=='__main__':
    app.run()