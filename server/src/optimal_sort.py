#New file deprecates fbresort, fbstoresort, and iassorter.
from datetime import datetime as dt
import pyrebase
import dfsapi
from collections import defaultdict

def optimal_sort(season: str, program: str):
    #Conducting an optimal sort of instructor/school pairings based on program specified.
    db = dfsapi.get_db()
    instructors_data = db.child(season).child("instructors").get().val()
    schools_data = db.child(season).child("schools").get().val()
    schools_in_program = set()
    for key, data in schools_data.items():
        if program in data["programs"]:
            schools_in_program.add(key)
    instructors_data = sorted(instructors_data, key = lambda instructor : instructor_program_preference_heuristic(program, instructors_data[instructor]))
    response = defaultdict(list)
    instructors_idx = 0
    for school in schools_in_program:
        cap = int(schools_data[school]["number_of_instructors"]) + instructors_idx
        for i in range(instructors_idx, cap):
            if instructors_idx >= len(instructors_data):
                return response #terminate early as no instructors left.
            response[school].append(instructors_data[instructors_idx])
            instructors_idx += 1
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

def optimal_resort(locked_instructors: dict, instructors: list, schools: list):
    pass

if __name__ == "__main__":
    print(optimal_sort("Fall2020", "Appjam"))
