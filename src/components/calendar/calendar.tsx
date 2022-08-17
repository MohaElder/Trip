import { useAppDispatch } from '../../app/hooks';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';

import type { TripSegment } from '../../data/Trip/Trip';
import Itinenary from '../Itinenary/Itinenary';

import { addItinenary } from '../../features/trip/tripslice';

export default function Calendar(props: { tripSegment: TripSegment, segmentIndex: number }) {
    const dispatch = useAppDispatch();
    const Itineraries = props.tripSegment.itineraries.map((itinerary, idx) => (
        <Itinenary key={itinerary.date}
            segmentIndex={props.segmentIndex}
            itinenary={itinerary}
            itIdx={idx} />
    ))

    function handleNewItinenary() {
        dispatch(addItinenary({ segmentIndex: props.segmentIndex }))
    }

    return (
        <Paper>
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
                        {Itineraries}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}