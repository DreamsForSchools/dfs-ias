GMAP_API_KEY = ''

import googlemaps
CLIENT = googlemaps.Client(GMAP_API_KEY)

def distance_between(addr_origin: str, addr_dest: list or str):
	res = CLIENT.distance_matrix(
		origins= addr_origin,
		destinations= addr_dest,
		mode= "driving"
	)

	ret_dict = dict()
	for addr, row in zip(addr_origin, res['rows']):
		ret_dict[addr] = row['elements'][0]['distance']['value']

	return ret_dict

if __name__ == "__main__":
	pass