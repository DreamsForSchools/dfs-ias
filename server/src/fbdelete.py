# import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict
from exceptions import KeyNotFoundError

def delete_instructor(season: str, instructor_key: str):
    db = dfsapi.get_db()

    instr_data = db.child(season).child("instructors").child(instructor_key).get()
    if instr_data.val() is None:  raise KeyNotFoundError("dfs-ias/{s}/instructors/{i}".format(s=season, i=pk))

    dbtools.remove_instructor_from_programs(db, season, instructor_key)
    db.child(season).child("instructors").child(instructor_key).remove()

def delete_school(season: str, school_key: str):
    db = dfsapi.get_db()

    data = db.child(season).child("schools").child(school_key).get()
    if data.val() is None:  raise KeyNotFoundError("dfs-ias/{s}/schools/{name}".format(s=season,name=school_key))

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
    try:
        #delete_program("spring2021", "AppjAm")
        # delete_program("fall2020", "Appjam")
        delete_instructor("spring2021", "-MLeXvdlqSdPYDnccgD-")
    except KeyNotFoundError as err:
        print(err)
