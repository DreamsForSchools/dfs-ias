# Dreams For Schools - Instrutor App Sorterd

This app is designed to be used by Dreams for Schools administratiors. It helps them assign instructors to schools based on several heuristics. 

## Contribution Rules

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

## Testing

### Testing Frontend

cd into root directory and execute the following commands.

1. `npm install`
2. `npm start`

The test site should be deployed in http://localhost:3000

## Deploying

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
<br /><br />
For the backend upload the code directly to the [site](pythonanywhere.com).
