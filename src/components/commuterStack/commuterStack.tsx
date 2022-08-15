import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Stack } from '@mui/system';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import SubwayIcon from '@mui/icons-material/Subway';
import CardActionArea from '@mui/material/CardActionArea/CardActionArea';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

import { CommuteInfo } from '../../data/CommuteInfo/CommuteInfo';
import { updateCommuteInfo } from '../../features/trip/tripslice';

export default function CommuteStack(props: { segmentName: string, itineraryId: string, commuteInfo: CommuteInfo | null }) {

    const dispatch = useAppDispatch();

    const [modifyCommute, setModifyCommute] = useState(false)
    const [departTime, setDepartTime] = useState<string | undefined>(props.commuteInfo?.departTime);
    const [arrivalTime, setArrivalTime] = useState<string | undefined>(props.commuteInfo?.arrivalTime);
    const [rideType, setRideType] = useState<string>('Car');
    const [code, setCode] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const rideMap = new Map([
        ['Car', <DirectionsCarIcon />],
        ['RV', <RvHookupIcon />],
        ['Bus', <DirectionsBusIcon />],
        ['Train', <TrainIcon />],
        ['Walk', <DirectionsWalkIcon />],
        ['Plane', <AirplanemodeActiveIcon />],
        ['Boat', <DirectionsBoatIcon />],
        ['Metro', <SubwayIcon />],
        ['Bike', <DirectionsBikeIcon />],
        ['Motorcycle', <TwoWheelerIcon />]
    ])

    const rideButtons = () => {
        let ret: JSX.Element[] = []
        rideMap.forEach((v, k) => {
            ret.push(
                <FormControlLabel value={k} control={<Radio />} label={v} />
            )
        })
        return ret;
    }

    function toDateString(str: string | undefined) {
        let date = new Date()
        if (str !== undefined) {
            let arr = str.split(':')
            date.setHours(+arr[0]);
            date.setMinutes(+arr[1]);
        }
        return date.toString()
    }

    function toPlainDateTime(str: string | undefined) {
        if (str !== undefined) {
            let dateStr = new Date(str).toTimeString().split(':')
            return dateStr[0] + ':' + dateStr[1]
        }
    }

    function handleModifyCommute() {
        setModifyCommute(false);
        if (departTime !== undefined && arrivalTime !== undefined) {
            dispatch(updateCommuteInfo({
                segmentName: props.segmentName,
                itinenaryId: props.itineraryId,
                ride: rideType,
                code: code,
                location: location,
                departTime: departTime,
                arrivalTime: arrivalTime,
            }))
        }
    }

    const dialog =
        <Dialog open={modifyCommute}>
            <DialogTitle sx={{ textAlign: 'center', paddingTop: 5 }}>
                TRANSPORTATION
            </DialogTitle>
            <DialogContent sx={{ paddingLeft: 10, paddingRight: 10 }}>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>I'm taking...</FormLabel>
                        <RadioGroup row value={rideType}
                            onChange={(e) => { setRideType(e.target.value) }}>
                            {rideButtons()}
                        </RadioGroup>
                    </FormControl>
                    {
                        ['Car', 'Bike', 'Motorcycle', 'RV', 'Walk'].includes(rideType) ? <></> :
                            <div>
                                <TextField
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                    }}
                                    autoFocus
                                    label="Transportaion Code"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                    }}
                                    autoFocus
                                    label="Location"
                                    fullWidth
                                    variant="standard"
                                />
                            </div>
                    }
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            ampm={false}
                            label="Departure Time"
                            value={toDateString(departTime)}
                            onChange={(newTime) => {
                                if (newTime != null) {
                                    setDepartTime(toPlainDateTime(newTime));
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            ampm={false}
                            label="Arrival Time"
                            value={toDateString(arrivalTime)}
                            onChange={(newTime) => {
                                if (newTime != null) {
                                    setArrivalTime(toPlainDateTime(newTime));
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleModifyCommute}>
                    Confirm
                </Button>
            </DialogActions></Dialog>
    return (
        props.commuteInfo == null ? <div>/</div> :
            <div>
                {dialog}
                <Card sx={{ minWidth: 275 }}>
                    <CardActionArea onClick={() => { setModifyCommute(true) }}>
                        <CardContent>
                            <Grid>
                                {rideMap.get(props.commuteInfo.ride)}
                            </Grid>
                            <Typography variant="h6" component="div">
                                {props.commuteInfo.departTime} - {props.commuteInfo.arrivalTime}
                            </Typography>
                            <Typography variant="body2">
                                {props.commuteInfo.code}
                            </Typography>
                            <Typography variant="body2">
                                {props.commuteInfo.location}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

    );
}