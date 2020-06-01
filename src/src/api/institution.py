'''
Institution class that contains all relevant information of an
Instutiton where Instructors will be matched to.                
'''

class Institution:
	def __init__(self, Name, Address, County, Program, Instructors, Schedule):
		self.name = Name
		self.address = Address
		self.county = County
		self.program = Program
		self.instructors = Instructors
		self.schedule = Schedule
