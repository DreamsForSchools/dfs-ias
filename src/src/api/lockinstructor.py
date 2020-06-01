import pyrebase
import api.dfsapi

def lock_instructor(program:str, teacher:str, school:str):
    db = api.dfsapi.get_db()

    timestamps = db.child(program).child("matches").shallow().get()
    latest = max(timestamps.val())

    teachers = db.child(program).child("matches").child(latest).child(school).get()
    if teacher in teachers.val():
        db.child(program).child("matches").child(latest).child(school).child(teacher).update({"Locked":True})
        info = db.child(program).child("matches").child(latest).child(school).child(teacher).get()
        db.child(program).child("matches").child(latest).child("Locked").child(school).child(teacher).set(info.val())

        

