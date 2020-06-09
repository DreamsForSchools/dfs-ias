import pyrebase
from collections import defaultdict

import api.dbtools
import api.dfsapi
from api.instructor import Instructor
from api.institution import Institution
import api.manageinstructors

'''
Reads the instructors in the most recent timestamp
under the specified program and creates a list 
of Instructor objects. 
'''
def read_instructors(program:str):
	db = api.dfsapi.get_db()

	instructors = list()

	keys = db.child(program).child("instructors").shallow().get()

	if keys.val() == None:
		return False

	recentdb = max(keys.val())

	data = db.child(program).child("instructors").child(recentdb).get()

	for i in data.each():
		instructor = i.val()

		Name = instructor["Name"]
		Gender = instructor["Gender"]
		Ethnicity = instructor["Ethnicity"]
		Region = instructor["Region"]
		University = instructor["University"]
		Year = instructor["Year"]
		PreviousMentor = instructor["PreviousMentor"]
		Car = instructor["Car"]
		Languages = instructor["Languages"]
		ShirtSize = instructor["ShirtSize"]
		MultipleDays = instructor["MultipleDays"]
		Schedule = api.manageinstructors.schedule_to_dict(instructor["Schedule"])

		instructors.append(Instructor(Name, Gender, Ethnicity, Region,
			University, Year, PreviousMentor, Schedule,
			Car, Languages, ShirtSize, MultipleDays))

	return instructors

'''
Reads the institutions in the most recent timestamp
under the specified program and creates a ist of
Institution objects.
'''
def read_institutions(program:str):
	db = api.dfsapi.get_db()

	institutions = list()

	keys = db.child(program).child("institutions").shallow().get()

	if keys.val() == None:
		return False

	recentdb = max(keys.val())

	data = db.child(program).child("institutions").child(recentdb).get()

	for i in data.each():
		institution = i.val()

		Name = institution["Name"]
		Address = institution["Address"]
		County = institution["County"]
		Instructors = institution["Instructors"]
		Schedule = api.manageinstructors.schedule_to_dict(institution["Schedule"])

		institutions.append(Institution(Name, Address, County, 
			Instructors, Schedule))

	return institutions
