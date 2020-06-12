from flask import Flask, request, jsonify
import fbstoresort
import fbresort
import fbupload
import manageinstructors
import shirtsize
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

@app.route('/resort', methods=['GET', 'POST'])
def resort():
    resortparams = request.get_json()
    program = resortparams['Program']
    matches = fbresort.resort_matches(program)
    return jsonify(matches)

@app.route('/uploadinstructors', methods=['GET', 'POST'])
def upload_instructors():
    instrparams = request.get_json()
    fbupload.upload_instructors(instrparams)
    return "Uploading Instructors Success!"

@app.route('/uploadinstitutions', methods=['GET', 'POST'])
def upload_institutions():
    instparams = request.get_json()
    fbupload.upload_institutions(instparams)
    return "Uploading Institutions Success!"

@app.route('/lockinstructor', methods=['GET', 'POST'])
def lock_instructors():
    lockparams = request.get_json()
    val = manageinstructors.lock_instructor(lockparams["Program"], lockparams["TeacherName"], lockparams["SchoolName"])
    if val == False:
        return str(val)
    return val

@app.route('/unlockinstructor', methods=['GET', 'POST'])
def unlock_instructors():
    unlockparams = request.get_json()
    val = manageinstructors.unlock_instructor(unlockparams["Program"], unlockparams["TeacherName"], unlockparams["SchoolName"])
    return str(val)

@app.route('/removeinstructor', methods=['GET', 'POST'])
def remove_instructors():
    removeparams = request.get_json()
    boolval = manageinstructors.remove_instructor(removeparams["Program"], removeparams["SchoolName"], removeparams["TeacherName"])
    return str(boolval)

@app.route('/showavailablemoves', methods=['GET', 'POST'])
def show_available_moves():
    availparams = request.get_json()
    val = manageinstructors.available_moves(availparams["Program"], availparams["TeacherName"])
    if val == False:
        return str(val)
    return val

@app.route('/shirts', methods=['GET', 'POST'])
def shirts():
    shirtparams = request.get_json()
    sizes = shirtsize.upload_shirtsize(shirtparams["Program"])
    return str(sizes)

@app.route('/moveinstructor', methods=['GET', 'POST'])
def move_instructor():
    moveparams = request.get_json()
    boolval = manageinstructors.move_instructor(moveparams["Program"], moveparams["SchoolName"], moveparams["TeacherName"])
    return str(boolval)


# def create_app():

#     from views import main
#     app.register_blueprint(main)

#     return app

if __name__=='__main__':
    app.run()