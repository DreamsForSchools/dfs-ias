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

	data = db.child(season).child("schools").child(school["Name"]).get()
	if data.val():	raise KeyExists("dfs-ias/{s}/schools/{n}".format(s=season, n=school["Name"]))

	# Set everything
	db.child(season).child("schools").child(school["Name"]).update(school)

'''
Uploads instructor to the firebase database
under the specified season and instructor based on the 
information provided in the json object.
'''
def upload_instructor(instructor: dict):
	db = dfsapi.get_db()

	season = instructor["Season"] 
	del instructor["Season"]

	try:
		pk = dbtools.get_instructor_key(instructor)
	except KeyError as err:
		print("pk not valid:", err)
		return
	
	data = db.child(season).child("instructors").child(pk).get()
	if data.val():  raise KeyExists("dfs-ias/{s}/instructors/{i}".format(s=season, i=pk))
	
	db.child(season).child("instructors").child(pk).update(instructor)

'''
Uploads program to the firebase database
under the specified season and program based on the 
information provided in the json object.
'''
def upload_program(program: dict):
	db = dfsapi.get_db()

	season = program["Season"] 
	del program["Season"]

	data = db.child(season).child("programs").child(program["name"]).get()
	if data.val(): raise KeyExists("dfs-ias/{s}/programs/{n}".format(s=season, n=program["name"]))

	db.child(season).child("programs").child(program["name"]).update(program)

if __name__ == "__main__":
	s = {
		"name": "school3",
		"address": "123 street", 
		"is_virtual": True,
		"programs": ["P1", "P3"],
		"special_language_request": ["eng", "vie"],
		"number_of_instructors": 0,
		"program_time_flexibility": False
	}

	p = {
		"name": "AJ2",
		"assigned_institutions": [{
			"SCH2": [{"instructor name": {"locked": True}}]
		}]
	}

	i = {
        "name": "Thornton",
        "major": "computer science",
		"university": "university of california irvine"
    }
	upload_instructor(i)
