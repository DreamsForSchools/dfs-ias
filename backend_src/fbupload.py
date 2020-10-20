import pyrebase
import dfsapi
import calendar
import time
import dbtools
from collections import defaultdict

'''
Uploads institution to the firebase database
under the specified program with the given
json object that contains information 
about the institution.
'''
def upload_institutions(school:dict):
	db = dfsapi.get_db()

	Mon = dbtools.minute_range(school["Monday"])
	Tue = dbtools.minute_range(school["Tuesday"])
	Wed = dbtools.minute_range(school["Wednesday"])
	Thurs = dbtools.minute_range(school["Thursday"])
	Fri = dbtools.minute_range(school["Friday"])

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
	
	school_info = {
		"Name" : school["Name"], 
		"Address" : school["Address"], 
		"County" : school["County"], 
		"Instructors" : school["Instructors"], 
		"Schedule" : Schedule
	}
	
	for p in school['Program']:
		if school['New']:
			latest = str(calendar.timegm(time.gmtime()))
			db.child(p).child("institutions").child(latest).child(school_info['Name']).set(school_info)
		else:
			timestamps = db.child(p).child("institutions").shallow().get()
			if timestamps.val() != None:
				latest = max(timestamps.val())
				db.child(p).child("institutions").child(latest).child(school_info['Name']).set(school_info)
	db.child("institutions").child(school_info['Name']).set(school_info)

	for p in school['Program']:
		keys = db.child(p).child("institutions").shallow().get()
		if keys.val() != None:
			db_length = len(keys.val())
			if db_length > 10:
				oldest = min(keys.val())
				db.child(p).child("institutions").child(oldest).remove()


'''
Uploads instructor to the firebase database
under the specified program based on the 
information provided in the json object.
'''
def upload_instructors(teacher:dict):

	Mon = dbtools.minute_range(teacher["Monday"])
	Tue = dbtools.minute_range(teacher["Tuesday"])
	Wed = dbtools.minute_range(teacher["Wednesday"])
	Thurs = dbtools.minute_range(teacher["Thursday"])
	Fri = dbtools.minute_range(teacher["Friday"])

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

	teacher_info = {
		"Name" : teacher["Name"], 
		"Gender" : teacher["Gender"], 
		"Ethnicity" : teacher["Ethnicity"], 
		"Region" : teacher["Region"], 
		"University" : teacher["University"], 
		"Year" : teacher["Year"], 
		"PreviousMentor" : teacher["PreviousMentor"], 
		"Car" : teacher["Car"], 
		"Languages" : teacher["Languages"], 
		"ShirtSize" : teacher["ShirtSize"], 
		"MultipleDays" : teacher["MultipleDays"],
		"Schedule" : Schedule
	}

	db = dfsapi.get_db()
	
	for p in teacher['Program']:
		if teacher['New']:
			latest = str(calendar.timegm(time.gmtime()))
			db.child(p).child("instructors").child(latest).child(teacher_info['Name']).set(teacher_info)
		else:
			timestamps = db.child(p).child("instructors").shallow().get()
			if timestamps.val() != None:
				latest = max(timestamps.val())
				db.child(p).child("instructors").child(latest).child(teacher_info['Name']).set(teacher_info)
		
		db.child("instructors").child(teacher_info['Name']).set(teacher_info)

	for p in teacher['Program']:
		keys = db.child(p).child("instructors").shallow().get()
		if keys.val() != None:
			db_length = len(keys.val())
			if db_length > 10:
				oldest = min(keys.val())
				db.child(p).child("instructors").child(oldest).remove()
	return
		




