import React, { useState } from 'react';

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

import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';

import type { Itinerary } from '../../data/Itinerary/Itinerary';
import type { TripSegment } from '../../data/Trip/Trip';


import CommuteStack from '../commuterStack/commuterStack';
import StayStack from '../stayStack/stayStack';

function parseDate(date: string): string {
    var toParse = new Date(date);
    return (toParse.getMonth() + 1) + '.' + toParse.getDate()
}



export default function Calendar(props: { tripSegment: TripSegment }) {
    const tripSegment = props.tripSegment;

    function Row(props: { row: Itinerary }) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

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
                        {row.start}
                    </TableCell>
                    <TableCell>{row.end}</TableCell>
                    <TableCell>{row.tripInfo}</TableCell>
                    <TableCell>
                        <CommuteStack segmentName={tripSegment.name} commuteInfo={row.commuteInfo} itineraryId={row.id} />
                    </TableCell>
                    <TableCell><StayStack segmentName={tripSegment.name} stayInfo={row.stayInfo} itineraryId={row.id} /></TableCell>
                    <TableCell>{row.ps}</TableCell>
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
                                        {row.dailyItinerary.map((itinerary) => (
                                            <TableRow key={itinerary.date}>
                                                <TableCell component="th" scope="row">
                                                    {itinerary.date}
                                                </TableCell>
                                                <TableCell>{itinerary.location}</TableCell>
                                                <TableCell>{itinerary.tripInfo}</TableCell>
                                                {/* <TableCell>
                                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                                </TableCell> */}
                                            </TableRow>
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

    const rows = props.tripSegment.itineraries.map((itinerary) => (
        <Row key={itinerary.date} row={itinerary} />
    ))

    return (
        <Paper sx={{ m: 5 }}>
            <Button variant="contained" endIcon={<AddIcon />} sx={{ m: 1 }}>
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