import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict
from exceptions import KeyExists

'''
Uploads school to the firebase database
under the specified season and school with the given
json object that contains information
about the school.
'''
#def upload_school(season: str, school: dict):
def upload_school(school:dict):
	db = dfsapi.get_db()

	season = school["Season"]
	del school["Season"]

	# Set everything
	program_preference = {}
	school["programs"] = {k: 1 for k in school["programs"]}
	ret = db.child(season).child("schools").push(school)
	pk = ret["name"]
	# Add School to programs.
	if "programs" in school:
		programs_list = school["programs"]
		for program in programs_list:
			db.child(season).child("programs").child(program).child("assigned_schools").child(pk).set(1)
'''
Uploads instructor to the firebase database
under the specified season and instructor based on the
information provided in the json object.
'''
def upload_instructor(instructor: dict):
	db = dfsapi.get_db()

	season = instructor["Season"]
	del instructor["Season"]

	#Set everything
	instructor["programs"] = {k : i + 1 for i, k in enumerate(instructor["programs"])}
	ret = db.child(season).child("instructors").push(instructor)
	pk = ret["name"]
	if "programs" in instructor:
		programs_list = instructor["programs"]
		for program in programs_list:
			db.child(season).child("programs").child(program).child("assigned_instructors").child(pk).set(1)

'''
Uploads program to the firebase database
under the specified season and program based on the
information provided in the json object.
'''
def upload_program(program: dict):
	db = dfsapi.get_db()

	season = program["Season"]
	del program["Season"]

	db.child(season).child("programs").child(program["name"]).update(program)

if __name__ == "__main__":
	s = {
		"Name": "school3",
		"Season": "spring2021",
		"address": "123 street",
		"is_virtual": True,
		"programs": ["AppjAm", "Stupidjamp"],
		"special_language_request": ["eng", "vie"],
		"number_of_instructors": 0,
		"program_time_flexibility": False
	}

	p = {
		"name": "AJ2",
		"Season" : "spring2021",
		"assigned_institutions": [{
			"SCH2": [{"instructor name": {"locked": True}}]
		}]
	}

	i = {
        "name": "Thornton",
		"Season" : "spring2021",
        "major": "computer science",
		"university": "university of california irvine",
		"programs": ["AppjAm", "Stupidjamp"]
    }
	upload_instructor(i)
	upload_school(s)
