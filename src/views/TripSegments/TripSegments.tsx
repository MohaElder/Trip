import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addSegment, setTripStatus, TripStatus, selectActiveSegmentIndex, setActiveSegmentIndex } from '../../features/trip/tripslice';

import type { TripSegment as TypeTripSegment } from '../../data/Trip/Trip';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Notes from '../../components/notes/notes';
import Calendar from '../../components/calendar/calendar';
import './styles.css'
import Container from '@mui/material/Container/Container';
import ModifyTripSegmentOverlay from '../../components/modifyTripSegmentOverlay/modifyTripSegmentOverlay';
import EditIcon from '@mui/icons-material/Edit';
import BudgetChart from '../../components/budgetChart/budgetChart';
import WarningPopUp from '../../components/warningPopUp/warningPopUp';
import Map from '../../components/map/map';
import MapLayer from '../../components/mapLayer/mapLayer';
import Stack from '@mui/system/Stack/Stack';

export default function TripSegment(props: { tripSegments: Array<TypeTripSegment> }) {

    const segmentIndex = useAppSelector(selectActiveSegmentIndex);
    const [activeTripSegmentIndex, setActiveTripSegmentIndex] = useState(segmentIndex);
    useEffect(() => { setActiveTripSegmentIndex(segmentIndex) }, [segmentIndex]);

    const dispatch = useAppDispatch();


    const handleChangeActiveTripSegment = (event: SelectChangeEvent) => {
        dispatch(setActiveSegmentIndex({ index: +event.target.value }));
    };

    const handleAddSegment = () => {
        dispatch(setTripStatus({ status: TripStatus.creatingSegment }));
    }

    function parseDate(): string {
        let startDate = new Date(props.tripSegments[activeTripSegmentIndex].startDate);
        let endDate = new Date(props.tripSegments[activeTripSegmentIndex].endDate);

        return (startDate.getMonth() + 1) + '.' + startDate.getDate() + ' - '
            + (endDate.getMonth() + 1) + '.' + endDate.getDate()
    }
    function handleEditSegment() {
        dispatch(setTripStatus({ status: TripStatus.editingSegment }));
    }


    return (
        <Container maxWidth="xl" sx={{ marginTop: 5, paddingBottom: 10 }}>
            <WarningPopUp />
            <ModifyTripSegmentOverlay segment={props.tripSegments[activeTripSegmentIndex]} segmentIndex={activeTripSegmentIndex} />
            <Typography variant="h3" sx={{ fontWeight: 600 }} component="div">{props.tripSegments[activeTripSegmentIndex].name}</Typography>
            <Typography variant="h5" gutterBottom component="div">{parseDate()}</Typography>
            <Stack sx={{marginBottom: '20px'}} direction="row" spacing={2}>
                <Button variant="contained"
                    endIcon={<EditIcon />} color="secondary" onClick={() => { handleEditSegment() }}>
                    EDIT SEGMENT
                </Button>
                <Button variant="contained"
                    endIcon={<AddIcon />} color="primary"
                    onClick={() => { handleAddSegment() }}>
                    NEW SEGMENT
                </Button>
            </Stack>
            <div>

                <Typography variant="h5" gutterBottom component="div">
                    Brainstorm Section
                </Typography>
                <Notes notes={props.tripSegments[activeTripSegmentIndex].notes} segmentIndex={activeTripSegmentIndex} />
                <Typography variant="h5" gutterBottom component="div" sx={{ paddingTop: 5 }}>
                    Trip Calendar
                </Typography>
                <Calendar tripSegment={props.tripSegments[activeTripSegmentIndex]} segmentIndex={activeTripSegmentIndex} />
                <Typography variant="h5" gutterBottom component="div" sx={{ paddingTop: 5 }}>
                    Budget
                </Typography>
                <BudgetChart tripSegment={props.tripSegments[activeTripSegmentIndex]} segmentIndex={activeTripSegmentIndex} />
                {/* <Typography variant="h5" gutterBottom component="div" sx={{ paddingTop: 5 }}>
                    Map
                </Typography> */}
                {/* <MapLayer segmentIndex={activeTripSegmentIndex} interestPoints={props.tripSegments[activeTripSegmentIndex].interestPoints}></MapLayer>
                <Map interestPoints={props.tripSegments[activeTripSegmentIndex].interestPoints}></Map> */}
            </div>
        </Container>
    );

}
