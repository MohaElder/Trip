import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import type { DailyItinerary } from '../../data/Itinerary/Itinerary';

import { updateDayItinenary, deleteDayItinenary } from '../../features/trip/tripslice';

import CommuteStack from '../commuterStack/commuterStack';
import TextField from '@mui/material/TextField';

export default function DayIt(props: { day: DailyItinerary, segmentIndex: number, itIdx: number, dayIdx: number }) {

    const dispatch = useAppDispatch();

    const [editLocation, setEditLocation] = useState(false);
    const [editTripInfo, setEditTripInfo] = useState(false);
    const [editTime, setEditTime] = useState(false);
    const [location, setLocation] = useState(props.day.location);
    const [tripInfo, setTripInfo] = useState(props.day.tripInfo);
    const [time, setTime] = useState(props.day.date);

    function updateItinenaryInfo(type: string) {
        dispatch(updateDayItinenary({
            tripSegmentIndex: props.segmentIndex,
            itinenaryIndex: props.itIdx,
            dayItinenaryIndex: props.dayIdx,
            location: location,
            tripInfo: tripInfo,
        }))
        switch (type) {
            case 'time':
                setEditTime(false)
                break;
            case 'location':
                setEditLocation(false)
                break;
            case 'tripInfo':
                setEditTripInfo(false)
                break;
            default:
                break;
        }
    }

    return (<TableRow key={props.day.date}>
        <TableCell component="th" scope="row">
            {
                editTime ?
                    <TextField autoFocus={true} value={time} id="standard-basic" onChange={(e) => { setTime(e.target.value) }}
                        onBlur={() => { updateItinenaryInfo('time') }} placeholder='time' variant="standard" />
                    :
                    <span onClick={() => { setEditTime(true) }}>{time}</span>
            }
        </TableCell>
        <TableCell>{
            editLocation ?
                <TextField autoFocus={true} value={location} id="standard-basic" onChange={(e) => { setLocation(e.target.value) }}
                    onBlur={() => { updateItinenaryInfo('location') }} placeholder='location' variant="standard" />
                :
                <span onClick={() => { setEditLocation(true) }}>{location}</span>
        }</TableCell>
        <TableCell>{
            editTripInfo ?
                <TextField autoFocus={true} value={tripInfo} id="standard-basic" onChange={(e) => { setTripInfo(e.target.value) }}
                    onBlur={() => { updateItinenaryInfo('tripInfo') }} placeholder='trip info' variant="standard" />
                :
                <span onClick={() => { setEditTripInfo(true) }}>{tripInfo}</span>
        }</TableCell>
        <TableCell>
            <CommuteStack segmentIndex={props.segmentIndex} commuteInfo={props.day.commuteInfo} itineraryIndex={props.itIdx} dayItineraryIndex={props.dayIdx} />
        </TableCell>
        <TableCell align='right'>
            <IconButton aria-label="delete" color="error"
                onClick={() => {
                    dispatch(deleteDayItinenary({
                        tripSegmentIndex: props.segmentIndex,
                        itinenaryIndex: props.itIdx,
                        dayItinenaryIndex: props.dayIdx,
                    }))
                }}>
                <DeleteIcon />
            </IconButton>
        </TableCell>
    </TableRow>)
}