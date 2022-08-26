import Button from "@mui/material/Button/Button";
import React, { Component, PropsWithChildren, useState } from "react";
import { MapkitProvider, Map, useMap, Marker } from 'react-mapkit'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { GeoNode } from "../../data/GeoNode/GeoNode";
import { getAutoCompleteLocationThunk } from "../../features/map/mapslice";

import './styles.css'

//leave for the future
export default function TripMap(props: { interestPoints: Array<GeoNode> }) {

    const token = ''

    const dispatch = useAppDispatch();

    const [iPs, setiPs] = useState(props.interestPoints)

    const UseMapExample = () => {
        const { map, mapProps, drawLine, setCenter, setRegion, setRotation, setVisibleMapRect, setTintColor, mapkit } = useMap()
        console.log("refreshed")
        setCenter([32.734179, -117.232955])
        setRegion({
            latitude: 32.734179,
            longitude: -117.232955,
            latitudeSpan: 0.5,
            longitudeSpan: 0.5,
        })

        setVisibleMapRect(
            [0, 0.2, 0.3, 0.3]
        )

        // setTintColor('#526649')

        return (
            <>
                <div className='map'>
                    <Button onClick={() => { console.log('aaa'); setRotation(50) }}>Debug</Button>
                    <Map
                        {...mapProps}
                    >
                        {
                            iPs.map((node) => {
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
        <MapkitProvider tokenOrCallback={token}>
            <UseMapExample />
        </MapkitProvider>
    )
}

//center={[37.415, -122.048333]}
//tokenOrCallback={'***REMOVED***'} 
