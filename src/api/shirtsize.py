from collections import defaultdict
import api.fbread
import api.dfsapi

def upload_shirtsize(program:str):
	instructors = api.fbread.read_instructors(program)

	shirtsizes = getshirtsize(instructors)

	db = api.dfsapi.get_db()

	for shirt in shirtsizes:
		db.child(program).child("shirts").child(shirt).set(shirtsizes[shirt])

	return shirtsizes


def getshirtsize(instructors:list):

	shirts = defaultdict(int)

	for i in instructors:
		if i.shirtsize == "S":
			shirts["S"] += 1
		elif i.shirtsize == "M":
			shirts["M"] += 1
		elif i.shirtsize == "L":
			shirts["L"] += 1
		elif i.shirtsize == "XL":
			shirts["XL"] += 1
		elif i.shirtsize == "XXL":
			shirts["XXL"] += 1

	return shirts

