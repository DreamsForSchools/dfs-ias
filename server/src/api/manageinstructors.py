import pyrebase
from collections import defaultdict
import dfsapi
from instructor import Instructor
from institution import Institution
from iassorter import *
import fbupload

'''
Calls upload instructor function.
'''
def upload_instructor(teacher:dict):
    fbupload.upload_instructors(teacher)
    return

'''
Calls upload institution function.
'''
def upload_institution(school:dict):
    fbupload.upload_institutions(school)
    return

'''
Creates a locked tab with information about locked instructors.
Modifies the locked attribute of an instructor to true.
'''
def lock_instructor(program:str, teacher:str, school:str):
    db = dfsapi.get_db()

    timestamps = db.child(program).child("matches").shallow().get()
    print("Timestamps: " + str(timestamps))
    print("Timestamps Value: " + str(timestamps.val()))

    if timestamps.val() != None:
        latest = max(timestamps.val())

        teachers = db.child(program).child("matches").child(latest).child(school).shallow().get()

        if teachers.val() != None and teacher in teachers.val():
            db.child(program).child("matches").child(latest).child(school).child(teacher).update({"Locked":True})
            info = db.child(program).child("matches").child(latest).child(school).child(teacher).get()
            db.child(program).child("matches").child(latest).child("Locked").child(school).child(teacher).set(info.val())

            return info.val()

    return False

'''
Removed the instructor in the locked tab.
Changes the lock attribute of the instructor
to false.
'''
def unlock_instructor(program:str, teacher:str, school:str):
    db = dfsapi.get_db()

    timestamps = db.child(program).child("matches").shallow().get()
    print("Timestamps: " + str(timestamps))
    print("Timestamps Value: " + str(timestamps.val()))
    #for key,val in timestamps.items():
        #print("Key: " + str(key) + " Value: " + str(val))

    if timestamps.val() != None:
        latest = max(timestamps.val())
        print("Timestamp Value: " + str(latest))

        locked_teachers = db.child(program).child("matches").child(latest).child("Locked").child(school).shallow().get()
        print("Locked Teachers Value: " + str(locked_teachers.val()))

        if locked_teachers.val() != None and teacher in locked_teachers.val():
            db.child(program).child("matches").child(latest).child(school).child(teacher).update({"Locked":False})
            db.child(program).child("matches").child(latest).child("Locked").child(school).child(teacher).remove()
            return True
    return False

'''
Removes instructor from the matches.
Adds instructor in the removed tab.
Adds institution with available space in the Available tab.
'''
def remove_instructor(program:str, school:str, teacher:str):
    db = dfsapi.get_db()
    valid_program = db.child(program).get()
    if valid_program.val() != None:
        timestamps = db.child(program).child("matches").shallow().get()
        latest = max(timestamps.val())
        result = db.child(program).child("matches").child(latest).child(school).child(teacher).get().val()
        if result != None:
            available_school = db.child(program).child("matches").child(latest).child("Available").child(school).get().val()

            if available_school == None:
                school_info = {}
                school_info["Name"] = result["SchoolName"]
                school_info["Address"] = result["SchoolAddress"]
                school_info["County"] = result["SchoolCounty"]
                school_info["Instructors"] = 1
                school_info["Schedule"] = result["Schedule"]
                db.child(program).child("matches").child(latest).child("Available").child(school).set(school_info)
            elif int(available_school["Instructors"]) <= result["Instructors"]:
                instructors = available_school["Instructors"]
                new_instructors = int(instructors) + 1
                db.child(program).child("matches").child(latest).child("Available").child(school).update({"Instructors":new_instructors})

            teacher_info = {}
            teacher_info["Name"] = result["TeacherName"]
            teacher_info["Car"] = result["Car"]
            teacher_info["Ethnicity"] = result["Ethnicity"]
            teacher_info["Gender"] = result["Gender"]
            teacher_info["Languages"] = result["Languages"]
            teacher_info["Locked"] = result["Locked"]
            teacher_info["MultipleDays"] = result["MultipleDays"]
            teacher_info["PreviousMentor"] = result["PreviousMentor"]
            teacher_info["Region"] = result["Region"]
            teacher_info["Schedule"] = result["TeacherSchedule"]
            teacher_info["University"] = result["University"]
            teacher_info["Year"] = result["Year"]
            teacher_info["ShirtSize"] = result["ShirtSize"]

            db.child(program).child("matches").child(latest).child("Removed").child(teacher).set(teacher_info)
            db.child(program).child("matches").child(latest).child(school).child(teacher).remove()

            return True

    return False

