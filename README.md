# Dreams For Schools - Instrutor App Sorterd

The follwing is the final deployed version of the S20 UCI team. 

## Contribution Rules

Never directly push requests to master branch in this repo. Make a branch and work on that with others and only push that from your local repo to this remote.After it is finally complete make a pull request here to merge it with the master branch.

## Old Branches Explained

Currently all the deployed code is in the master branch. The various mereged-finals and old-master make up all the experimental code from the previous team. This includes locally testing the backend. With the master branch the only way to do that is by directly uploading it and testing it live.

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