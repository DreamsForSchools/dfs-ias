import pyrebase
import api.dfsapi
import calendar
import time
import api.dbtools
from collections import defaultdict

'''
Upload 
'''
def upload_institutions(school:dict):
	db = api.dfsapi.get_db()

	db.child("hello").set({"Min":"Sung"})
	
	Mon = api.dbtools.minute_range(school["Monday"])
	Tue = api.dbtools.minute_range(school["Tuesday"])
	Wed = api.dbtools.minute_range(school["Wednesday"])
	Thurs = api.dbtools.minute_range(school["Thursday"])
	Fri = api.dbtools.minute_range(school["Friday"])

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



'''
Upload CSV roster of instructors to the real time database firebase
'''

def upload_instructors(teacher:dict):

	Mon = api.dbtools.minute_range(teacher["Monday"])
	Tue = api.dbtools.minute_range(teacher["Tuesday"])
	Wed = api.dbtools.minute_range(teacher["Wednesday"])
	Thurs = api.dbtools.minute_range(teacher["Thursday"])
	Fri = api.dbtools.minute_range(teacher["Friday"])

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

	db = api.dfsapi.get_db()
	
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
	return
		