'''
Moves the instructor to another institution.
'''
def move_instructor(program:str, to_school:str, teacher:str):
    db = dfsapi.get_db()
    valid_program = db.child(program).get()
    if valid_program.val() != None:
        timestamps = db.child(program).child("matches").shallow().get()
        latest = max(timestamps.val())
        removed_teacher = db.child(program).child("matches").child(latest).child("Removed").child(teacher).get().val()
        available_school = db.child(program).child("matches").child(latest).child("Available").child(to_school).get().val()
        existing_instructors = len(db.child(program).child("matches").child(latest).child(to_school).shallow().get().val())
        print("Here")
        print(existing_instructors)
        if removed_teacher != None and available_school != None:
            match_info = {
                "Car" : removed_teacher['Car'],
                "Ethnicity" : removed_teacher['Ethnicity'],
                "Gender" : removed_teacher['Gender'],
                "Instructors" : available_school['Instructors']+existing_instructors,
                "Languages" : removed_teacher['Languages'],
                "Locked" : removed_teacher['Locked'],
                "MultipleDays" : removed_teacher['MultipleDays'],
                "PreviousMentor" : removed_teacher['PreviousMentor'],
                "Region" : removed_teacher['Region'],
                "Schedule" : available_school['Schedule'],
                "SchoolAddress" : available_school['Address'],
                "SchoolCounty" : available_school['County'],
                "SchoolName" : available_school['Name'],
                "ShirtSize" : removed_teacher['ShirtSize'],
                "TeacherName" : removed_teacher['Name'],
                "TeacherSchedule" : removed_teacher['Schedule'],
                "University" : removed_teacher['University'],
                "Year" : removed_teacher['Year'],
            }

            db.child(program).child("matches").child(latest).child(to_school).child(teacher).set(match_info)
            db.child(program).child("matches").child(latest).child("Removed").child(teacher).remove()
            required_instructors = int(available_school["Instructors"]) - 1
            if required_instructors <= 0:
                db.child(program).child("matches").child(latest).child("Available").child(to_school).remove()
            else:
                db.child(program).child("matches").child(latest).child("Available").child(to_school).update({"Instructors":required_instructors})

            return True
    return False

'''
Displays the available schools the instructor can be moved to
'''
def available_moves(program:str,teacher:str):
    db = dfsapi.get_db()
    valid_program = db.child(program).get()
    if valid_program.val() != None:

        timestamps = db.child(program).child("matches")
        latest = max(timestamps.shallow().get().val())

        removed_instructor = db.child(program).child("matches").child(latest).child("Removed").child(teacher).get().val()
        available_schools = db.child(program).child("matches").child(latest).child("Available").get().val()

        if removed_instructor != None and available_schools != None:
            instructor = make_instructor(removed_instructor)
            institutions = make_institution_list(available_schools, program)

            possible_moves = match_schools_to_instructor(instructor, institutions)
            school_weights = make_weights_dict(possible_moves)

            school_options = find_best_match(possible_moves, school_weights)

            return school_options
    return False

'''
Makes an instructor object.
'''
def make_instructor(info:dict):
    return Instructor(
        info['Name'],
        info['Gender'],
        info['Ethnicity'],
        info['Region'],
        info['University'],
        info['Year'],
        info['PreviousMentor'],
        schedule_to_dict(info['Schedule']),
        info['Car'],
        info['Languages'],
        info['ShirtSize'],
        info['MultipleDays']
    )

'''
Makes a list of institution objects
'''
def make_institution_list(info:dict, program:str):
    institutions = list()

    for school in info:
        new_schedule = schedule_to_dict(info[school]['Schedule'])
        institutions.append(Institution(
            info[school]['Name'],
            info[school]['Address'],
            info[school]['County'],
            info[school]['Instructors'],
            new_schedule))

    return institutions

'''
Converts the schedule read from the firebase
database to dictionary with keys being the days
in integers and the values being the list of tuple
of time ranges
'''
def schedule_to_dict(schedule:list)->dict:
    schedule_dict = defaultdict(list)

    if type(schedule) != dict:
        for i in range(1,len(schedule)):
            if schedule[i] != None:
                for time in schedule[i]:
                    schedule_dict[i].append(tuple(time))
    else:
        for day in schedule:
            for time in schedule[day]:
                schedule_dict[int(day)].append(tuple(time))

    return schedule_dict

'''
Check the institutions that have matching schedule
and region with the instructor and create a list
of match objects.
'''
def match_schools_to_instructor(teacher:Instructor, schools:[Institution]) -> dict:
    possible_matches = defaultdict(list)

    for school in schools:
        sched_match = same_schedule_region(school,teacher)
        if sched_match != {}:
            possible_matches[teacher.name].append(
                Match(
                    teacher.name,
                    school.name,
                    teacher.region,
                    teacher.previousmentor,
                    teacher.car,
                    teacher.languages,
                    teacher.multipledays,
                    school.instructors,
                    teacher.shirtsize,
                    teacher.gender,
                    teacher.university,
                    teacher.year,
                    teacher.ethnicity,
                    school.address,
                    school.county,
                    sched_match,
                    teacher.schedule
                )
            )

    return possible_matches

'''
Create a dictionary of the institutions as keys
and integer as value.
'''
def make_weights_dict(possible_moves:dict) -> dict:
    school_weights = defaultdict(int)
    for teacher in possible_moves:
        for match in possible_moves[teacher]:
            school_weights[match.school_name] = 0

    return school_weights

'''
Based on the parameters of an instructor
increase the weight of the institution to
represent a better match with the instructor.
'''
def find_best_match(possible_moves:dict, school_weights:dict) -> dict:
    school_options = []
    for teacher in possible_moves:
        for match in possible_moves[teacher]:
            returner = match.previous_mentor
            car = match.car
            if returner.strip().lower() == "yes":
                school_weights[match.school_name] += 1
            if car.strip().lower() == "yes":
                school_weights[match.school_name] += 1

    sorted_weights = {k:v for k,v in sorted(school_weights.items(), key=lambda item: item[1])}

    for school in sorted_weights:
        school_options.append(school)

    return school_options


