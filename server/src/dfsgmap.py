GMAP_API_KEY = ''

import googlemaps
CLIENT = googlemaps.Client(GMAP_API_KEY)

def distance_between(addr_origin: str, addr_dest: str):
	ret_dict = dict()
	res = CLIENT.distance_matrix(
		origins= addr_origin,
		destinations= addr_dest,
		mode= "driving"
	)

	# for k, v in res.items():
	# 	print(k, ": ", v)
	# print(res['rows'][0]['elements'][0]['distance'])
	# print(res['rows'][0]['elements'][0]['distance']['value'])
	# print()

	# for row in res['rows']:
	# 	print(row['elements'][0]['distance']['value'])


	# return res['rows'][0]['elements'][0]['distance']['value']
	return 0

if __name__ == "__main__":
	pass