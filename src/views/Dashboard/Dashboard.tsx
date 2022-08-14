import React from 'react';
import Notes from '../../components/notes/notes';
import Typography from '@mui/material/Typography';
import type { Trip } from '../../data/Trip/Trip'

interface IProps {
    trip: Trip
}

const Dashboard: React.FC<IProps> = (props) => {
    return (
        <div>
            <Typography variant="h5" gutterBottom component="div" className='title'>
                Brainstorm Section
            </Typography>
            <Notes notes={props.trip.notes} />
        </div>

    )
}

export default Dashboard;