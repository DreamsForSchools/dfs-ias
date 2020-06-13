import pyrebase
from collections import defaultdict
import calendar
import time

import dfsapi
import iassorter
import fbread
from match import Match

'''
Reads the instructors and institutions from the firebase database
in the most recent timestamp under the specified program.
Matches instructors to institutions and stores the matches
by creating a recent timestamp under the matches tab under the specified program.
'''
def upload_matches(program:str):
	instructors = fbread.read_instructors(program)
	institutions = fbread.read_institutions(program)

	if instructors == False:
		return False
	if institutions == False:
		return False

	result = iassorter.sort(instructors, institutions)

	timestamp = str(calendar.timegm(time.gmtime()))
	db = dfsapi.get_db()

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
			db.child(program).child("matches").child(timestamp).child(school).child(match.teacher_name).update({"Locked":False})

	return json_matches

'''
Converts match objects into a dictionary with information
of both the instructor and institution.
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

