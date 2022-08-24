import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Stack } from '@mui/system';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FestivalIcon from '@mui/icons-material/Festival';
import RvHookupIcon from '@mui/icons-material/RvHookup';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import WeekendIcon from '@mui/icons-material/Weekend';

import CardActionArea from '@mui/material/CardActionArea/CardActionArea';

import { updateStayInfo } from '../../features/trip/tripslice';
import { StayInfo } from '../../data/StayInfo/StayInfo';

export default function StayStack(props: {
    segmentIndex: number,
    itineraryIndex: number,
    stayInfo: StayInfo | null,
    viewOnly?: boolean,
}) {

    const dispatch = useAppDispatch();

    const [modifyStay, setModifyStay] = useState(false)
    const [stayType, setStayType] = useState<string | undefined>(props.stayInfo?.type);
    const [link, setLink] = useState<string | undefined>(props.stayInfo?.link);
    const [name, setName] = useState<string | undefined>(props.stayInfo?.name);
    const [location, setLocation] = useState<string | undefined>(props.stayInfo?.location);
    const [price, setPrice] = useState<number | undefined>(props.stayInfo?.price);

    const stayMap = new Map([
        ['Hotel', <HotelIcon />],
        ['CarCamp', <DirectionsCarIcon />],
        ['Tent', <FestivalIcon />],
        ['RV', <RvHookupIcon />],
        ['Airbnb', <NightShelterIcon />],
        ['Couch', <WeekendIcon />],
    ])

    const stayButtons = () => {
        let ret: JSX.Element[] = []
        stayMap.forEach((v, k) => {
            ret.push(
                <FormControlLabel key={k} value={k} control={<Radio />} label={v} />
            )
        })
        return ret;
    }

    function handleModifystay() {
        setModifyStay(false);

        if (stayType !== undefined
            && name !== undefined && location !== undefined
            && price !== undefined) {
            dispatch(updateStayInfo({
                segmentIndex: props.segmentIndex,
                itinenaryIndex: props.itineraryIndex,
                type: stayType,
                link: link,
                name: name,
                price: price,
                location: location,
            }))
        }

    }

    const dialog =
        <Dialog open={modifyStay}>
            <DialogTitle sx={{ textAlign: 'center', paddingTop: 5 }}>
                STAY
            </DialogTitle>
            <DialogContent sx={{ paddingLeft: 10, paddingRight: 10 }}>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>I'm staying at...</FormLabel>
                        <RadioGroup row value={stayType}
                            onChange={(e) => { setStayType(e.target.value) }}>
                            {stayButtons()}
                        </RadioGroup>
                    </FormControl>
                    {
                        <div>
                            <TextField
                                value={link}
                                onChange={(e) => {
                                    setLink(e.target.value);
                                }}
                                autoFocus
                                label="Confirmation Link"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                autoFocus
                                label="Name"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                }}
                                autoFocus
                                label="Address"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                value={price}
                                onChange={(e) => {
                                    setPrice(+e.target.value);
                                }}
                                autoFocus
                                label="Price"
                                fullWidth
                                variant="standard"
                            />
                        </div>
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleModifystay}>
                    Confirm
                </Button>
            </DialogActions></Dialog>
    return (
        props.stayInfo === null ? <div>/</div> :
            <div>
                {dialog}
                <Card sx={{ minWidth: 275 }}>
                    <CardActionArea onClick={() => { if (!props.viewOnly) { setModifyStay(true) } }}>
                        <CardContent>
                            <Grid>
                                {stayMap.get(props.stayInfo.type)}
                            </Grid>
                            <Typography variant="h6" component="div">
                                {props.stayInfo.name}
                            </Typography>
                            <Typography variant="body2">
                                {props.stayInfo.location}
                            </Typography>
                            <Typography variant="body2">
                                {props.stayInfo.link}
                            </Typography>
                            <Typography variant="body2">
                                ${props.stayInfo.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

    );
}