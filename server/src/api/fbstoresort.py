import pyrebase
from collections import defaultdict
import calendar
import time

import api.dfsapi
import api.iassorter
import api.fbread
from api.match import Match

def upload_matches(program:str):
	instructors = api.fbread.read_instructors(program)
	institutions = api.fbread.read_institutions(program)

	if instructors == False:
		return False
	if institutions == False:
		return False

	result = api.iassorter.sort(instructors, institutions)

	timestamp = str(calendar.timegm(time.gmtime()))
	db = api.dfsapi.get_db()

	keys = db.child(program).child("matches").shallow().get()
	if keys.val() != None:
		db_length = len(keys.val())
		if db_length > 10:
			oldest = min(keys.val())
			db.child(program).child("matches").child(oldest).remove()
			print("Here")		

	json_matches = defaultdict(list)

	for school in result:
		for match in result[school]:
			match_dict = match_to_dict(match)
			json_matches[school].append(match_dict)
			db.child(program).child("matches").child(timestamp).child(school).child(match.teacher_name).set(match_dict)

	return json_matches

'''
def match_to_school_dict(match : Match) -> dict:
	school_dict = {
		"SchoolName" : match.school_name,
		"SchoolAddress" : match.school_address,
		"SchoolCounty" : match.school_county,
		"SchoolInstructors" : match.instructors,
		"SchoolSchedule" : match.school_schedule
		}
	return school_dict


def match_to_teacher_dict(match:Match) -> dict:
	teacher_dict = {
		"Name" : match.teacher_name,
		"Gender" : match.gender,
		"Ethnicity" : match.ethnicity,
		"Region" : match.region, 
		"University" : match.university,
		"Year" : match.year, 
		"PreviousMentor" : match.previous_mentor,
		"TeacherSchedule" : match.teacher_schedule,
		"Car" : match.car,
		"Languages" : match.languages, 
		"ShirtSize" : match.shirtsize,
		"MultipleDays" : match.multiple_days,
	}
	return teacher_dict
'''

def match_to_dict(match : Match) -> dict:
	match_dict = {"TeacherName" : match.teacher_name,
		"SchoolName" : match.school_name, 
		"Region" : match.region, 
		"PreviousMentor" : match.previous_mentor, 
		"Car" : match.car,
		"Languages" : match.languages, 
		"MultipleDays" : match.multiple_days, 
		"Schedule" : match.schedule, 
		"Locked" : match.locked, 
		"Instructors" : match.instructors, 
		"Gender" : match.gender, 
		"University" : match.university,
		"Year" : match.year, 
		"Ethnicity" : match.ethnicity,
		"SchoolAddress" : match.school_address,
		"SchoolCounty" : match.school_county,
		"TeacherSchedule" : match.teacher_schedule,
		"ShirtSize" : match.shirtsize
	}
	return match_dict

