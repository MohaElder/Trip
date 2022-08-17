import React from 'react';
import Notes from '../../components/notes/notes';
import Typography from '@mui/material/Typography';
import { Trip } from '../../data/Trip/Trip'
import Container from '@mui/material/Container/Container';

interface IProps {
    trip: Trip
}

const Dashboard: React.FC<IProps> = (props) => {
    return (
        <Container maxWidth="xl" sx={{marginTop: 5, paddingBottom: 10}}>
            <Typography variant="h3" sx={{ fontWeight: 600 }} gutterBottom component="div">
                {props.trip.name}
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                Brainstorm Section
            </Typography>
            <Notes notes={props.trip.notes} />
        </Container>

    )
}

export default Dashboard;