#New file deprecates fbresort, fbstoresort, and iassorter.
from datetime import datetime as dt
import pyrebase
import dfsapi
import heapq as qu
import json
from dfsgmap import distance_between
from collections import defaultdict
import random

def optimal_sort(schools_data: dict, instructors_data: dict, distance_data: dict, program: str):
    #Conducting an optimal sort of instructor/school pairings based on program specified.

    # Get all schools that host the program
    schools_in_program = set()
    for key, data in schools_data.items():
        if program in data["programs"]:
            schools_in_program.add(key)

    # Initialize response variable
    response = defaultdict(dict)

    # Start sort loop
    for school in schools_in_program:
        # Find match for school
        # cap = int(schools_data[school]["number_of_instructors"]) # Capacity
        cap = int(schools_data[school]["programs"][program]["number_of_instructors"])
        iqueue = [] # Used to gather top n choices
        # Construct score for instructor-school pair
        for instr in instructors_data:
            instr_score = 0
            # instr_score += next_heuristic_here
            #valid, match_dictionary = check_availability( instructors_data[instr]["schedule"], schools_data[school]["programs"][program])
            valid = check_availability( instructors_data[instr]["schedule"], schools_data[school]["programs"][program]) #This returns True only if a instructor is available for all the days (+ all the time slots in each day) for a school's program 
            if not valid: continue

            instr_score += instructor_program_preference_heuristic(program, instructors_data[instr])
            instr_score += distance_heuristic(instructors_data[instr]['region'][0], distance_data[school])
            #qu.heappush(iqueue, (instr_score, (instr, match_dictionary)))
            qu.heappush(iqueue, (instr_score, instr))
        # Apply school with list
        instr_choices = qu.nsmallest(cap, iqueue)

        # TODO remove instr_choices from being used again
        for x in instr_choices:
            #instr, m_dict = x[1]
            instr = x[1]

            if school not in response[program]:
                response[program][school] = dict()


            response[program][school][instr] = 1
        # response[program][school] = [x[1] for x in instr_choices]
    print("SORT: ")
    print(response)
    return dict(response)

def check_through_all_inst_time_slots(dt_school_begin: dt, dt_school_end: dt, inst_time_slots: list): 
    for inst_time_slot in inst_time_slots:
        dt_inst_begin = dt.strptime(inst_time_slot["start"], '%H:%M') 
        dt_inst_end   = dt.strptime(inst_time_slot["end"], '%H:%M')
        if dt_inst_begin <= dt_school_begin and  dt_inst_end >= dt_school_end:
            return True 
    return False

def check_instructor_avaialiabiltiy_for_this_day(day: str, school_time_slot_list : list, instructor_schedule: dict) -> bool:
    for sch_time_slot in school_time_slot_list:
        dt_school_begin = dt.strptime(sch_time_slot["start"], '%H:%M')
        dt_school_end   = dt.strptime(sch_time_slot["end"], '%H:%M')
        if check_through_all_inst_time_slots(dt_school_begin, dt_school_end, instructor_schedule[day]) == False: return False
    return True         

def check_availability(instructor_schedule: dict, school_schedule: dict) -> bool:
    for day, school_time_slots_list in school_schedule.items(): 
        if type(school_time_slots_list) != list: continue
        if check_instructor_avaialiabiltiy_for_this_day(day, school_time_slots_list, instructor_schedule) == False: return False
    return True

def instructor_program_preference_heuristic(program: str, instructor):
    BASE_OF_UNINTEREST = 10
    '''
    x = [1,2,3,4] - > 4
    y = [1] -> 2
    '''
    if program in instructor["programs"]:
        return instructor["programs"][program]
    return BASE_OF_UNINTEREST

def distance_heuristic(region: str, distance_data: dict):
    BASE = 10
    max_dist = max([v for v in distance_data.values()])

    distance = distance_data[region]
    if distance == -1:
        return BASE

    normalized = BASE*(distance / max_dist)
    return normalized

def optimal_resort(locked_dict: dict, schools_data: dict, instructors_data: dict, distance_data: dict, program: str):
    #Conducting an optimal sort of instructor/school pairings based on program specified.

    # Get all schools that host the program
    schools_in_program = set()
    for key, data in schools_data.items():
        if program in data["programs"]:
            schools_in_program.add(key)

    # Initialize response variable
    response = defaultdict(dict)

    # Start sort loop
    schools_in_program_list = list(schools_in_program)
    random.shuffle(schools_in_program_list)

    for school in schools_in_program:
        # Find match for school
        # cap = int(schools_data[school]["number_of_instructors"]) # Capacity
        cap = int(schools_data[school]["programs"][program]["number_of_instructors"])
        iqueue = [] # Used to gather top n choices
        # Construct score for instructor-school pair
        for instr in instructors_data:
            if program in locked_dict and school in locked_dict[program] and instr in locked_dict[program][school]:
                qu.heappush(iqueue, (0, instr))
                continue
            instr_score = 0
            # instr_score += next_heuristic_here
            #valid, match_dictionary = check_availability( instructors_data[instr]["schedule"], schools_data[school]["programs"][program])
            valid = check_availability( instructors_data[instr]["schedule"], schools_data[school]["programs"][program]) #This returns True only if a instructor is available for all the days (+ all the time slots in each day) for a school's program 
            if not valid: continue

            instr_score += random.randint(1,10)
            #instr_score += random_scale_instructor_program_preference_heuristic * instructor_program_preference_heuristic(program, instructors_data[instr])
            #instr_score += random_scale_distance_heuristic * distance_heuristic(instructors_data[instr]['region'][0], distance_data[school])
            #qu.heappush(iqueue, (instr_score, (instr, match_dictionary)))
            qu.heappush(iqueue, (instr_score, instr))
        # Apply school with list
        instr_choices = qu.nsmallest(cap, iqueue)

        # TODO remove instr_choices from being used again
        for x in instr_choices:
            #instr, m_dict = x[1]
            instr = x[1]

            if school not in response[program]:
                response[program][school] = dict()
            response[program][school][instr] = 1
            if school == "35439":
                print("Instructor: ", instr)
                print("Score: ", x[0])
    print("RESORT: ")
    print(response)
    return dict(response)

if __name__ == "__main__":

    season = "Fall 2020"
    program = "AppJam"

    db = dfsapi.get_db()
    # Get all schools
    schools_data = db.child(season).child("schools").get().val()
    # Get all instructors
    instructors_data = db.child(season).child("instructors").get().val()

    distance_data = dict()
    region_set = {instructors_data[instr]['region'][0] for instr in instructors_data}
    for school in schools_data:
        distance_data[school] = distance_between(list(region_set), schools_data[school]['address'])
    data = optimal_sort(schools_data, instructors_data, distance_data, program)