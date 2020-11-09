#DEPRECATED REMOVE.
import pyrebase
import dfsapi
from match import Match
import iassorter
import calendar
import time

from collections import defaultdict

def resort_matches(program:str):
    fblocked = get_locked_instructors(program)

    if fblocked == False:
        return False

    if fblocked != None:
        locked = get_locked_matches(fblocked)
        print("Locked: " + str(locked))
        print("Program: " + program)
        result = iassorter.resort(locked, program)
        print("FBRESORT RESULT: ")
        print_result(result)
        db = dfsapi.get_db()
        timestamps = db.child(program).child("matches").shallow().get()
        latest = max(timestamps.val())
        print("LATEST TIMESTAMP VALUE: " + str(latest))
        timestamp = str(calendar.timegm(time.gmtime()))
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
                #db.child(program).child("matches").child(timestamp).child("Locked").child(school).child(match.teacher_name).set(fblocked)
        for institution in locked:
            for instructor in locked[institution]:
                print("INSTRUCTOR: ")
                db.child(program).child("matches").child(latest).child("Locked").child(institution).child(instructor.teacher_name).update({"Locked":True})
                info = db.child(program).child("matches").child(latest).child(institution).child(instructor.teacher_name).get()
                db.child(program).child("matches").child(timestamp).child("Locked").child(institution).child(instructor.teacher_name).set(info.val())
        return json_matches
        #return fblocked
    else:
        return False

def print_result(result : dict):
    for school in result:
        print(school, ':', end =' ')
        for match in result[school]:
            print(match.teacher_name + ",", end=' ')
        print("\n")

def get_locked_instructors(program:str):
    db = dfsapi.get_db()
    keys = db.child(program).child("matches").shallow().get()

    if keys.val() != None:
        recentdb = max(keys.val())
        instructors = db.child(program).child("matches").child(recentdb).child("Locked").get()
        if instructors.val() != None:
            return instructors.val()

    return False

def get_locked_matches(fblocked:dict):
    locked = defaultdict(list)

    for school in fblocked:
        locked_num = len(fblocked[school])
        for teacher, info in fblocked[school].items():
            instructors = int(info['Instructors']) - locked_num

            locked[school].append(Match(
                info['TeacherName'],
                info['SchoolName'],
                info['Region'],
                info['PreviousMentor'],
                info['Car'],
                info['Languages'],
                info['MultipleDays'],
                instructors,
                info['ShirtSize'],
                info['Gender'],
                info['University'],
                info['Year'],
                info['Ethnicity'],
                info['SchoolAddress'],
                info['SchoolCounty'],
                info['Schedule'],
                info['TeacherSchedule'],
                info['Locked']
            ))
    return locked

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
