# import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict


def delete_instructor(teacher: dict):
    db = dfsapi.get_db()
    pk = teacher["Name"] + "," + teacher["Major"] + "," + teacher["University"]
    db.child(teacher["Season"]).child("Instructors").child(pk).remove()

def delete_program(program:dict):
    db = dfsapi.get_db()
    db.child("Programs").child(program["Name"]).remove()

def delete_institution(season: str, inst_key: str):
    db = dfsapi.get_db()
    
    data = db.child(season).child("institutions").child(inst_key).get()
    if not data.val(): print("EXCEPTION HERE (Path not found)")

    db.child(season).child("institutions").child(inst_key).remove()

if __name__ == "__main__":
    print("Beginning Tests")
    delete_institution("fall2020", "Santa Teresa HS")
    print("Ending Tests")
