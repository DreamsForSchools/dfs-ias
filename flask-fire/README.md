Hosting URL:
https://dfs-ias.web.app/

To run:
1) Install Google Cloud CLI from this link: https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe
2) Once installed, run "gcloud init"
 i) For credentials, use the "technology@dreamsforschools.org" email address
 ii) The project id should be "dfs-ias"
3) Run "gcloud builds submit --tag gcr.io/dfs-ias/flask-fire" to build any changes that are done to the server code files
4) Run "gcloud beta run deploy --image gcr.io/dfs-ias/flask-fire" to deploy to Cloud Run.
5) Run "firebase deploy" to deploy it on the firebase server

Installing Firebase Tools and enable Firebase Hosting (in case there is error from above steps):
1) Run "npm install -D firebase-tools"
2) Run ".\node_modules\.bin\firebase init hosting" which will create a node_modules folder
3) From the dropdown menu, select the "dfs-ias" as the project id.
4) Use the folder "static" as the public directory.
5) Put "N" for configure as a single-page app
6) Open up firebase.json file from the root directory and add this:
	
{
  "hosting": {
    "public": "static",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [{
      "source": "**",
      "run": {
        "serviceId": "flask-fire"
      }
    }]
  }
}
7) Run "./node_modules/.bin/firebase serve" to serve locally
8) Open localhost:5000 to see the web page load up locally

NOTE: Instructions were taken from the following guide: https://medium.com/firebase-developers/hosting-flask-servers-on-firebase-from-scratch-c97cfb204579
If needed, refer to this guide for more elaboration on these instructions.