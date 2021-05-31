![dfs_logo_fullcolor](https://user-images.githubusercontent.com/33084827/101976572-4d9e9280-3bfb-11eb-86e7-03513b2e8dca.png)

# Basic Overview
This app is designed to be used by Dreams for Schools administrators. It automatically assigns instructors to partners/sessions based on availability, distance, and instructor preference.

# Features
- Database : add/delete/edit of
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

# Run on local machine
Create an `.env` file in the api folder
```
GMAP_API_KEY=
CLOUD_DB_IP=
CLOUD_DB_PORT=
CLOUD_DB_NAME=
CLOUD_DB_DEV_USERNAME=
CLOUD_DB_DEV_PASSWORD=
```

Run 2 consoles and run these commands:
## API (backend)
```
cd api
npm install
npm start
```
## Client (frontend)
```
cd client
npm install
npm start
```
[http://localhost:3000](http://localhost:3000) should open in the browser.

# Login Authentication
- Uses firebase for authentication 
- In order to create more accounts:
  1. Login to the firebase console using DFS account: technology@dreamsforschools.org (Login details found in GDrive)
  2. Navigate to IAS-DFS project
  3. Select authentication from the left side bar
  4. Click add user
- Dummy account for testing:
  - Username: ias-demo@gmail.com
  - Password: ias123

# Tech Stacks 
## Frontend: 
- Made with React framework 
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

##Classes —> Sections
- Adding images in SQL

## Save images for school locations (low priority)
- Add past instructor search

