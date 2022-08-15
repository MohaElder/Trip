import React from 'react';
import Notes from '../../components/notes/notes';
import Typography from '@mui/material/Typography';
import { trip, Trip } from '../../data/Trip/Trip'

interface IProps {
    trip: Trip
}

const Dashboard: React.FC<IProps> = (props) => {
    return (
        <div>
            <Typography variant="h3" gutterBottom component="div" className='title'>
                {props.trip.name}
            </Typography>
            <Typography variant="h5" gutterBottom component="div" className='title'>
                Brainstorm Section
            </Typography>
            <Notes notes={props.trip.notes} />
        </div>

    )
}

export default Dashboard;