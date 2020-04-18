import xlrd

from datetime import timedelta

from instructor import Instructor
from institution import Institution

'''
Opens excel file and reads the instructor roster.
Creates Instructor object with necessary information and appends
it to a list of instructors. 
The list of instructors is returned.
'''
def load_instructor_data(filepath):
	workbook = xlrd.open_workbook(filepath)
	sheet = workbook.sheet_by_index(0)
	sheet.cell_value(0,0)

	instructors = list()

	for i in range(1, sheet.nrows):
		Name = sheet.cell_value(i,0)
		Gender = sheet.cell_value(i,1)
		Ethnicity = sheet.cell_value(i,2)
		Region = sheet.cell_value(i,3)
		University = sheet.cell_value(i,4)
		Year = sheet.cell_value(i,5)
		PreviousMentor = sheet.cell_value(i,6)
		Car = sheet.cell_value(i,10)
		Languages = sheet.cell_value(i,11)
		ShirtSize = sheet.cell_value(i,12)
		MultipleDays = sheet.cell_value(i,13)
		Schedule = {(900,1020):list(build_list_int_days(sheet.cell_value(i,7))),
					(930,1050):list(build_list_int_days(sheet.cell_value(i,8))),
					(945,1065):list(build_list_int_days(sheet.cell_value(i,9)))}


		instructors.append(Instructor(Name, Gender, Ethnicity, Region,
			University, Year, PreviousMentor, Schedule,
			Car, Languages, ShirtSize, MultipleDays))

	return instructors

'''
Opens excel file and reads the instutition database. 
Creates Institution object with necessary information as 
attributes and appends it to a list of institutions. 
The list of institutions is returned. 
'''
def load_institution_data(filepath):
	workbook = xlrd.open_workbook(filepath)
	sheet = workbook.sheet_by_index(0)
	sheet.cell_value(0,0)

	institutions = list()

	for i in range(1, sheet.nrows):
		Name = sheet.cell_value(i,0)
		Address = sheet.cell_value(i,1)
		Program = sheet.cell_value(i,2)
		Instructors = sheet.cell_value(i,3)
		TimeRange = minute_range(sheet.cell_value(i,5))
		Schedule = {TimeRange:build_list_int_days(
			sheet.cell_value(i,4))}

		institutions.append(Institution(Name, Address, Program, 
			Instructors, Schedule))

	return institutions

'''
Converts string time range in the format 15:00 - 17:00
to a tuple of integer minutes (900, 1020)
'''
def minute_range(time_range : str) -> (int, int):
	start, end = time_range.split(" - ")
	start_mins = hours_to_minutes(start)
	end_mins = hours_to_minutes(end)
	return (start_mins, end_mins)

'''
Converts a string of hours and minutes to an integer of minutes
'''
def hours_to_minutes(time : str) -> int:
	hours, minutes = time.split(":")
	hours = int(hours)
	minutes = int(minutes)
	result = (hours*60)+minutes
	return result


def days_to_int(day : str) -> int:
	week = ["Sunday", "Monday", "Tuesday", "Wednesday",
	"Thursday", "Friday", "Saturday"]

	if day == "Sunday":
		return 0
	elif day == "Monday":
		return 1
	elif day == "Tuesday":
		return 2
	elif day == "Wednesday":
		return 3
	elif day == "Thursday":
		return 4
	elif day == "Friday":
		return 5
	elif day == "Saturday":
		return 6
	else:
		return -1

def build_list_int_days(days : str) -> [int]:
	str_list = list(days.split(","))

	int_list = list()

	for i in range(len(str_list)):
		int_list.append(days_to_int(str_list[i].strip()))

	return int_list

instructors = load_instructor_data("shortinstructors.xlsx")	
institutions = load_institution_data("schoolsample.xlsx")

for inst in instructors:
	print(inst.name, inst.schedule)

