import React, { useState } from 'react';
import Notes from '../../components/notes/notes';
import Typography from '@mui/material/Typography';
import { Trip } from '../../data/Trip/Trip'
import Container from '@mui/material/Container/Container';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Button from '@mui/material/Button/Button';
import EditIcon from '@mui/icons-material/Edit';
import WelcomeOverlay from '../welcomeOverlay/welcomeOverlay';
import { setTripStatus, TripStatus } from '../../features/trip/tripslice';
import TripCalendar from '../../components/tripCalendar/tripCalendar';

interface IProps {
    trip: Trip
}

const Dashboard: React.FC<IProps> = (props) => {

    const dispatch = useAppDispatch();

    function parseDate(): string {
        let startDate = new Date(props.trip.startDate);
        let endDate = new Date(props.trip.endDate);

        return (startDate.getMonth() + 1) + '.' + startDate.getDate() + ' - '
            + (endDate.getMonth() + 1) + '.' + endDate.getDate()
    }

    const [editTrip, setEditTrip] = useState(false)

    function handleEditTrip() {
        setEditTrip(true)
        dispatch(setTripStatus({ status: TripStatus.editing }));
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: 5, paddingBottom: 10 }}>
            {editTrip ? <WelcomeOverlay /> : <></>}
            <Typography variant="h3" sx={{ fontWeight: 600 }} component="div">
                {props.trip.name}
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                {parseDate()}
            </Typography>
            <Button sx={{ marginBottom: 5 }} variant="contained"
                endIcon={<EditIcon />} color="secondary" onClick={() => { handleEditTrip() }}>
                EDIT TRIP
            </Button>
            <Typography variant="h5" gutterBottom component="div">
                Brainstorm Section
            </Typography>
            <Notes notes={props.trip.notes} />
            <Typography variant="h5" gutterBottom component="div" sx={{ paddingTop: 5 }}>
                Trip Calendar
            </Typography>
            <TripCalendar trip={props.trip} />
        </Container>

    )
}

export default Dashboard;