The following is a guide to running the Dreams For Schools web application backend locally.
1. git clone https://github.com/DreamsForSchools/dfs-ias
2. cd dfs-ias/server
3. python3 -m venv .
4. source bin/activate
5. pip install -r requirements.txt
6. cd src
7. Add GMAP_API_KEY key to dfsgmap.py
8. flask run