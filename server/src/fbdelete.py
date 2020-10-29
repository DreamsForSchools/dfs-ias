# import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict
from exceptions import KeyNotFoundError

def delete_instructor(teacher: dict):
    db = dfsapi.get_db()
    pk = teacher["Name"] + "," + teacher["Major"] + "," + teacher["University"]

    data = db.child(teacher["Season"]).child("Instructors").child(pk).get()
    if not data.val():  raise KeyNotFoundError("temp path")

    db.child(teacher["Season"]).child("Instructors").child(pk).remove()

def delete_program(program:dict):
    db = dfsapi.get_db()

    data = db.child("programs").child(program["Name"]).get()
    if not data.val():  raise KeyNotFoundError("temp path")

    db.child("programs").child(program["Name"]).remove()


def delete_school(season: str, school_key: str):
    db = dfsapi.get_db()
    
    data = db.child(season).child("schools").child(school_key).get()
    if not data.val():  raise KeyNotFoundError("dfs-ias/{s}/schools/{name}".format(s=season,name=school_key))

    db.child(season).child("schools").child(school_key).remove()

if __name__ == "__main__":
    print("Beginning Tests")
    try:
        delete_school("fall2020", "bad school")
    except KeyNotFoundError as err:
        print(err)
    print("Ending Tests")
