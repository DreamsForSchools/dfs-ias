'''
Instructor class which contains all relevant information
about an Instructor needed for matching with an Institution
'''

class Instructor:
	def __init__(self, Name, Gender, Ethnicity, Region, University, 
		Year, PreviousMentor, Schedule, Car, Languages, ShirtSize, 
		MultipleDays):
		self.name = Name
		self.gender = Gender
		self.ethnicity = Ethnicity
		self.region = Region
		self.university = University
		self.year = Year
		self.previousmentor = PreviousMentor
		self.schedule = Schedule
		self.car = Car
		self.languages = Languages
		self.shirtsize = ShirtSize
		self.multipledays = MultipleDays

