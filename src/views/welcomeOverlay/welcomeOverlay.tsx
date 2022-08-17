import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTripStatus, updateTripInfo, updateSegmentInfo, TripStatus } from '../../features/trip/tripslice';

import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function WelcomeOverlay() {

  const tripStatus = useAppSelector(selectTripStatus);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [tripName, setTripName] = useState<string>('')

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(),
  );

  const [numOfDays, setNumOfDays] = useState<number>(0);

  const [endDate, setEndDate] = useState<Date | null>(
    new Date(),
  );

  function handleCreateTrip() {
    dispatch(updateTripInfo({ name: tripName, startDate: startDate?.toDateString(), endDate: endDate?.toDateString() }))
    dispatch(updateSegmentInfo({ index: 0, name: tripName, startDate: startDate?.toDateString(), endDate: endDate?.toDateString() }))
  }

  //modified from https://bobbyhadz.com/blog/javascript-convert-days-to-milliseconds
  function daysToMilliseconds(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }

  function millisecondsToDays(milliseconds: number): number {
    return milliseconds / 24 / 60 / 60 / 1000;
  }

  return (
    <Dialog open={tripStatus == TripStatus.welcome || tripStatus == TripStatus.editing} fullScreen={fullScreen}>
      <DialogTitle sx={{ textAlign: 'center', paddingTop: 5 }}>
        <span className='open-text' onClick={() => { console.log("clicked open") }}>OPEN</span> OR CREATE TRIP👇
      </DialogTitle>
      <DialogContent sx={{ paddingLeft: 10, paddingRight: 10 }}>
        <Stack spacing={4}>
          <TextField
            onChange={(e) => { setTripName(e.target.value) }}
            autoFocus
            value={tripName}
            label="Trip Name"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newDate) => {
                setStartDate(newDate);
                if (newDate != null) {
                  setEndDate(new Date(newDate.getTime() + daysToMilliseconds(numOfDays)))
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            onChange={(e) => {
              //conversion from string to number: https://stackoverflow.com/a/14668510/15466075
              setNumOfDays(+e.target.value);
              if (startDate != null) {
                setEndDate(new Date(startDate.getTime() + daysToMilliseconds(+e.target.value)))
              }
            }}
            value={numOfDays}
            autoFocus
            label="Number of Days"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newDate) => {
                setEndDate(newDate)
                if (newDate != null && startDate != null) {
                  setNumOfDays(Math.round(millisecondsToDays(newDate.getTime() - startDate.getTime()) * 10) / 10)
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCreateTrip}>
          Create
        </Button>
      </DialogActions></Dialog>
  );
}

export default WelcomeOverlay;