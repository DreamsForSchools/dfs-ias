# import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict
from exceptions import KeyNotFoundError

def delete_instructor(season: str, instructor: dict):
    db = dfsapi.get_db()
    pk = dbtools.get_instructor_key(instructor)

    instr_data = db.child(season).child("instructors").child(pk).get()
    if instr_data.val() is None:  raise KeyNotFoundError("dfs-ias/{s}/instructors/{i}".format(s=season, i=pk))
    instr_data = instr_data.val()

    
    for s_str in instr_data["schools"]:
        dbtools.decriment_instructor_count(db, season, s_str)
        dbtools.remove_instructor_from_programs(db, season, s_str, pk)

    db.child(season).child("instructors").child(pk).remove()

def delete_school(season: str, school_key: str):
    db = dfsapi.get_db()
    
    data = db.child(season).child("schools").child(school_key).get()
    if data.val() is None:  raise KeyNotFoundError("dfs-ias/{s}/schools/{name}".format(s=season,name=school_key))

    dbtools.remove_school_from_instructors(db, season, school_key)
    dbtools.remove_school_from_programs(db, season, school_key)

    db.child(season).child("schools").child(school_key).remove()

def delete_program(season: str, program:str):
    db = dfsapi.get_db()

    data = db.child(season).child("programs").child(program).get()
    if data.val() is None:  raise KeyNotFoundError("dfs-ias/{s}/programs/{p}".format(s=season, p=program))

    dbtools.remove_program_from_instructors(db, season, program)
    dbtools.remove_program_from_schools(db, season, program)

    db.child(season).child("programs").child(program).remove()



if __name__ == "__main__":
    thor = {
        "name": "Thornton",
        "major": "computer science",
        "university": "university of california irvine"
    }
    try:
        delete_school("fall2020", "lynbrook high school")
        # delete_program("fall2020", "Appjam")
        # delete_instructor("fall2020", thor)
    except KeyNotFoundError as err:
        print(err)