![dfs_logo_fullcolor](https://user-images.githubusercontent.com/33084827/101976572-4d9e9280-3bfb-11eb-86e7-03513b2e8dca.png)

# Basic Overview
This app is designed to be used by Dreams for Schools administrators. It automatically assigns instructors to partners/sessions based on availability, distance, and instructor preference.

# Features
- Database: add/delete/edit
    - Partners & locations
    - Instructors
    - Seasons
    - Programs
    - Program sessions
- Sorting
    - Manual assignment of instructors to sessions
    - Instructors can be lock or unlocked in a class
    - If the user wants to save an assignment they can lock the instructor to a class
    - Automatically assigns all unlocked (unassigned) instructors to class

# Requirements
- Node.js v14.0^

# Deployed App
- https://dfs-ias.herokuapp.com/
- Login details in shared Google Drive under Operation Manual & Setup Guide

# Steps for Running on a local machine
**Step 1:** Navigate to the api folder (backend).    

**Step 2:** Create .env file for API keys in the root directory of the api folder. (See shared Google Drive for keys)  

```
GMAP_API_KEY=
CLOUD_DB_IP=
CLOUD_DB_PORT=
CLOUD_DB_NAME=
CLOUD_DB_DEV_USERNAME=
CLOUD_DB_DEV_PASSWORD=
```

**Step 3:** Create serviceAccount.json file in the root directory of the api folder. (See shared Google Drive for serviceAccount.json)  

**Step 4:** Run 2 consoles and run these commands.   

- **API (backend)**
```
cd api
npm install
npm start
```
- **Client (frontend)**
```
cd client
npm install
npm start
```

**Step 5:** Login to IAS app with credentials at [http://localhost:3000](http://localhost:3000)
- Username/Password: See Operation Manual & Setup Guide in shared Google Drive

**Step 6 (Optional):** Connect DataGrip to the cloudDB for direct access.  
- See Operation Manual & Setup Guide in shared Google Drive for the exact steps
- Relational Schema & DDL statements are also provided there

# Login Authentication
- Uses firebase for authentication 
- In order to create more accounts:
  1. Login to the firebase console using DFS account: (Login details found in shared Google Drive)
  2. Navigate to IAS-DFS project
  3. Select authentication from the left side bar
  4. Click add user
- IAS App Login Account for testing:
  - Username/Password: (See shared Google Drive)
- All axios calls from the front end must pass a token in the header
- In the backend all incoming requests will be intercepted in api > app.js
	- If token is validated, the decoded value will be placed back into the request
	- All endpoints check to see if incoming requests have req.currentUser before proceeding. If not authenticated, HTTP error 403 is returned.

# Hosting
- **SQL** - Google Cloud
	- SQL instance is running on the `DFS App` project.
	- To log into the Google Cloud SQL dashboard, follow steps in Operation Manual & Setup Guide
- **Admin Login** - Google Firebase
	- SQL instance is running on the `DFS-IAS` project.
	- To log into the Google Firebase dashboard, follow steps in Operation Manual & Setup Guide
- **Application** - Heroku
	- The API is hosted on Heroku, which serves the front-end of the application on the root URL.
	- See shared Operation Manual for instructions on how to login and deploy the application.
- **Others:**
	- Google Maps API is running on the `DFS-IAS` project.
	- To log into the Google Firebase dashboard, follow steps in shared Operation Manual

# Tech Stacks 

## Frontend: 
- Made with the [React](https://reactjs.org/) framework 
- Styled with [React Bootstrap](https://react-bootstrap.github.io/), [Sass](https://sass-lang.com/), and [Styled Components](https://styled-components.com/)

## Backend: 
- Data is saved using MySQL 
- API runs using Express framework running on Node.js
![image](https://user-images.githubusercontent.com/43232318/120137181-9554ae80-c188-11eb-99b3-27544f7626e9.png)

# Application Usage
1. Create a season in the Navbar

	![image](https://user-images.githubusercontent.com/43232318/120136976-3131ea80-c188-11eb-8e82-834144de6891.png)

2. Create a program/partner in the Programs page

	![image](https://user-images.githubusercontent.com/43232318/120136988-355e0800-c188-11eb-985d-195d314cc5d6.png)

3. Create a class within program/partner

	![image](https://user-images.githubusercontent.com/43232318/120137002-3b53e900-c188-11eb-84f4-f9728128da33.png)

4. Add instructors in the Instructors page

	![image](https://user-images.githubusercontent.com/43232318/120137008-3ee77000-c188-11eb-8ccb-d9df3228297b.png)

5. Assign instructors in the Sorter page

	![image](https://user-images.githubusercontent.com/43232318/120137034-4d358c00-c188-11eb-8489-c8ceb036d7f8.png)
 
# CSV Parser
The csv is parsed on the front end (client/src/util/csvParse.js) and sends an axios post call to /api/instructor/CSV to bulk add all the instructor data to the database.

In order to parse DFS google form data we use the ['csvtojson' parser library](https://www.npmjs.com/package/csvtojson).

- If you are encountering issues with processing large csv files with 100+ instructors, try breaking the file down into chunks and drag them in that way. Sometimes the google api that fetches the instructor location can bottleneck the process and the request can time out if it takes too long. Processing 100+ instructors can take up to 2 minutes.
- There are many questions on the google form that we want to omit while parsing the csv as we only want to extract specific fields while saving instructors to the db.
- In order to accomplish this you need to tell the 'csvtojson' parser the exact order of columns in the csv data because they represent the order of the questions in the google form.
- If the order of the questions is changed in the DFS Instructor onboarding google form, the csv parser config needs to reflect those changes in (client/src/util/csvParse.js) line 25.
- Below is a code snippet of the current config which shows how we tell the parser exactly which column to omit and which column we would like to rename. We rename only the columns we want to use to create our instructor objects.
```
csv({
	noheader: false,
	headers: ['omit', 'email', 'firstName', 'lastName', 'phoneNumber',      'gender', 'omit' , 'ethnicity', 'university', 'major','omit', 'omit', 'schoolYear', 'graduationDate', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit','omit', 'omit', 'omit', 'programmingLanguages', 'omit', 'firstPref', 'secondPref', 'thirdPref', 'fourthPref', 'avail_09_10', 'avail_10_11', 'avail_11_12', 'avail_12_13', 'avail_13_14', 'avail_14_15', 'avail_15_16', 'avail_16_17', 'avail_17_18', 'omit', 'hasCar', 'shirtSize', 'isASL', 'omit', 'omit', 'omit', 'otherLanguages', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit', 'omit'],// 10 extra 'omit' values in the end, in case DFS add questions.
        colParser: { "omit": "omit"},
	checkType: false
})
```

## CSV Rules
- You CANNOT change the order of the questions in the google form. If you want to change the order, you also need to make sure that you reflect those changes in the column headers within the csv parser in (client/src/util/csvParse.js) on line 24.
- You CAN add 10 more questions to the end of the form. If you would like to add more, add extra 'omit' values to the end of the headers section within the csv parser.
- You CAN change the wording of any question on the google form without breaking the parser.
- **Sort logic requires that all program names in the DFS-IAS sorter app are typed exactly the same as the program names given in the instructor onboarding google form. If program names between the sorter app and the google form do not match, instructor preferences for a program will not be parsed correctly during sorting.**

# Sorter
- Auto assigning instructors to their optimal classes
- Instructors have preferences for programs they want to teach. Classes have a preference for the closest available instructor. Goal was to balance both of these preferences while finding optimal assignments.
- Sort begins by Populating distance between all instructor and partner pairings that have not been calculated yet and adds them to the db. The first time the auto-assign button is clicked it will take a bit of time to fetch the sort data since we need to populate the distanceCache table. After the initial auto-assign, sorting will become quick. Adding more partner locations will also cause the sort logic to populate distance cache.
- **Sort logic requires that all program names in the DFS-IAS sorter app are typed exactly the same as the program names given in the instructor onboarding google form. If program names between the sorter app and the google form do not match, instructor preferences for a program will not be parsed correctly during sorting.**
- The google form and app use the following naming conventions for each program.

```
    "Engineering Inventors"
    "Mobile App Development (AppJam+)"
    "Website Development"
    "Let's Explore STEM"
    "Coding Games with Scratch"
```
- Sorting Logic based on [Stable Marriage/Gale–Shapley algorithm](https://www.geeksforgeeks.org/stable-marriage-problem/)
- Algorithm Pseudocode:
```
while there exist a free class c who still needs an instructor assignment 
{ 
    i = c's closest instructor with a matching time slot 
    if i is free
        (c, i) become paired
    else some pair (c', i) already exists 
        if i prefers c to c' 
        	(c, i) become paired
        	c' becomes free 
    	else 
        	(c', i) remain paired 
}
```
- Search Bar: Users can search by instructor name, email, university, or first preference.
- You can use client/util/sampleData.js to generate fake instructors.
- The drag and drop functionality uses the [react-beautiful-dnd library](https://github.com/atlassian/react-beautiful-dnd)

# Required Fixes & Bugs
- Locked Instructors should not be draggable. It is important to unlock instructors before moving them. 
	- Class page manages the draggable area but does not have direct access to current instructor locked states unless the page is reloaded.
	- isDragDisabled is set to false for now so dnd still works.
- Supporting locking at the program and class level is tricky
	- Locked states can become bugged on page reload due to conflicting locked states at the instructor, class and program level
- Instructor page needs search bar and filter functionality implemented
- Reloading a page on Heroku causes Page Not Found. Does not happen while running locally
- React Routing and Authentication
- Unused API’s need to be refactored or removed

# Future Areas of Improvement
## Sorting / Auto-assign
- After completing the sort, the instructor pop up modal could provide more detail about why an instructor was assigned. For example it should provide details about the assignment and the instructor's distance to that particular school. The aggregated instructor endpoint for getting all the instructors in a season can be modified to include this information.
- Sorting logic can be altered to provide more variability in assignment results. Currently there is no tie breaking in a set of instructors who have the same preference for and distance to a particular class. The getSortData() function can be altered to shuffle instructors for a set of instructors with the same distance/preference.
- Currently the sorting logic tries to find the closest instructor while still honoring their preferences. Sorter page should allow DFS to modify sorting heuristics of auto sort from the front end. For example DFS could specify that auto-sort should only consider instructors who are within a certain distance radius.
- (DFS may not require this) Unable to assign one instructor to multiple classes due to limitations with UX. Current implementation removes the instructor from the sidebar once placed into a class. Sorting logic also assumes one instructor will only be teaching one class.

## Bulk Upload Partners
- Users should be able to drop a csv with all of their partner information to easily bulk add the school they would like.

## Other Frontend Nice to haves
- Confirmation and look up modals while adding instrucctors/partners

## Hosting
- Move hosting to google cloud to lessen communication time between app and database

## Variable & Frontend Renaming
- Program —> Classes
- Classes —> Sections

## Adding images for Partner Locations
- Save images for school locations with gmap api (low priority)

## Add past instructor search

