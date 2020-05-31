import pyrebase
from collections import defaultdict

import dfsapi
import iassorter
import fbread
import calendar
import time
from match import Match

def upload_matches(program:str):

	instructors = fbread.read_instructors(program)
	institutions = fbread.read_institutions(program)

	result = iassorter.sort(instructors, institutions)

	timestamp = str(calendar.timegm(time.gmtime()))

	db = dfsapi.get_db()

	json_matches = defaultdict(list)

	for school in result:
		for match in result[school]:
			match_dict = match_to_dict(match)
			json_matches[school].append(match_dict)
			db.child(program).child("matches").child(timestamp).child(school).child(match.teacher_name).set(match_dict)

	return json_matches


def match_to_dict(match : Match) -> dict:
	match_dict = {"TeacherName" : match.teacher_name,
		"SchoolName" : match.school_name,
		"Region" : match.region,
		"PreviousMentor" : match.previous_mentor,
		"Car" : match.car,
		"Languages" : match.languages,
		"MultipleDays" : match.multiple_days,
		"Schedule" : match.schedule,
		"Locked" : match.locked
	}
	return match_dict
