from flask import Flask, jsonify, request
import api.fbstoresort
import api.shirtsize
import api.lockinstructor
import api.unlockinstructor
import api.fbresort

app = Flask(__name__)

@app.route('/sort', methods=['GET','POST'])
def sort():
    sortparams = request.get_json()
    program = sortparams['Program']

    matches = api.fbstoresort.upload_matches(program)

    return jsonify(matches)

@app.route('/shirts', methods=['GET', 'POST'])
def shirts():
    program = request.get_json()
    shirts = api.shirtsize.upload_shirtsize(program['Program'])
    return jsonify(shirts)

@app.route('/lockinstructor', methods=['GET', 'POST'])
def lock_instructor():
    json_input = request.get_json()
    program = json_input['Program']
    teacher_name = json_input['TeacherName']
    school_name = json_input['SchoolName']

    api.lockinstructor.lock_instructor(program, teacher_name, school_name)
    
    return 'Done', 201

@app.route('/unlockinstructor', methods=['GET', 'POST'])
def unlock_instructor():
    json_input = request.get_json()
    program = json_input['Program']
    teacher_name = json_input['TeacherName']
    school_name = json_input['SchoolName']

    api.unlockinstructor.unlock_instructor(program, teacher_name, school_name)

    return 'Done', 201

@app.route('/resort', methods=['GET', 'POST'])
def resort():
    json_input = request.get_json()
    program = json_input['Program']

    resorted_match = api.fbresort.resort_matches(program)
    
    return 'Done', 201

@app.route('/removeinstructor', methods=['GET', 'POST'])
def remove_instructor():
    json_input = request.get_json()
    program = json_input['Program']
    school_name = json_input['SchoolName']
    teacher_name = json_input['TeacherName']

    

    return 'Done', 201


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0',port=int(os.environ.get('PORT', 8080)))