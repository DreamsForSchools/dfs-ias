#New file deprecates fbresort, fbstoresort, and iassorter.
from datetime import datetime as dt
import pyrebase
import dfsapi
import heapq as qu
from dfsgmap import distance_between
from collections import defaultdict

def optimal_sort(schools_data: dict, instructors_data: dict, distance_data: dict, program: str):
    #Conducting an optimal sort of instructor/school pairings based on program specified.
    
    # Get all schools that host the program
    schools_in_program = set()
    for key, data in schools_data.items():
        if program in data["programs"]:
            schools_in_program.add(key)
    
    # Initialize response variable
    response = defaultdict(list)

    # Start sort loop
    for school in schools_in_program:
        # Find match for school
        cap = int(schools_data[school]["number_of_instructors"]) # Capacity
        iqueue = [] # Used to gather top n choices
        # Construct score for instructor-school pair
        for instr in instructors_data:
            instr_score = 0
            # instr_score += next_heuristic_here
            valid,match_dicationary = check_availability( instructors_data[instr]["schedule"], schools_data[school]["programs"][program]) 
            if valid == False: continue 
            instr_score += instructor_program_preference_heuristic(program, instructors_data[instr])
            instr_score += distance_heuristic(instructors_data[instr]['region'][0], distance_data[school])
            qu.heappush(iqueue, (instr_score, instr))
        
        # Apply school with list
        print("Data to be chosen from:", iqueue)
        instr_choices = qu.nsmallest(cap, iqueue)
        # TODO remove instr_choices from being used again
        response[school] = [x[1] for x in instr_choices]
    return response


#(true, {day:[(start, end), (start, end)]})  #(start,end) is school's time slot that was encompassed by the instructor
#sample output: 
#(True, defaultdict(<class 'list'>, {'Monday': [[(datetime.datetime(1900, 1, 1, 9, 30), datetime.datetime(1900, 1, 1, 13, 30))]]}))
def check_availability(instructor_schedule: dict, school_schedule: dict) -> (bool, list):
    availability = 0
    match_dicationary = defaultdict(list)
    for day, time_slots_list in instructor_schedule.items():
        day_list = [] #will contain all the time slots of school programs that can be taught by an instructor
        for inst_time_dic in time_slots_list:
            day_list.extend(time_matched(inst_time_dic, school_schedule[day]))
        if day_list:
            match_dicationary[day].extend(day_list)
        availability += len(day_list)
    return (availability > 0, match_dicationary)
             
def time_matched(inst_time: dict, school_time_list: list) -> list:
    return_list = [] #this will contain all the matched slots for a particular day
    dt_inst_begin = dt.strptime(inst_time["start"], '%H:%M')
    dt_inst_end   = dt.strptime(inst_time["end"],   '%H:%M')
     
    for school_time_dic in school_time_list:
        dt_school_begin = dt.strptime(school_time_dic["start"], '%H:%M')
        dt_school_end   = dt.strptime(school_time_dic["end"], '%H:%M')
        if (dt_inst_begin <= dt_school_begin and  dt_inst_end >= dt_school_end):
            return_list.append((dt_school_begin, dt_school_end))
    return return_list

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
    normalized = BASE*(distance / max_dist)
    print("Raw dist:", distance)
    print("Normalized dist:", normalized)
    print()
    return normalized

def optimal_resort(locked_instructors: dict, instructors: list, schools: list):
    pass

if __name__ == "__main__":
    # This __main__ simulates a call from app.py

    season = "Fall2020"
    program = "Appjam"

    db = dfsapi.get_db()
    # Get all schools
    schools_data = db.child(season).child("schools").get().val()
    # Get all instructors
    instructors_data = db.child(season).child("instructors").get().val()

    distance_data = dict()
    region_set = {instructors_data[instr]['region'][0] for instr in instructors_data}
    for school in schools_data:
        distance_data[school] = distance_between(list(region_set), schools_data[school]['address'])

    print(optimal_sort(schools_data, instructors_data, distance_data, program))