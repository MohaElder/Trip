import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';

import type { Itinerary, DailyItinerary } from '../../data/Itinerary/Itinerary';
import type { TripSegment } from '../../data/Trip/Trip';

import { updateItinenary, addItinenary } from '../../features/trip/tripslice';

import CommuteStack from '../commuterStack/commuterStack';
import StayStack from '../stayStack/stayStack';

function parseDate(date: string): string {
    var toParse = new Date(date);
    return (toParse.getMonth() + 1) + '.' + toParse.getDate()
}

export default function Calendar(props: { tripSegment: TripSegment, segmentIndex: number }) {
    const dispatch = useAppDispatch();

    const tripSegment = props.tripSegment;
    const segmentIndex = props.segmentIndex;

    function Row(props: { row: Itinerary, idx: number }) {
        const { row } = props;
        const [open, setOpen] = React.useState(true);

        const [editStart, setEditStart] = useState(false);
        const [editEnd, setEditEnd] = useState(false);
        const [editTripInfo, setEditTripInfo] = useState(false);
        const [editPs, setEditPs] = useState(false);
        const [start, setStart] = useState(props.row.start);
        const [end, setEnd] = useState(props.row.end);
        const [tripInfo, setTripInfo] = useState(props.row.tripInfo);
        const [ps, setPs] = useState(props.row.ps);


        function updateStart() {
            dispatch(updateItinenary({
                id: tripSegment.id,
                itinenaryId: props.row.id,
                start: start
            }))
            setEditStart(false)
        }

        function updateEnd() {
            dispatch(updateItinenary({
                id: tripSegment.id,
                itinenaryId: props.row.id,
                end: end
            }))
            setEditEnd(false)
        }

        function updateTripInfo() {
            dispatch(updateItinenary({
                id: tripSegment.id,
                itinenaryId: props.row.id,
                tripInfo: tripInfo
            }))
            setEditTripInfo(false)
        }

        function updatePs() {
            dispatch(updateItinenary({
                id: tripSegment.id,
                itinenaryId: props.row.id,
                ps: ps
            }))
            setEditPs(false)
        }

        function DayIt(props: { day: DailyItinerary, itIdx: number, idx: number }) {
            return (<TableRow key={props.day.date}>
                <TableCell component="th" scope="row">
                    {props.day.date}
                </TableCell>
                <TableCell>{props.day.location}</TableCell>
                <TableCell>{props.day.tripInfo}</TableCell>
                <TableCell>
                    <CommuteStack segmentIndex={segmentIndex} commuteInfo={props.day.commuteInfo} itineraryIndex={props.itIdx} dayItineraryIndex={props.idx} />
                </TableCell>
            </TableRow>)
        }

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <Typography variant="h6" component="div">
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            {parseDate(row.date)}
                        </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {
                            editStart ?
                                <TextField autoFocus={true} value={start} id="standard-basic" onChange={(e) => { setStart(e.target.value) }}
                                    onBlur={() => { updateStart() }} placeholder='start' variant="standard" />
                                :
                                <span onClick={() => { setEditStart(true) }}>{start}</span>
                        }

                    </TableCell>
                    <TableCell>{
                        editEnd ?
                            <TextField autoFocus={true} value={end} id="standard-basic" onChange={(e) => { setEnd(e.target.value) }}
                                onBlur={() => { updateEnd() }} placeholder='end' variant="standard" />
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
                                onBlur={() => { updateTripInfo() }}
                                placeholder='start'
                                variant="standard"
                            />
                            :
                            <span onClick={() => { setEditTripInfo(true) }}>{tripInfo}</span>
                    }</TableCell>
                    <TableCell>
                        <CommuteStack segmentIndex={segmentIndex} commuteInfo={row.commuteInfo} itineraryIndex={props.idx} />
                    </TableCell>
                    <TableCell><StayStack segmentIndex={segmentIndex} stayInfo={row.stayInfo} itineraryIndex={props.idx} /></TableCell>
                    <TableCell>{
                        editPs ?
                            <TextField
                                autoFocus={true}
                                value={ps}
                                multiline
                                rows={4}
                                onChange={(e) => { setPs(e.target.value) }}
                                onBlur={() => { updatePs() }}
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
                                        {row.dailyItinerary.map((itinerary, idx) => (
                                            <DayIt day={itinerary} key={idx} idx={props.idx} itIdx={idx} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    const rows = props.tripSegment.itineraries.map((itinerary, idx) => (
        <Row key={itinerary.date} row={itinerary} idx={idx} />
    ))

    function handleNewItinenary() {
        dispatch(addItinenary({ segmentIndex: props.segmentIndex }))
    }

    return (
        <Paper sx={{ m: 5 }}>
            <Button onClick={handleNewItinenary} variant="contained" endIcon={<AddIcon />} sx={{ m: 1 }}>
                New Day
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="calendar">
                    <TableHead>
                        <TableRow>
                            <TableCell> Date </TableCell>
                            <TableCell> Start </TableCell>
                            <TableCell> Goal </TableCell>
                            <TableCell> Brief </TableCell>
                            <TableCell> Transportation </TableCell>
                            <TableCell> Stay </TableCell>
                            <TableCell> Note </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}