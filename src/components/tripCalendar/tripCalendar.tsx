import { useAppDispatch } from '../../app/hooks';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import type { Trip } from '../../data/Trip/Trip';
import Itinenary from '../Itinenary/Itinenary';

export default function Calendar(props: { trip: Trip }) {
    const dispatch = useAppDispatch();

    const allItinenaries = props.trip.tripSegments.map(
        (segment) => { return segment.itineraries }
    )

    const mergedItinenaries = allItinenaries.reduce((arr, itinenary) => {
        return [...arr, ...itinenary]
    })

    const Itineraries = mergedItinenaries.map((itinerary, idx) => (
                <Itinenary key={itinerary.date}
                    viewOnly={true}
                    segmentIndex={0}
                    itinenary={itinerary}
                    itIdx={idx} />
            ))

    return (
        <Paper>
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