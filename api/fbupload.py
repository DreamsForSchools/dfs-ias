import pyrebase
import xlrd
import dfsapi
import calendar
import time

'''
Upload CSV roster of institutions to the 
realtime database in firebase
'''
def upload_institutions(filepath:str, program:str):
	db = dfsapi.get_db()
	workbook = xlrd.open_workbook(filepath)
	sheet = workbook.sheet_by_index(0)
	sheet.cell_value(0,0)

	timestamp = str(calendar.timegm(time.gmtime()))

	for i in range(1, sheet.nrows):
		Name = sheet.cell_value(i,0)
		Address = sheet.cell_value(i,1)
		County = sheet.cell_value(i, 2)
		Program = sheet.cell_value(i,3)
		Instructors = sheet.cell_value(i,4)
		Mon = sheet.cell_value(i,5)
		Tue = sheet.cell_value(i,6)
		Wed = sheet.cell_value(i,7)
		Thurs = sheet.cell_value(i,8)
		Fri = sheet.cell_value(i,9)

		school = {"Name":Name, "Address":Address, "County":County,
			"Program":Program, "Instructors":Instructors, 
			"Monday" : Mon, "Tuesday":Tue, "Wednesday":Wed, 
			"Thursday":Thurs, "Friday":Fri}

		#db.child(program).child(Name).set(school)
		db.child(program).child("institutions").child(timestamp).child(Name).set(school)


'''
Upload CSV roster of instructors to the real time database firebase
'''

def upload_instructors(filepath:str, program:str):
	db = dfsapi.get_db()
	workbook = xlrd.open_workbook(filepath)
	sheet = workbook.sheet_by_index(0)
	sheet.cell_value(0,0)

	timestamp = str(calendar.timegm(time.gmtime()))

	for i in range(1, sheet.nrows):

		Name = sheet.cell_value(i,0)
		Gender = sheet.cell_value(i,1)
		Ethnicity = sheet.cell_value(i, 2)
		Region = sheet.cell_value(i,3)
		University = sheet.cell_value(i,4)
		Year = sheet.cell_value(i,5)
		PreviousMentor = sheet.cell_value(i,6)
		Car = sheet.cell_value(i,7)
		Languages = sheet.cell_value(i,8)
		ShirtSize = sheet.cell_value(i,9)
		MultipleDays = sheet.cell_value(i,10)
		Mon = sheet.cell_value(i,11)
		Tue = sheet.cell_value(i,12)
		Wed = sheet.cell_value(i,13)
		Thur = sheet.cell_value(i,14)
		Fri = sheet.cell_value(i,15)

		teacher = {
			"Name" : Name, 
			"Gender" : Gender, 
			"Ethnicity" : Ethnicity, 
			"Region" : Region, 
			"University" : University, 
			"Year" : Year, 
			"PreviousMentor" : PreviousMentor, 
			"Car" : Car, 
			"Languages" : Languages, 
			"ShirtSize" : ShirtSize, 
			"MultipleDays" : MultipleDays, 
			"Monday" : Mon, 
			"Tuesday" : Tue, 
			"Wednesday" : Wed, 
			"Thursday" : Thur, 
			"Friday" : Fri
		}

		#db.child(program).child(Name).set(teacher)
		db.child(program).child("instructors").child(timestamp).child(Name).set(teacher)
'''
upload_institutions("institutions.xlsx", "AppJam+")
upload_institutions("institutions.xlsx", "SpheroElementary")
upload_institutions("institutions.xlsx", "WebJam")

upload_instructors("instructors.xlsx", "AppJam+")
upload_instructors("instructors.xlsx", "SpheroElementary")
upload_instructors("instructors.xlsx", "WebJam")
'''

#upload_institutions("institutions1.xlsx", "AppJam+")
#upload_instructors("instructors1.xlsx", "AppJam+")

upload_institutions("institutions.xlsx", "Institutions")
upload_instructors("instructors.xlsx", "Instructors")




