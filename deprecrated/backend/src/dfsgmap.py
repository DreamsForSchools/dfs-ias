GMAP_API_KEY = 'AIzaSyBY-fm0ztq4MIUIN73HnjB138Eq3_g-VL0'

import googlemaps
CLIENT = googlemaps.Client(GMAP_API_KEY)

def distance_between(addr_origin: str, addr_dest: list or str):
	res = CLIENT.distance_matrix(
		origins= addr_origin,
		destinations= addr_dest,
		mode= "driving"
	)

	ret_dict = dict()
	# print(res)
	for addr, row in zip(addr_origin, res['rows']):
		# print(row['elements'][0]['status'])
		if row['elements'][0]['status'] != "NOT_FOUND":
			ret_dict[addr] = row['elements'][0]['distance']['value']
		else:
			ret_dict[addr] = -1
			
	return ret_dict

if __name__ == "__main__":
	pass