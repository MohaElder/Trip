import React, { Component, PropsWithChildren } from "react";
import { MapkitProvider, Map, useMap, Marker } from 'react-mapkit'

import './styles.css'

export default function TripMap() {

    const token = '***REMOVED***'

    const UseMapExample = () => {
        const { map, setRotation, mapkit } = useMap()

        // var search = new mapkit.Search({ region: map.region });

        // search.search("coffee shop", function (error: any, data: any) {
        //     if (error) {
        //         // Handle search error
        //         return;
        //     }
        //     var annotations = data.places.map(function (place: any) {
        //         var annotation = new mapkit.MarkerAnnotation(place.coordinate);
        //         annotation.title = place.name;
        //         annotation.subtitle = place.formattedAddress;
        //         annotation.color = "#9B6134";
        //         return annotation;
        //     });
        //     map.showItems(annotations);
        // });


        return (
            <>
                {/* <button onClick={() => map.setRotationAnimated(50)}>rotate to 50deg!</button>
                <button onClick={() => setRotation(50)}>same as the above, but using the react-mapkit provided function.</button> */}
                <div className='map'>
                    <Map center={[32.734179, -117.232955]} region={{
                        latitude: 32.734179,
                        longitude: -117.232955,
                        latitudeSpan: 0.5,
                        longitudeSpan: 0.5,
                    }}
                        tintColor={'#526649'}
                    >
                        <Marker
                            latitude={32.734179}
                            longitude={-117.232955}
                            title={'Tea here!'}
                            subtitle={'coffee too ☕'}
                        /></Map>
                </div>

            </>
        )
    }

    return (
        <MapkitProvider tokenOrCallback={token}>
            <UseMapExample />
        </MapkitProvider>
    )
}

//center={[37.415, -122.048333]}
//tokenOrCallback={'***REMOVED***'} 
