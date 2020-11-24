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
            instr_score += instructor_program_preference_heuristic(program, instructors_data[instr])
            instr_score += distance_heuristic(instructors_data[instr]['region'][0], distance_data[school])

            qu.heappush(iqueue, (instr_score, instr))
        
        # Apply school with list
        print("Data to be chosen from:", iqueue)
        instr_choices = qu.nsmallest(cap, iqueue)
        # TODO remove instr_choices from being used again
        response[school] = [x[1] for x in instr_choices]

    return response

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