import overpass
api = overpass.API()

response = api.get('node["name"="San Diego"]')

print(response)