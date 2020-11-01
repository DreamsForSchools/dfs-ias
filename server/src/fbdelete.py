# import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict
from exceptions import KeyNotFoundError

def delete_instructor(season: str, instructor: dict):
    db = dfsapi.get_db()
    # pk = teacher["Name"] + "," + teacher["Major"] + "," + teacher["University"]
    pk = dbtools.get_instructor_key(instructor)

    data = db.child(season).child("instructors").child(pk).get()
    if data.val() is None:  raise KeyNotFoundError("dfs-ias/{s}/instructors/{i}".format(s=season, i=pk))

    db.child(season).child("instructors").child(pk).remove()

def delete_school(season: str, school_key: str):
    db = dfsapi.get_db()
    
    data = db.child(season).child("schools").child(school_key).get()
    if data.val() is None:  raise KeyNotFoundError("dfs-ias/{s}/schools/{name}".format(s=season,name=school_key))

    db.child(season).child("schools").child(school_key).remove()

def delete_program(season: str, program:str):
    db = dfsapi.get_db()

    data = db.child(season).child("programs").child(program).get()
    if data.val() is None:  raise KeyNotFoundError("dfs-ias/{s}/programs/{p}".format(s=season, p=program))

    db.child(season).child("programs").child(program).remove()

if __name__ == "__main__":
    print("Beginning Tests")
    thor = {
        "name": "Thornton",
        "major": "computer science",
        "university": "university of california irvine"
    }
    try:
        # delete_school("fall2020", "school3")
        # delete_program("fall2020", "AJ2")
        delete_instructor("fall2020", thor)
    except KeyNotFoundError as err:
        print(err)
    print("Ending Tests")
