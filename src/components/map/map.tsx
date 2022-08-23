import React, { Component, PropsWithChildren, useState } from "react";
import { MapkitProvider, Map, useMap, Marker } from 'react-mapkit'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { GeoNode } from "../../data/GeoNode/GeoNode";
import { getAutoCompleteLocationThunk } from "../../features/map/mapslice";

import './styles.css'

export default function TripMap(props: { interestPoints: Array<GeoNode> }) {

    const token = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxBOVlSNFcyMjQifQ.eyJpYXQiOjE2NjExMzc2MjAuMjMzLCJpc3MiOiJOSFhWVFlCUU1VIn0.LfDn9tcHqJdVzMBqw8xg9aaSKsF1nq5ERrIGeMKlXpg4-GiY75HW4sGiO_IF-nt_5mr8ddEIu0KBr9-6vulITA'

    const dispatch = useAppDispatch();

    const UseMapExample = () => {
        const { map, setCenter, mapkit } = useMap()
        return (
            <>
                <div className='map'>
                    <Map
                        tokenOrCallback={token}
                        visibleMapRect={[0, 0.2, 0.3, 0.3]}
                        center={[32.734179, -117.232955]} region={{
                            latitude: 32.734179,
                            longitude: -117.232955,
                            latitudeSpan: 0.5,
                            longitudeSpan: 0.5,
                        }}
                        tintColor={'#526649'}
                    >
                        {
                            props.interestPoints.map((node) => {
                                return <Marker
                                    
                                    latitude={node.coordinate.coordinates[1]}
                                    longitude={node.coordinate.coordinates[0]}
                                    title={node.properties.label}
                                    subtitle={'coffee too ☕'}
                                />
                            })
                        }
                    </Map>
                </div>
            </>
        )
    }

    return (

        <UseMapExample />

    )
}

//center={[37.415, -122.048333]}
//tokenOrCallback={'eyJhbGciOiJIUzI1NiIsImtpZCI6IkxBOVlSNFcyMjQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJOSFhWVFlCUU1VIiwiaWF0IjoxNDM3MTc5MDM2LCJleHAiOjE0OTMyOTgxMDB9.slpGCPIkAvxBFct_CyT87roI0vovJdQpPWCrpDjjloI'} 
