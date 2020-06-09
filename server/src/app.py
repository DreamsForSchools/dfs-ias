'''
API main page that runs in the server.
'''

from flask import Flask, jsonify, request
import api.fbstoresort
import api.shirtsize
import api.fbresort
import api.manageinstructors

app = Flask(__name__)

'''
Access by url/uploadinstructors.
POST request with json object in the format:
{ "Name": "Min Sung Cha", 
"Gender": "Male", 
"Ethnicity": "Chinese", 
"Region": "Irvine", 
"University": "University of California, Irvine", 
"Year": "4th", 
"PreviousMentor": "Yes", 
"Car": "No", 
"Languages": "English", 
"ShirtSize": "L", 
"MultipleDays": "Yes", 
"Monday": ["09:00", "15:00"], 
"Tuesday": ["10:00", "21:00"], 
"Wednesday": "", 
"Thursday": "", 
"Friday": "", 
"Program": ["Appjam+", "Webjam", "Sphero"], 
"New" : false }

Adds the instructor in specified program tab in firebase.

"New" key specifies if it will create a new timestamp.

For uploading a roster by looping through every row of the csv file set the first instructor with "New":true and the rest with "New":false

For manual uploads set "New":false
'''
@app.route('/uploadinstructors', methods=['GET', 'POST'])
def upload_instructors():
    json_input = request.get_json()

    api.manageinstructors.upload_instructor(json_input)

    return 'Done', 201

'''
Access by url/uploadinstitutions.
POST request with json object in this format:
{ "Name" : "American School", 
"Address" : "1111 S Broadway, Santa Ana, CA 92707", 
"Program" : ["Appjam+"], 
"County" : "Orange County", 
"Instructors" : 4, 
"Monday" : ["15:00", "17:45"], 
"Tuesday" : "", 
"Wednesday" : ["15:00", "17:45"], 
"Thursday" : "", 
"Friday" : "", 
"New" : false }

Uploads the institution in the specified program.

"New" key specifies if it will create a new timestamp.

For uploading a roster by looping through every row of the csv file set the first institution with "New":true and the rest with "New":false

For manual uploads set "New":false
'''
@app.route('/uploadinstitutions', methods=['GET', 'POST'])
def upload_institutions():
    json_input = request.get_json()

    api.manageinstructors.upload_institution(json_input)

    return 'Done', 201

'''
Access by url/sort.
POST request with json object in this format
{"Program":"Appjam+"}
Returns a json object showing institutions as keys and list of instructors as value.
Stores the json object in the firebase with a new timestamp
under the matches tab under the specified program.
If any error occurs it returns false and the sorted information is not stored.
'''
@app.route('/sort', methods=['GET','POST'])
def sort():
    json_input = request.get_json()
    program = json_input['Program']

    matches = api.fbstoresort.upload_matches(program)

    return jsonify(matches)

'''
Access by url/shirts
POST request with json object in this format
{"Program":"Appjam+"}
Returns json object with shirt sizes and quantities. 
Adds a shirts tab under the specified program and stores
the shirts information there.
If any error occurs it returns false and the shirts information is not stored.
'''
@app.route('/shirts', methods=['GET', 'POST'])
def shirts():
    program = request.get_json()
    shirts = api.shirtsize.upload_shirtsize(program['Program'])
    return jsonify(shirts)

'''
Access by url/lockinstructor
POST request with json object in this format
{"Program":"Appjam+", "TeacherName": "Johnnie Preece", "SchoolName":"Irvine Intermediate"}
Creates a locked tab in the most recent timestamp under the matches tab under the specified program.
Locked instructors remain in the matched institution when resorting.
Returns true if successful lock
Returns false if unsuccessful lock and no information stored
'''
@app.route('/lockinstructor', methods=['GET', 'POST'])
def lock_instructor():
    json_input = request.get_json()
    program = json_input['Program']
    teacher_name = json_input['TeacherName']
    school_name = json_input['SchoolName']

    locked_instructor = api.manageinstructors.lock_instructor(program, teacher_name, school_name)
    
    return jsonify(locked_instructor)

'''
Access by url/unlockinstructor.
POST request with json object in this format
{"Program":"Appjam+", "TeacherName": "Johnnie Preece", "SchoolName":"Irvine Intermediate"}
Removes the instructor from the locked tab in the most recent timesamp under the matches tab under the specified program.
Returns true if successful unlock
Returns false if unsuccessful unlock and no information is removed
'''
@app.route('/unlockinstructor', methods=['GET', 'POST'])
def unlock_instructor():
    json_input = request.get_json()
    program = json_input['Program']
    teacher_name = json_input['TeacherName']
    school_name = json_input['SchoolName']

    unlocked_instructor = api.manageinstructors.unlock_instructor(program, teacher_name, school_name)

    return jsonify(unlocked_instructor)

@app.route('/resort', methods=['GET', 'POST'])
def resort():
    json_input = request.get_json()
    program = json_input['Program']

    resorted_match = api.fbresort.resort_matches(program)
    
    return jsonify(resorted_match)

'''
Access by url/removeinstructor
POST request with json object in this format
{ "Program" : "Appjam+", "SchoolName" : "Carr Intermediate", "TeacherName" : "Cindy Guzmsan" }
Creates a removed tab in the most recent match under the specified program.
Creates an available tab in the most recent match under the specified program and stores available institution.
Instructor has to be first removed from the institution to be able to move to an institution with empty slot.
'''
@app.route('/removeinstructor', methods=['GET','POST'])
def remove_instructor():
    json_input = request.get_json()
    program = json_input['Program']
    school_name = json_input['SchoolName']
    teacher_name = json_input['TeacherName']

    removed = api.manageinstructors.remove_instructor(program, school_name, teacher_name)

    return jsonify(removed)

'''
Access by url/showavailablemoves.
POST request with json object in this format
{ "Program" : "Appjam+", "TeacherName" : "Cindy Guzman" }
Returns a list of institutions the instructor can be moved to if successful
The instructor has to be a removed instructor
'''
@app.route('/showavailablemoves', methods=['GET','POST'])
def available_moves():
    json_input = request.get_json()
    program = json_input['Program']
    teacher_name = json_input['TeacherName']

    school_options = api.manageinstructors.available_moves(program, teacher_name)
    
    return jsonify(school_options)

'''
Access by url/moveinstructor
POST request with json object in this format
{ "Program" : "Appjam+", "SchoolName" : "Carr Intermediate", "TeacherName": "Cindy Guzman" }
Returns true if successful move.
Has to select one of the institutions shown in the showavailablemoves response.
Instructor is removed from the Removed tab.
Instructor is moved to the selected institution.
If there are no more spaces in the institution left it is removed from the Available tab.
'''
@app.route('/moveinstructor', methods=['GET', 'POST'])
def move_instructor():
    json_input = request.get_json()
    program = json_input['Program']
    to_school = json_input['SchoolName']
    teacher = json_input['TeacherName']

    move_result = api.manageinstructors.move_instructor(program, to_school, teacher)

    return jsonify(move_result)


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))