def update_schedule(schedule : dict):
	for day in schedule:
		new_time = modify_time_ranges(schedule[day])
		schedule[day] = new_time

def make_schedule(schedule : dict, time_range : (int,int), 
	days : [int]):
	
	for day in days:
		schedule[day].append(time_range)

def merge_time_range(current : (int,int), new : (int,int)) -> int:
	
	if current[0] <= new[0] <= current[1]:
		if new[1] > current[1]:
			return 1
			#return (current[0], new[1]) 	#Have to remove current 
		elif new[1] <= current[1]:
			return 2
	elif new[0] <= current[0] <= new[1]:
		if current[1] > new[1]:
			return 3
			#return (new[0], current[1])		#Have to remove current
		elif current[1] <= new[1]:
			return 4
			#No addition should be made
	else:
		return 5


def modify_time_ranges(tlist : [(int,int)]) -> list:
	new_tlist = list()

	i = 0
	j = i + 1
	while tlist != []:
		if len(tlist) == 1:
			new_tlist.append(tlist.pop(0))
			break

		current = tlist[i]
		compare = tlist[j]

		merge = merge_time_range(current, compare)
		if merge == 1:
			new_time = (current[0], compare[1])
			tlist.pop(0)
			tlist.pop(0)
			tlist.insert(0, new_time)
		elif merge == 2:
			tlist.pop(1)
		elif merge == 3:
			new_time = (compare[0], current[1])
			tlist.pop(0)
			tlist.pop(0)
			tlist.insert(0, new_time)
		elif merge == 4:
			tlist.pop(0)
		elif merge == 5:
			j += 1

		if (j >= len(tlist)):
			j = i+1
			new_tlist.append(tlist.pop(0))

		if tlist == []:
			break

		if (i >= len(tlist)-1):
			new_tlist.append(tlist.pop(0))

	return new_tlist


#TOOLS FOR MANIPULATING TIME

'''
Converts string time range in the format 15:00 - 17:00
to a tuple of integer minutes (900, 1020)
'''
def minute_range(time_range : str) -> (int, int):
	if len(time_range) != 0:
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


#TOOLS FOR MANIPULATING DAYS OF THE WEEK

'''
Convert days of a week to integers. 
'''
def days_to_int(day : str) -> int:
	week = ["Sunday", "Monday", "Tuesday", "Wednesday",
	"Thursday", "Friday", "Saturday"]

	str_day = day.strip().lower()

	if str_day == "sunday":
		return 0
	elif str_day == "monday":
		return 1
	elif str_day == "tuesday":
		return 2
	elif str_day == "wednesday":
		return 3
	elif str_day == "thursday":
		return 4
	elif str_day == "friday":
		return 5
	elif str_day == "saturday":
		return 6
	else:
		return -1

'''
Build list of the days of the week in integer
from a string of days. 
'''
def build_list_int_days(days : str) -> [int]:
	str_list = list(days.split(","))

	int_list = list()

	for i in range(len(str_list)):
		int_day = days_to_int(str_list[i].strip())
		if int_day != -1:
			int_list.append(int_day)

	return int_list