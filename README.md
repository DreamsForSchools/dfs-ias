![dfs_logo_fullcolor](https://user-images.githubusercontent.com/33084827/101976572-4d9e9280-3bfb-11eb-86e7-03513b2e8dca.png)

# Basic Overview
This app is designed to be used by Dreams for Schools administratiors. It automatically assigns instructors to schools based on several heuristics. 

# Features
A few things you can do with Instructor Assignment Sorter
- Sorting
  - Automatically sort instructors to Schools
  - Re-sort instructors
  - Manually assign instructors to schools
  - Saving sorted rosters
- Database
  - add/delete/edit Schools
  - add/delete/edit instructors
  - add/delete/edit Programs
  - add/delete      seasons 
- Filter schools/instructors based on their attributes

![dfs_homepage](https://user-images.githubusercontent.com/33084827/101977200-a45a9b00-3c00-11eb-9a90-2fcad39e9b32.jpg)

# Run on local machine
To clone and run this application on your machine. From the command line:  
## Backend
Follow this video: ![How to set up Backend](https://www.youtube.com/watch?v=bEGUAf6vNo4&list=PL4gnaB7L8JuaXDi6JPs8h_ytlf7IEhWI3&index=2)
<br />
or follow the steps below
1. `git clone https://github.com/DreamsForSchools/dfs-ias`
2. `cd dfs-ias/server`
3. `python3 -m venv .`
4. `source bin/activate`
5. `pip install -r requirements.txt`
6. `cd src`
7. Add GMAP_API_KEY key to dfsgmap.py
8. `flask run`

## Frontend

Follow this video: ![How to set up Frontend](https://www.youtube.com/watch?v=1YsMWV4g2eI&list=PL4gnaB7L8JuaXDi6JPs8h_ytlf7IEhWI3&index=1)
<br />
or follow the steps below
- Clone repo into local directory.

```
git clone https://github.com/DreamForSchools/Instructor-Assignment-Sorter.git
cd ./Instructor-Assignment-Sorter
git remote add origin https://github.com/DreamForSchools/Instructor-Assignment-Sorter.git
```

- Install required packages not cached on the github repo.

```
npm install
```

You can then start Coding.

The pages tab contains all the pages. With Next.js the route to the pages will be set relative to their position from /pages/. Example:
- ./pages/index.js => localhost:3000/
- ./pages/menu/schools.js => localhost:3000/menu/school
<br />
The ./pages/api, ./pages/_*.js are exceptions to these.<br />
Whenever refrecing a file/path from within a jsx object Next.js will assume 
./public as root. Example:
```
const addIcon = <link rel="icon" href="/dfslogo.svg" />
```
Where the file dfslogo.svg is located in ./public/dfslogo.svg.<br /><br />

The ./pages/api/ folder will contain APIs that will be deployed as serverless 
functions and wont be included in the client package. All the server code goes
there.

### Testing

To test the app you run:
```
npm run dev
```

This will run the app locally on localhost:3000

### Deploying Frontend

To deploy the app to vercel simply commit all the changes and push to the master
branch of the github repo.
```
git push origin master
```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started with Frontend

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Learn More about the Frontend

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy Frontend on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Hosting
The back end is hosted on [pythonanywhere.com](https://www.pythonanywhere.com/)<br />
The front end is hosted on [vercel.com](https://vercel.com/)<br />
Data is stored in Google's [Firebase database](https://firebase.google.com/)<br />
To gain access to accounts related to these websites please contact admins

# Tech Stacks
The front end is written in Next.js which is React front-end development web framework. It heavily relies on [Material-UI](https://material-ui.com/) React UI framework<br />
The back end is written in Python 3.7

# Important Facts
- The back end hosting website Python Anywhere hosts the website for free but it requires a log in at least once every three months and click the "Run until 3 months from today" button. Otherwise Python Anywhere will stop hosting the backend 

# Outstanding items
- Ability to save sorted roster as a pdf
- Ability to save multiple version of sorted roster
- Make show sort button bigger (more intuitive to use) 
- Add a warning before attempting resort

# Future improve
- In the sorted roster have MWF and TuTh have different color
- General front-end design changes to make the website more intuitive
  - Change the season text (located at upper-right corner) color to white
- Add carpool button 


# Contribution Rules

Never directly push requests to master branch in this repo. Make a branch and work on that with others and only push that from your local repo to this remote.After it is finally complete make a pull request here to merge it with the master branch.

## Old Branches Explained

Currently all the deployed code is in the master branch. The various mereged-finals and old-master branches make up all the experimental code from the previous team. This includes locally testing the backend. With the master branch the only way to do that is by directly uploading it and testing it live.
<br /><br />
Workflow Example: I wanted to improve the Save as PDF function. So first from my local repo I made a new local branch.
```
git clone https://github.com/DreamsForSchools/dfs-ias
cd dfs-ias
git checkout -b better-pdf
```
Then I pushed it up to remote and made a pull request(on GitHub).
```
git push origin better-pdf
```
Now in the pull request I mentioned several goals. As soon as these goals are met I will merge that branch into master.<br />
So while the request exists I will be working locally on the problem and pushing my changes to the new branch.
Other people can also contribute towards that goal. They only have to push to the better-pdf branch not master.
```
... some work ...
git commit -a 
git push origin better-pdf
```

### `Dependencies`

* Node.js, npm
* firebase-tools
* Works on Windows, Linux and MacOS 

Before starting you should log in to your firebase account in your firebase cli. cd into the root directory and execute the following commands.

```
npm install
```
```
npm run build
```
```
firebase deploy --only hosting
```

If you are having problem installing firebase follow this [link](https://firebase.google.com/docs/cli#install_the_firebase_cli) or do the folowing while inside the root directory. 
```
npm install firebase-tools
```
```
./node_modules/.bin/firebase login
```
Test if login was successful by performing the following. And checking your account's project list.
```
firebase projects:list
```
