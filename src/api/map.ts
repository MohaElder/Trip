import { GeoNode } from "../data/GeoNode/GeoNode";

const api_key = '5b3ce3597851110001cf624848973c684d0342fc86f77ec0aaeb36af';
const api_url = 'https://api.openrouteservice.org';

export function getAutoCompleteLocation(str: string) {
    return new Promise<Array<GeoNode>>((resolve) =>
        fetch(api_url + '/geocode/autocomplete?'
            + 'api_key='
            + api_key
            + '&text='
            + str)
            .then(data => data.json()) // Parsing the data into a JavaScript object
            .then(
                json => {
                    resolve(json.features.map(
                        (feature: any) => {
                            return {
                                properties: feature.properties,
                                coordinate: feature.geometry
                            }
                        }))
                })
    );
}

export function getDirection(coordinates: Array<[number, number]>) {
    return new Promise<Object>((resolve) =>
        fetch(api_url + '/v2/directions/driving-car',
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.

                headers: {
                    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                    'Authorization': api_key,
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: '{"coordinates":[[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]]}'
            }
        )
            .then(data => data.json()) // Parsing the data into a JavaScript object
            .then(
                json => {
                    resolve(json)
                })
    );
}