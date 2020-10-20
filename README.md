# Dreams For Schools - Instrutor App Sorterd

The follwing is the final deployed version of the S20 UCI team. 

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