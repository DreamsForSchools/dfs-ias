'''
This module is for authentication when accessing the 
firebase database.
'''

import pyrebase

'''
Authentication credentials to access the firebase database.
'''
auth = {
    "apiKey": "AIzaSyD5xRlDFsIss2U9nR-tSriQIRwBzPmvQ5k",
    "authDomain": "dfs-ias.firebaseapp.com",
    "databaseURL": "https://dfs-ias.firebaseio.com",
    "projectId": "dfs-ias",
    "storageBucket": "dfs-ias.appspot.com",
    "messagingSenderId": "44070275331",
    "appId": "1:44070275331:web:a825361e868c7e63824136"
}

'''
Initializes firebase application
'''
def initialize_fb():
	return pyrebase.initialize_app(auth)

'''
Get access to the realtime database in firebase
'''
def get_db():
	firebase = initialize_fb()
	return firebase.database()