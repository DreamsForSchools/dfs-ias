import pyrebase
from collections import defaultdict
import dbtools

import dfsapi
from instructor import Instructor
from institution import Institution

def read_instructors(program:str):
	db = dfsapi.get_db()

	instructors = list()

	keys = db.child(program).child("instructors").shallow().get()
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
		Mon = dbtools.minute_range(instructor["Monday"])
		Tue = dbtools.minute_range(instructor["Tuesday"])
		Wed = dbtools.minute_range(instructor["Wednesday"])
		Thurs = dbtools.minute_range(instructor["Thursday"])
		Fri = dbtools.minute_range(instructor["Friday"])

		Schedule = defaultdict(list)

		if Mon != None:
			Schedule[1].append(Mon)
		if Tue != None:
			Schedule[2].append(Tue)
		if Wed != None:
			Schedule[3].append(Wed)
		if Thurs != None:
			Schedule[4].append(Thurs)
		if Fri != None:
			Schedule[5].append(Fri)

		instructors.append(Instructor(Name, Gender, Ethnicity, Region,
			University, Year, PreviousMentor, Schedule,
			Car, Languages, ShirtSize, MultipleDays))

	return instructors

def read_institutions(program:str):
	db = dfsapi.get_db()

	institutions = list()

	keys = db.child(program).child("institutions").shallow().get()
	recentdb = max(keys.val())

	data = db.child(program).child("institutions").child(recentdb).get()

	for i in data.each():
		institution = i.val()

		Name = institution["Name"]
		Address = institution["Address"]
		County = institution["County"]
		Program = institution["Program"]
		Instructors = institution["Instructors"]

		Mon = dbtools.minute_range(institution["Monday"])
		Tue = dbtools.minute_range(institution["Tuesday"])
		Wed = dbtools.minute_range(institution["Wednesday"])
		Thurs = dbtools.minute_range(institution["Thursday"])
		Fri = dbtools.minute_range(institution["Friday"])

		Schedule = defaultdict(list)

		if Mon != None:
			Schedule[1].append(Mon)
		if Tue != None:
			Schedule[2].append(Tue)
		if Wed != None:
			Schedule[3].append(Wed)
		if Thurs != None:
			Schedule[4].append(Thurs)
		if Fri != None:
			Schedule[5].append(Fri)

		institutions.append(Institution(Name, Address, County, Program,
			Instructors, Schedule))

	return institutions


'''
institutions = read_institutions("AppJam+")
instructors = read_instructors("AppJam+")

for i in institutions:
	print(i.name, i.schedule)

for i in instructors:
	print(i.name, i.schedule)
'''