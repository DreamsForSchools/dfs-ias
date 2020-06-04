# To run API as localhost

First time

1. Clone the server folder in master branch
2. cd to server
3. pip3 install virtualenv (if you don't have virtualenv installed in your machine)
4. virtualenv venv (make a new virtual environment called venv)
5. source venv/bin/activate (activate virtual environment)
6. pip install -r requirementst.txt (install all the necessary packages in the virtualenv)
7. cd to src
8. flask run

Later times
1. cd to server
2. source venc/bin/activate
3. cd to src
4. flask run

# To upload instructors:
http://127.0.0.1:5000/uploadinstructors

POST request with json object in this format.

{ "Name": "Min Sung Cha", "Gender": "Male", "Ethnicity": "Chinese", "Region": "Irvine", "University": "University of California, Irvine", "Year": "4th", "PreviousMentor": "Yes", "Car": "No", "Languages": "English", "ShirtSize": "L", "MultipleDays": "Yes", "Monday": ["09:00", "15:00"], "Tuesday": ["10:00", "21:00"], "Wednesday": "", "Thursday": "", "Friday": "", "Program": ["Appjam+", "Webjam", "Sphero"], "New" : false }

"New" key specifies if it will create a new timestamp.

For uploading a roster by looping through every row of the csv file set the first instructor with "New":true and the rest with "New":false

For manual uploads set "New":false

# To upload institutions:
http://127.0.0.1:5000/uploadinstitutions

POST request with json object in this format { "Name" : "American School", "Address" : "1111 S Broadway, Santa Ana, CA 92707", "Program" : ["Appjam+"], "County" : "Orange County", "Instructors" : 4, "Monday" : ["15:00", "17:45"], "Tuesday" : "", "Wednesday" : ["15:00", "17:45"], "Thursday" : "", "Friday" : "", "New" : false }

"New" key specifies if it will create a new timestamp.

For uploading a roster by looping through every row of the csv file set the first institution with "New":true and the rest with "New":false

For manual uploads set "New":false

# To sort:
http://127.0.0.1:5000/sort

POST request with json object in this format

{"Program":"Appjam+"}

Returns a json object showing institutions as keys and list of instructors as value.

Adds a new timestamp in the matches tab and stores the json object there.

If any error occurs it returns false and the sorted information is not stored.

# To store shirt sizes:
http://127.0.0.1:5000/shirts

POST request with json object in this format

{"Program":"Appjam+"}

Returns a json object with shirt sizes and their quantities.

Adds a shirts tab in the program.

If any error occurs it returns false and the shirts information is not stored.

# To lock instructor:
http://127.0.0.1:5000/lockinstructor

POST request with json object in this format

{"Program":"Appjam+", "TeacherName": "Johnnie Preece", "SchoolName":"Irvine Intermediate"}

Returns true if successful lock

Returns false if unsuccessful lock and no information stored

Creates a locked tab with information of the locked instructor

Changes the locked variable to true.

# To unlock instructor:
http://127.0.0.1:5000/unlockinstructor

POST request with json object in this format

{"Program":"Appjam+", "TeacherName": "Johnnie Preece", "SchoolName":"Irvine Intermediate"}

Returns true if successful unlock

Returns false if unsuccessful unlock and no information is removed

Removes the instructor from the locked tab

Changes the locked variable to false

# To resort:
http://127.0.0.1:5000/resort

POST request with json object in this format

{"Program":"Appjam+"}

Returns json object with institutions as keys and list of instructors as value.

Returns false if any error occurs.

Gets the instructors from the locked tab and are added as default when matching them with institutions.

# To remove instructor:
http://127.0.0.1:5000/removeinstructor

POST request with json object in this format

{ "Program" : "Appjam+", "SchoolName" : "Carr Intermediate", "TeacherName" : "Cindy Guzmsan" }

Returns true if successful remove

Returns false if unsuccessful remove

Creates a Removed tab and stores instructor there

Creates an Available tab and stores available institution there

Instructor has to be first removed from the institution to be able to move to an institution with empty slot.

# To show available moves:
http://127.0.0.1:5000/showavailablemoves

POST request with json object in this format

{ "Program" : "Appjam+", "TeacherName" : "Cindy Guzman" }

Returns a list of institutions the instructor can be moved to if successful

The instructor has to be a removed instructor

# To move instructor:
http://127.0.0.1:5000/moveinstructor

POST request with json object in this format

{ "Program" : "Appjam+", "SchoolName" : "Carr Intermediate", "TeacherName": "Cindy Guzman" }

Returns true if successful move.

Has to select one of the institutions shown in the showavailablemoves response.

Instructor is removed from the Removed tab.

Instructor is moved to the selected institution.

If there are no more spaces in the institution left it is removed from the Available tab.
