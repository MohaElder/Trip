import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { Itinerary } from '../../data/Itinerary/Itinerary';

import { updateItinenary } from '../../features/trip/tripslice';

import CommuteStack from '../commuterStack/commuterStack';
import StayStack from '../stayStack/stayStack';

import DayIt from '../DayItinenary/DayItinenary';

export default function Itinenary(props: {
    segmentIndex: number, itinenary: Itinerary, idx: number
}) {

    const dispatch = useAppDispatch();

    function parseDate(date: string): string {
        var toParse = new Date(date);
        return (toParse.getMonth() + 1) + '.' + toParse.getDate()
    }

    const [open, setOpen] = React.useState(props.itinenary.open);

    const [editStart, setEditStart] = useState(false);
    const [editEnd, setEditEnd] = useState(false);
    const [editTripInfo, setEditTripInfo] = useState(false);
    const [editPs, setEditPs] = useState(false);
    const [start, setStart] = useState(props.itinenary.start);
    const [end, setEnd] = useState(props.itinenary.end);
    const [tripInfo, setTripInfo] = useState(props.itinenary.tripInfo);
    const [ps, setPs] = useState(props.itinenary.ps);

    function updateItinenaryInfo(type: string) {
        dispatch(updateItinenary({
            tripSegmentIndex: props.segmentIndex,
            itinenaryIndex: props.idx,
            start: start,
            end: end,
            tripInfo: tripInfo,
            ps: ps,
            open: !open,
        }))
        switch (type) {
            case 'start':
                setEditStart(false)
                break;
            case 'end':
                setEditEnd(false)
                break;
            case 'tripInfo':
                setEditTripInfo(false)
                break;
            case 'ps':
                setEditPs(false)
                break;
            case 'open':
                setOpen(!open);
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Typography variant="h6" component="div">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {updateItinenaryInfo('open')}}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                        {parseDate(props.itinenary.date)}
                    </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                    {
                        editStart ?
                            <TextField autoFocus={true} value={start} id="standard-basic" onChange={(e) => { setStart(e.target.value) }}
                                onBlur={() => { updateItinenaryInfo('start') }} placeholder='start' variant="standard" />
                            :
                            <span onClick={() => { setEditStart(true) }}>{start}</span>
                    }
                </TableCell>
                <TableCell>{
                    editEnd ?
                        <TextField autoFocus={true} value={end} id="standard-basic" onChange={(e) => { setEnd(e.target.value) }}
                            onBlur={() => { updateItinenaryInfo('end') }} placeholder='end' variant="standard" />
                        :
                        <span onClick={() => { setEditEnd(true) }}>{end}</span>
                }</TableCell>
                <TableCell>{
                    editTripInfo ?
                        <TextField
                            autoFocus={true}
                            value={tripInfo}
                            multiline
                            rows={4}
                            onChange={(e) => { setTripInfo(e.target.value) }}
                            onBlur={() => { updateItinenaryInfo('tripInfo') }}
                            placeholder='start'
                            variant="standard"
                        />
                        :
                        <span onClick={() => { setEditTripInfo(true) }}>{tripInfo}</span>
                }</TableCell>
                <TableCell>
                    <CommuteStack segmentIndex={props.segmentIndex} commuteInfo={props.itinenary.commuteInfo} itineraryIndex={props.idx} />
                </TableCell>
                <TableCell><StayStack segmentIndex={props.segmentIndex} stayInfo={props.itinenary.stayInfo} itineraryIndex={props.idx} /></TableCell>
                <TableCell>{
                    editPs ?
                        <TextField
                            autoFocus={true}
                            value={ps}
                            multiline
                            rows={4}
                            onChange={(e) => { setPs(e.target.value) }}
                            onBlur={() => { updateItinenaryInfo('ps') }}
                            placeholder='start'
                            variant="standard"
                        />
                        :
                        <span onClick={() => { setEditPs(true) }}>{ps}</span>
                }</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                For the Day
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Info</TableCell>
                                        <TableCell>Transportation</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.itinenary.dailyItinerary.map((itinerary, idx) => (
                                        <DayIt day={itinerary} key={idx} segmentIndex={props.segmentIndex} idx={props.idx} itIdx={idx} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}