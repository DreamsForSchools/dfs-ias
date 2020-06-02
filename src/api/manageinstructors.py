import pyrebase
import api.dfsapi

def lock_instructor(program:str, teacher:str, school:str):
    db = api.dfsapi.get_db()

    timestamps = db.child(program).child("matches").shallow().get()

    if timestamps.val() != None:
        latest = max(timestamps.val())

        teachers = db.child(program).child("matches").child(latest).child(school).shallow().get()

        if teachers.val() != None and teacher in teachers.val():
            db.child(program).child("matches").child(latest).child(school).child(teacher).update({"Locked":True})
            info = db.child(program).child("matches").child(latest).child(school).child(teacher).get()
            db.child(program).child("matches").child(latest).child("Locked").child(school).child(teacher).set(info.val())

            return info.val()
    
    return False

def unlock_instructor(program:str, teacher:str, school:str):
    db = api.dfsapi.get_db()

    timestamps = db.child(program).child("matches").shallow().get()

    if timestamps.val() != None:
        latest = max(timestamps.val())
        
        locked_teachers = db.child(program).child("matches").child(latest).child("Locked").child(school).shallow().get()

        if locked_teachers.val() != None and teacher in locked_teachers.val():
            db.child(program).child("matches").child(latest).child(school).child(teacher).update({"Locked":False})
            db.child(program).child("matches").child(latest).child("Locked").child(school).child(teacher).remove()
            return True
    return False

def remove_instructor(program:str, school:str, teacher:str):
    db = api.dfsapi.get_db()

    valid_program = db.child(program).get()

    if valid_program.val() != None:

        timestamps = db.child(program).child("matches").shallow().get()
        latest = max(timestamps.val())

        result = db.child(program).child("matches").child(latest).child(school).child(teacher).get()

        if result.val() != None:
            available_school = db.child(program).child("matches").child(latest).child("Available").child(school).get()

            if available_school.val() == None:
                school_info = {}
                school_info["Name"] = result.val()["SchoolName"]
                school_info["Address"] = result.val()["SchoolAddress"]
                school_info["County"] = result.val()["SchoolCounty"]
                school_info["Instructors"] = 1
                school_info["Schedule"] = result.val()["SchoolSchedule"]
                db.child(program).child("matches").child(latest).child("Available").child(school).set(school_info)
            elif int(available_school.val()["Instructors"]) <= result.val()["Instructors"]:
                instructors = available_school.val()["Instructors"]
                new_instructors = int(instructors) + 1
                db.child(program).child("matches").child(latest).child("Available").child(school).update({"Instructors":new_instructors})

            teacher_info = {}
            teacher_info["Name"] = result.val()["TeacherName"]
            teacher_info["Car"] = result.val()["Car"]
            teacher_info["Ethnicity"] = result.val()["Ethnicity"]
            teacher_info["Languages"] = result.val()["Languages"]
            teacher_info["Locked"] = result.val()["Locked"]
            teacher_info["MultipleDays"] = result.val()["MultipleDays"]
            teacher_info["PreviousMentor"] = result.val()["PreviousMentor"]
            teacher_info["Region"] = result.val()["Region"]
            teacher_info["Schedule"] = result.val()["TeacherSchedule"]
            teacher_info["University"] = result.val()["University"]
            teacher_info["Year"] = result.val()["Year"]
            teacher_info["ShirtSize"] = result.val()["ShirtSize"]

            db.child(program).child("matches").child(latest).child("Removed").child(teacher).set(teacher_info)    
            db.child(program).child("matches").child(latest).child(school).child(teacher).remove()

def available_moves(program:str,school:str,teacher:str):
    print(program, teacher, school)