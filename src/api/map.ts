const api_key = '***REMOVED***';
const api_url = 'https://api.openrouteservice.org';

export function getAutoCompleteLocation(str: string) {
    fetch(api_url + '/geocode/autocomplete?' + 'api_key=' + api_key + '&text=' + str)
        .then(data => data.json()) // Parsing the data into a JavaScript object
        .then(json => { console.log(json.features.map((feature: any) => { return { properties: feature.properties, coordinate: feature.geometry } })) }) // Displaying the stringified data in an alert popup
}
