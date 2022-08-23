const api_key = '5b3ce3597851110001cf624848973c684d0342fc86f77ec0aaeb36af';
const api_url = 'https://api.openrouteservice.org';

export function getAutoCompleteLocation(str: string) {
    fetch(api_url + '/geocode/autocomplete?' + 'api_key=' + api_key + '&text=' + str)
        .then(data => data.json()) // Parsing the data into a JavaScript object
        .then(json => { console.log(json.features.map((feature: any) => { return { properties: feature.properties, coordinate: feature.geometry } })) }) // Displaying the stringified data in an alert popup
}
