import React, { useState } from 'react';

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

import './styles.css'

export default function TripSegment(props: { tripSegments: Array<TypeTripSegment> }) {
    const [activeTripSegmentName, setActiveTripSegmentName] = React.useState(
        props.tripSegments[0].name);
    const [openTripSegmentDialog, setOpenTripSegmentDialog] = React.useState(false);
    const [newTripSegmentName, setNewTripSegmentName] = React.useState('');

    const handleCloseTripSegmentDialog = () => {
        setOpenTripSegmentDialog(false);
    };

    const handleChangeActiveTripSegment = (event: SelectChangeEvent) => {
        let value = event.target.value;
        if (value == 'create' && props.tripSegments.length == 0) {
            setOpenTripSegmentDialog(true);
        }
        else {
            setActiveTripSegmentName(value);
        }
    };

    const dispatch = useAppDispatch();

    const handleAddSegment = () => {
        dispatch(addSegment({ name: newTripSegmentName }))
        handleCloseTripSegmentDialog();
    }

    const TripSegmentMenus = props.tripSegments.length == 0 ?
        <MenuItem value='create' key='None'>Create a trip segment!</MenuItem> : props.tripSegments.map((segment) =>
            <MenuItem value={segment.name} key={segment.name}>{segment.name}</MenuItem>
        );

    function TripSegmentNotes() {
        let notes = props.tripSegments.find((segment) => {
            return segment.name == activeTripSegmentName;
        })?.notes;

        return notes == undefined ?
            <div>Error, notes not found</div> :
            <Notes notes={notes} segment={activeTripSegmentName} />
    }

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
                <Grid>
                    <Button sx={{ m: 1 }} variant="contained"
                        endIcon={<AddIcon />} color="success"
                        onClick={() => { setOpenTripSegmentDialog(true) }}>
                        NEW SEGMENT
                    </Button>
                </Grid>
                <Grid>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel>Active Segment</InputLabel>
                        <Select
                            value={activeTripSegmentName}
                            onChange={handleChangeActiveTripSegment}
                            autoWidth
                            label="Active Segment"
                        >
                            {TripSegmentMenus}
                        </Select>
                    </FormControl>
                </Grid>
                <div>
                    <Typography variant="h5" gutterBottom component="div" className='title'>
                        Brainstorm Section
                    </Typography>
                    {TripSegmentNotes()}
                </div>

            </div>

        </div>
    );

}
