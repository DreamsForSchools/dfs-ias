import fbupload
import fbdelete
import time

SEASON = "bigboitest"

if __name__ == "__main__":
    s = {
		"name": "school3",
		"address": "123 street", 
		"is_virtual": True,
		"programs": ["P1", "P3"],
		"special_language_request": ["eng", "vie"],
		"number_of_instructors": 0,
		"program_time_flexibility": False
	}

    p = {
		"name": "AJ2",
		"assigned_institutions": [{
			"SCH2": [{"instructor name": {"locked": True}}]
		}]
	}

    i = {
        "name": "Thornton",
        "major": "computer science",
		"university": "university of california irvine"
    }

    fbupload.upload_school(SEASON, s)
    time.sleep(6)
    fbupload.upload_program(SEASON, p)
    time.sleep(6)
    fbupload.upload_instructor(SEASON, i)
    time.sleep(6)
    fbdelete.delete_school(SEASON, s["name"])
    time.sleep(6)
    fbdelete.delete_program(SEASON, p["name"])
    time.sleep(6)
    fbdelete.delete_instructor(SEASON, i)
    time.sleep(6)
    fbdelete.delete_instructor(SEASON, i)
