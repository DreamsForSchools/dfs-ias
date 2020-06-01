import pyrebase
import api.dfsapi

def unlock_instructor(program:str, teacher:str, school:str):
    db = api.dfsapi.get_db()

    timestamps = db.child(program).child("matches").shallow().get()
    latest = max(timestamps.val())
    
    teachers = db.child(program).child("matches").child(latest).child(school).get()
    if teacher in teachers.val():
        db.child(program).child("matches").child(latest).child(school).child(teacher).update({"Locked":False})
        db.child(program).child("matches").child(latest).child("Locked").child(school).child(teacher).remove()


    

