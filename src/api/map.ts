import { GeoNode } from "../data/GeoNode/GeoNode";

const api_key = '***REMOVED***';
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