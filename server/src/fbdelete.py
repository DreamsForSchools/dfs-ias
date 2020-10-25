import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict

def delete_institution():
    pass

def delete_instructor(teacher: dict):
    db = dfsapi.get_db()
    pk = teacher["Name"] + "," + teacher["Major"] + "," + teacher["University"]
    db.child.(teacher["Season"]).child("Instructors").child(pk).remove()

def delete_program(program:dict):
    db = dfsapi.get_db()
    db.child.("Programs").child(program["Name"]).remove()
