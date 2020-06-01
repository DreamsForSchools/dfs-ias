class Match:
	def __init__(self, TeacherName, SchoolName, Region, PreviousMentor,
		Car, Languages, MultipleDays, Schedule, Instructors, Locked=False):
		self.teacher_name = TeacherName
		self.school_name = SchoolName
		self.region = Region
		self.previous_mentor = PreviousMentor
		self.car = Car
		self.languages = Languages
		self.multiple_days = MultipleDays
		self.schedule = Schedule
		self.instructors = Instructors
		self.locked = Locked
