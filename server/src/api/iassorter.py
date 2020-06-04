import random
from collections import defaultdict

from api.instructor import Instructor
from api.institution import Institution
from api.match import Match

def sort(instructors:list, institutions:list):

    result = defaultdict(list)

    for s in institutions:
        for t in instructors:
            sched_match = same_schedule_region(s, t)
            if sched_match != {}:
                result[s.name].append(Match(t.name, s.name, t.region, 
                    t.previousmentor, t.car, t.languages, 
                    t.multipledays, s.instructors, 
                    t.shirtsize, t.gender, t.university, t.year,
                    t.ethnicity, s.address, s.county, sched_match,
                    t.schedule))

    sortedDict = randInstructToSchool(result)
    return sortedDict

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

#Code heavily relies on Min and Appurva's initial matching algorithms...
#function to randomely choose List.length() numer of times to assign/finalize matched instructors to a school in the region.
#possible to teach multiple days (scheduled for x # of different schools on different days as pertaining to the instructors available data.)
#@param passed in region dictionary with school objects as keys and a List() of matched instructors as values.
#@return a dict with the proposed instructor assignment to matched school keys
def randInstructToSchool(regionAndSchools: dict) -> dict:

    #Empty result dict. Result will be populated with school as keys and List() of instructors as values.
    resultDict = {}
    indexChecked = list()

    #Assuming List() associated with a school in this region are not the same...?
    for key in regionAndSchools:
        #Grab the actual amount of instructors paired with the school (key)
        listLength = len(regionAndSchools[key])
        newList = list()
        assignedInstructorList = list() #The instructors chosen for that particular institution will be put in this list after assigning weights has been done
        #TEST#
        #print(listLength)
        
        #Grab number of instrutors needed @ each school to perform rand alg & name for printing/Testing purposes.
        for match in regionAndSchools[key]:
            school_instructors_needed = match.instructors
        #print("Number of instructors required for institution: " + str(school_instructors_needed))
        
        #TEST#
        #print("School " + key.name + " Needs: " + str(instructNeed) + " Instructors!")
        
        #Index for while control
        teachCount = 0
        while teachCount < school_instructors_needed:
                #Generate a randrange() 0 <= num < listLength and use to select matched Instructors from List() values. (What if a visited randnum is chosen again?)
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