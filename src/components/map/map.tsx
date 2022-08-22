import React, { Component, PropsWithChildren } from "react";
import { MapkitProvider, Map, useMap, Marker } from 'react-mapkit'

import './styles.css'

export default function TripMap() {

    const token = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxBOVlSNFcyMjQifQ.eyJpYXQiOjE2NjExMzc2MjAuMjMzLCJpc3MiOiJOSFhWVFlCUU1VIn0.LfDn9tcHqJdVzMBqw8xg9aaSKsF1nq5ERrIGeMKlXpg4-GiY75HW4sGiO_IF-nt_5mr8ddEIu0KBr9-6vulITA'

    const UseMapExample = () => {
        const { map, setRotation, mapkit } = useMap()

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
                    }}>
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
