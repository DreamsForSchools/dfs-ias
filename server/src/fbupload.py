import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict
from exceptions import KeyExists

'''
Uploads institution to the firebase database
under the specified program with the given
json object that contains information 
about the institution.
'''
def upload_institutions(school:dict):
	db = dfsapi.get_db()

	Mon = dbtools.minute_range(school["Monday"])
	Tue = dbtools.minute_range(school["Tuesday"])
	Wed = dbtools.minute_range(school["Wednesday"])
	Thurs = dbtools.minute_range(school["Thursday"])
	Fri = dbtools.minute_range(school["Friday"])

	Schedule = defaultdict(list)
		
	if Mon != None:
		Schedule[1].append(Mon)
	if Tue != None:
		Schedule[2].append(Tue)
	if Wed != None:
		Schedule[3].append(Wed)
	if Thurs != None:
		Schedule[4].append(Thurs)
	if Fri != None:
		Schedule[5].append(Fri)
	
	school_info = {
		"Name" : school["Name"], 
		"Address" : school["Address"], 
		"County" : school["County"], 
		"Instructors" : school["Instructors"], 
		"Schedule" : Schedule
	}
	
	for p in school['Program']:
		if school['New']:
			latest = str(calendar.timegm(time.gmtime()))
			db.child(p).child("institutions").child(latest).child(school_info['Name']).set(school_info)
		else:
			timestamps = db.child(p).child("institutions").shallow().get()
			if timestamps.val() != None:
				latest = max(timestamps.val())
				db.child(p).child("institutions").child(latest).child(school_info['Name']).set(school_info)
	db.child("institutions").child(school_info['Name']).set(school_info)

	for p in school['Program']:
		keys = db.child(p).child("institutions").shallow().get()
		if keys.val() != None:
			db_length = len(keys.val())
			if db_length > 10:
				oldest = min(keys.val())
				db.child(p).child("institutions").child(oldest).remove()


def upload_school(season: str, school: dict):
	db = dfsapi.get_db()

	data = db.child(season).child("schools").child(school["name"]).get()
	if data.val():	raise KeyExists("dfs-ias/{s}/schools/{n}".format(s=season, n=school["name"]))

	# Set everything
	db.child(season).child("schools").child(school["name"]).update(school)

'''
Uploads instructor to the firebase database
under the specified program based on the 
information provided in the json object.
'''
def upload_instructors(teacher:dict):

	Mon = dbtools.minute_range(teacher["Monday"])
	Tue = dbtools.minute_range(teacher["Tuesday"])
	Wed = dbtools.minute_range(teacher["Wednesday"])
	Thurs = dbtools.minute_range(teacher["Thursday"])
	Fri = dbtools.minute_range(teacher["Friday"])

	Schedule = defaultdict(list)
		
	if Mon != None:
		Schedule[1].append(Mon)
	if Tue != None:
		Schedule[2].append(Tue)
	if Wed != None:
		Schedule[3].append(Wed)
	if Thurs != None:
		Schedule[4].append(Thurs)
	if Fri != None:
		Schedule[5].append(Fri)

	teacher_info = {
		"Name" : teacher["Name"], 
		"Gender" : teacher["Gender"], 
		"Ethnicity" : teacher["Ethnicity"], 
		"Region" : teacher["Region"], 
		"University" : teacher["University"], 
		"Year" : teacher["Year"], 
		"PreviousMentor" : teacher["PreviousMentor"], 
		"Car" : teacher["Car"], 
		"Languages" : teacher["Languages"], 
		"ShirtSize" : teacher["ShirtSize"], 
		"MultipleDays" : teacher["MultipleDays"],
		"Schedule" : Schedule
	}

	db = dfsapi.get_db()
	
	for p in teacher['Program']:
		if teacher['New']:
			latest = str(calendar.timegm(time.gmtime()))
			db.child(p).child("instructors").child(latest).child(teacher_info['Name']).set(teacher_info)
		else:
			timestamps = db.child(p).child("instructors").shallow().get()
			if timestamps.val() != None:
				latest = max(timestamps.val())
				db.child(p).child("instructors").child(latest).child(teacher_info['Name']).set(teacher_info)
		
		db.child("instructors").child(teacher_info['Name']).set(teacher_info)

	for p in teacher['Program']:
		keys = db.child(p).child("instructors").shallow().get()
		if keys.val() != None:
			db_length = len(keys.val())
			if db_length > 10:
				oldest = min(keys.val())
				db.child(p).child("instructors").child(oldest).remove()
	return

def upload_program(season: str, program: dict):
	db = dfsapi.get_db()

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
	# upload_school("fall2020", s)
	# upload_program("fall2020", p)