from flask import Flask, request, jsonify
#import fbstoresort
import optimal_sort
import fbupload
import fbdelete
import dfsapi
from json import dumps
from exceptions import KeyNotFoundError
from dfsgmap import distance_between
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def main_view():
    return "Online Host for DFS-IAS Sorter API"

# Sort Section

@app.route('/sort', methods=['GET','POST'])
def sort():
    sortparams = request.get_json()
    print("SP")
    print(sortparams)
    season = sortparams['Season']

    db = dfsapi.get_db()
    # Get all schools
    schools_data = db.child(season).child("schools").get().val()
    # Get all instructors
    instructors_data = db.child(season).child("instructors").get().val()
    # Get all programs
    programs_data = db.child(season).child("programs").get().val()

    distance_data = dict()
    region_set = {instructors_data[instr]['region'][0] for instr in instructors_data}
    for school in schools_data:
        distance_data[school] = distance_between(list(region_set), schools_data[school]['address'])

    response = dict()
    for program in programs_data:
        response.update(optimal_sort.optimal_sort(schools_data, instructors_data, distance_data, program))
    return dumps(response)

@app.route('/resort', methods=['GET', 'POST'])
def resort():
    sortparams = request.get_json()
    print("RP")
    print(sortparams)
    season = sortparams['Season']
    locked_instructors = sortparams["Locked"]

    db = dfsapi.get_db()
    # Get all schools
    schools_data = db.child(season).child("schools").get().val()
    # Get all instructors
    instructors_data = db.child(season).child("instructors").get().val()
    # Get all programs
    programs_data = db.child(season).child("programs").get().val()

    distance_data = dict()
    region_set = {instructors_data[instr]['region'][0] for instr in instructors_data}
    for school in schools_data:
        distance_data[school] = distance_between(list(region_set), schools_data[school]['address'])

    response = dict()
    for program in programs_data:
        response.update(optimal_sort.optimal_resort(locked_instructors, schools_data, instructors_data, distance_data, program))
    return dumps(response)

# Instructor Section

@app.route('/uploadinstructor', methods=['GET', 'POST'])
def upload_instructor():
    fbupload.upload_instructor(request.get_json())
    return "Uploading Instructors Success!"

#REQUIRES JSON OBJECT WITH PARAMETERS FOR SEASON, TEACHER NAME, TEACHER UNIVERSITY, AND TEACHER MAJOR.
@app.route('/deleteinstructor', methods=['GET', 'POST'])
def delete_instructor():
    instrparams = request.get_json()
    fbdelete.delete_instructor(instrparams["Season"], instrparams["Instructor"])
    return "Deleting Instructors Success"

# School Section

@app.route('/uploadschool', methods=['GET', 'POST'])
def upload_school():
    fbupload.upload_school(request.get_json())
    return "Uploading Institutions Success!"

@app.route('/deleteschool', methods=['GET', 'POST'])
def delete_school():
    instparams = request.get_json()
    try:
        fbdelete.delete_school(instparams["Season"], instparams["School"])
        return "Delete ({}) Success!".format(instparams["School"])
    except KeyNotFoundError as err:
        print(err)
        return repr(err)

# Program Section

@app.route('/uploadprogram', methods=['GET', 'POST'])
def upload_program():
    fbupload.upload_program(request.get_json())
    return "Uploading Program Success!"


@app.route('/deleteprogram', methods=['GET', 'POST'])
def delete_program():
    instparams = request.get_json()
    try:
        fbdelete.delete_program(instparams["Season"], instparams["Program"])
        return "Delete ({}) Success!".format(instparams["Program"])
    except KeyNotFoundError as err:
        print(err)
        return repr(err)

# Lock Section

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