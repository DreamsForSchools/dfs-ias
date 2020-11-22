#New file deprecates fbresort, fbstoresort, and iassorter.
from datetime import datetime as dt
import pyrebase
import dfsapi
import heapq as qu
from collections import defaultdict

def optimal_sort(season: str, program: str):
    #Conducting an optimal sort of instructor/school pairings based on program specified.

    db = dfsapi.get_db()
    
    # Get all schools
    schools_data = db.child(season).child("schools").get().val()
    schools_in_program = set()
    for key, data in schools_data.items():
        if program in data["programs"]:
            schools_in_program.add(key)
    
    # Get all instructors
    instructors_data = db.child(season).child("instructors").get().val()
    # instructors_data = sorted(instructors_data, key = lambda instructor : instructor_program_preference_heuristic(program, instructors_data[instructor]))
    
    # Initialize response variable
    response = defaultdict(list)

    # Start sort loop
    # instructors_idx = 0
    for school in schools_in_program:
        # Find match for school
        cap = int(schools_data[school]["number_of_instructors"]) # Capacity
        iqueue = [] # Used to gather top n choices

        # Load distance data
        # Modeled in a way to reduce calls to GoogleMaps api
        # distance_data = distance_heuristic(school, instructors_data)
        # instructor: distance_score

        # Construct score for instructor-school pair
        for instr in instructors_data:
            instr_score = 0

            instr_score += instructor_program_preference_heuristic(program, instructors_data[instr])
            # instr_score += distance_data[instr]

            qu.heappush(iqueue, (instr_score, instr))
        
        # Apply school with list
        instr_choices = qu.nsmallest(cap, iqueue)
        # remove instr_choices from being used again
        response[school] = [x[1] for x in instr_choices]

        # for _ in range(instructors_idx, cap):
        #     if instructors_idx >= len(instructors_data):
        #         return response #terminate early as no instructors left.
        #     response[school].append(instructors_data[instructors_idx])
        #     instructors_idx += 1
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

def distance_heuristic(school: str, instructors: dict):
    print("DH")
    print(school)
    print(instructors)

    print(instructors['I1'])

def optimal_resort(locked_instructors: dict, instructors: list, schools: list):
    pass

if __name__ == "__main__":
    print(optimal_sort("Fall2020", "Appjam"))