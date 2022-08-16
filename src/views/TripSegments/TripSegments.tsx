import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSegment } from '../../features/trip/tripslice';

import type { TripSegment as TypeTripSegment } from '../../data/Trip/Trip';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Notes from '../../components/notes/notes';
import Calendar from '../../components/calendar/calendar';
import './styles.css'

export default function TripSegment(props: { tripSegments: Array<TypeTripSegment> }) {
    const [openTripSegmentDialog, setOpenTripSegmentDialog] = useState(props.tripSegments.length === 0);
    const [activeTripSegmentIndex, setActiveTripSegmentIndex] = useState(0);
    const [newTripSegmentName, setNewTripSegmentName] = useState('');

    const dispatch = useAppDispatch();

    const handleCloseTripSegmentDialog = () => {
        setOpenTripSegmentDialog(false);
    };

    const handleChangeActiveTripSegment = (event: SelectChangeEvent) => {
        setActiveTripSegmentIndex(+event.target.value);
    };

    const handleAddSegment = () => {
        dispatch(addSegment({ name: newTripSegmentName }));
        setActiveTripSegmentIndex(props.tripSegments.length - 1);
        handleCloseTripSegmentDialog();
    }

    const TripSegmentMenus =
        <Select
            value={activeTripSegmentIndex.toString()}
            onChange={handleChangeActiveTripSegment}
            autoWidth
            label="Active Segment"
        >
            {props.tripSegments.map((segment, idx) =>
                <MenuItem value={idx} key={segment.id}>{segment.name}</MenuItem>)}
        </Select>

    const TripSegmentContent =
        <div>
            <Typography variant="h5" gutterBottom component="div" className='title'>
                Brainstorm Section
            </Typography>
            <Notes notes={props.tripSegments[activeTripSegmentIndex].notes} segmentIndex={activeTripSegmentIndex} />
            <Typography variant="h5" gutterBottom component="div" className='title' sx={{ paddingTop: 5 }}>
                Trip Calendar
            </Typography>
            <Calendar tripSegment={props.tripSegments[activeTripSegmentIndex]} />
        </div>

    return (
        <div>
            <Dialog open={openTripSegmentDialog} onClose={handleCloseTripSegmentDialog}>
                <DialogTitle>New Trip Segment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Creating a new trip segment helps you to better
                        manage your trips in a block wise mindset
                    </DialogContentText>
                    <TextField
                        onChange={(e) => { setNewTripSegmentName(e.target.value) }}
                        autoFocus
                        margin="dense"
                        label="Trip Segment Name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTripSegmentDialog}>Cancel</Button>
                    <Button onClick={handleAddSegment}>Add</Button>
                </DialogActions>
            </Dialog>
            <div className='button-container'>
                <Grid  >
                    <Button sx={{ m: 1 }} variant="contained"
                        endIcon={<AddIcon />} color="success"
                        onClick={() => { setOpenTripSegmentDialog(true) }}>
                        NEW SEGMENT
                    </Button>
                </Grid>
            </div>
            <div>
                <Grid>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel>Active Segment</InputLabel>
                        {TripSegmentMenus}
                    </FormControl>
                </Grid>
                {TripSegmentContent}
            </div>
        </div>
    );

}
