from flask import Blueprint, jsonify, request
import fbstoresort

main = Blueprint('main', __name__)

@main.route('/sort', methods=['GET','POST'])
def sort():
    sortparams = request.get_json()
    program = sortparams['Program']

    matches = fbstoresort.upload_matches(program)

    return jsonify(matches)
