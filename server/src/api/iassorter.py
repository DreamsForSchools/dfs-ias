import random
from collections import defaultdict

from instructor import Instructor
from institution import Institution
from match import Match

import fbread

unlocked_dict = defaultdict(list)

def sort(instructors:list, institutions:list):

    result = defaultdict(list)

    for s in institutions:
        for t in instructors:
            sched_match = same_schedule_region(s, t)
            #print("Schedule Match: " + str(sched_match))
            if sched_match != {}:
                #print("Found a Schedule Match!")
                result[s.name].append(Match(t.name, s.name, t.region,
                    t.previousmentor, t.car, t.languages,
                    t.multipledays, s.instructors, t.shirtsize, t.gender, t.university, t.year, t.ethnicity, s.address, s.county, s.schedule, t.schedule))
            else:
                result[s.name].append(Match(t.name, s.name, t.region,
                    t.previousmentor, t.car, t.languages,
                    t.multipledays, s.instructors, t.shirtsize, t.gender, t.university, t.year, t.ethnicity, s.address, s.county, s.schedule, t.schedule))

    sortedDict = randInstructToSchool(result)
    print("THE RESULT: " + str(sortedDict))
    return sortedDict

def resort(locked_dict: dict, program: str):
    print("GOING THROUGH RESORT METHOD!!!")
    result = defaultdict(list)
    instructors = list()
    institutions = fbread.read_institutions(program)
    locked_instructors = list()

    for institution in locked_dict:
        print("Institution: " + institution)
        for instructor in locked_dict[institution]:
            locked_instructors.append(instructor.teacher_name)

    #print("Getting Resorted: " + str(result))
    pool_of_instructors = fbread.read_instructors(program)
    for instructor in pool_of_instructors:
        if instructor.name not in locked_instructors:
            instructors.append(instructor)
    #print("List of Instructors: " + str(instructors))
    printInstructorList(instructors)
    sort(instructors, institutions)
    # reSortedDict = randInstructToSchool(result)
    # return reSortedDict

def printInstructorList(instructors: list):
    selectedInstructorList = list()
    for inst in instructors:
        selectedInstructorList.append(inst.name)
    print("List of Instructors: " + str(selectedInstructorList))

'''
Creates a new dictionary of matching schedules between the
institutions and the instructors if the region and time range
match for the corresponding day by comparing every instructor
to every institution.
'''
def same_schedule_region(school : Institution, teacher : Instructor) -> dict:

    sched_match = defaultdict(list)

    for day in school.schedule:
        for school_time in school.schedule[day]:
            for teacher_time in teacher.schedule[day]:
                if time_match(school_time, teacher_time) and same_region(school, teacher):
                    sched_match[day].append(school_time)

    return sched_match

'''
Matches time schedule of the school and the time schedule
of the teacher. If the time range of the school is within the
time range of the teacher then True is returned else False.
'''
def time_match(school : (int,int), teacher : (int, int)) -> bool:
    return teacher[0] <= school[0] and teacher[1] >= school[1]

'''
Matches the region of the school with the region of the teacher.
If there is a match True is returned else False.
'''
def same_region(school : Institution, teacher : Instructor) -> bool:
    return school.county == teacher.region


def print_result(result : dict):
    for school in result:
        print(school, ':', end =' ')
        for match in result[school]:
            print(match.teacher_name + ",", end=' ')
        print("\n")

#Helper for randInstructToSchool()
def myPrint(resultDict: dict):
    for key in resultDict:
        print(key, ':', end =' ')
        for value in resultDict[key]:
            print(value.teacher_name + ",", end=' ')
        print("\n")


def randInstructToSchool(regionAndSchools: dict) -> dict:

    #Empty result dict. Result will be populated with school as keys and List() of instructors as values.
    resultDict = {}
    indexChecked = list()

    #Assuming List() associated with a school in this region are not the same...?
    for key in regionAndSchools:
            #Grab the actual amount of instructors paired with the school (key)
        listLength = len(regionAndSchools[key])
        newList = list()
        print("Institution: " + str(regionAndSchools[key]))

        #Grab number of instrutors needed @ each school to perform rand alg & name for printing/Testing purposes.
        for match in regionAndSchools[key]:
            school_instructors_needed = match.instructors
        #print("Number of instructors required for institution: " + str(school_instructors_needed))

        #Index for while control
        teachCount = 0
        # time_iters = 0
        print("Length of List: " + str(listLength))
        if listLength < school_instructors_needed:
            #break
            while teachCount < listLength:
                value = regionAndSchools.get(key)
                print("Iteration Count (Special): " + str(teachCount))
                instructChosen = value[teachCount]
                newList.append(instructChosen)
                teachCount += 1
            teachCount = 0
        else:
            while teachCount < school_instructors_needed:
                randNum = int(random.randrange(0, listLength))
                if randNum in indexChecked:
                    continue
                else:
                    indexChecked.append(randNum)
                    #Accessing List() values and appending them to resultDict() (future: add more weights/specifications here...?)
                    value = regionAndSchools.get(key)
                    instructChosen = value[randNum]
                    if(assignWeights(instructChosen)):
                        newList.append(instructChosen)
                        teachCount+= 1
                        # time_iters = 0

        #Populate resultDict()
        resultDict[key] = newList

        #Cleanup
        indexChecked.clear()

    #Helper print function here.
    #myPrint(resultDict)

    return resultDict

def assignWeights(instructorMatch: Match) -> bool:
    #print("Was instructor prior mentor? " + instructorMatch.previous_mentor)
    #print("Does the instructor have a car? " + instructorMatch.car)
    if(instructorMatch.previous_mentor=="Yes" or instructorMatch.car=="Yes"):
        return True
    else:
        return False