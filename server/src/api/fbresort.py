import pyrebase
import dfsapi
from match import Match
import iassorter

from collections import defaultdict

def resort_matches(program:str):
    fblocked = get_locked_instructors(program)

    if fblocked == False:
        return False

    if fblocked != None:
        locked = get_locked_matches(fblocked)
        iassorter.resort(locked, program)
        return fblocked
    else:
        return False

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