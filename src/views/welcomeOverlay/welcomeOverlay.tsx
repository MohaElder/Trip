import React, { useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTripStatus, updateTripInfo, updateSegmentInfo, TripStatus, selectTrip, readTrip } from '../../features/trip/tripslice';

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
import FileReaderInput from 'react-file-reader-input';
import WarningPopUp from '../../components/warningPopUp/warningPopUp';

function WelcomeOverlay() {

  const tripStatus = useAppSelector(selectTripStatus);
  const trip = useAppSelector(selectTrip);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [tripName, setTripName] = useState<string>(trip.name)

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(trip.startDate),
  );

  const [endDate, setEndDate] = useState<Date | null>(
    new Date(trip.endDate),
  );

  const [numOfDays, setNumOfDays] =
    useState<number>(startDate !== null && endDate !== null ? 1 + Math.round(millisecondsToDays(endDate.getTime() - startDate.getTime()) * 10) / 10 : 0);


  const [clicked, setClicked] = useState(false)

  function validateForm() {
    return tripName !== '';
  }

  function handleCreateTrip() {
    setClicked(true)
    if (validateForm()) {
      dispatch(updateTripInfo({ name: tripName, startDate: startDate?.toDateString(), endDate: endDate?.toDateString() }))
      if (tripStatus == TripStatus.welcome) {
        dispatch(updateSegmentInfo({ index: 0, name: 'First Segment of ' + tripName, startDate: startDate?.toDateString(), endDate: endDate?.toDateString() }))
      }
    }
  }

  const handleReadFile = (e: any, results: any[]) => {
    results.forEach((result: [any, any]) => {
      const [e, file] = result;
      file.text()
        .then(
          (res: string) => { console.log(JSON.parse(res)); dispatch(readTrip({ trip: JSON.parse(res) })) })
    });
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
      <WarningPopUp />
      <DialogTitle sx={{ textAlign: 'center', paddingTop: 5 }}>
        <FileReaderInput as="binary" id="my-file-input"
          onChange={handleReadFile}>
          <span className='open-text'>OPEN</span> OR CREATE TRIP👇
        </FileReaderInput>

      </DialogTitle>
      <DialogContent sx={{ paddingLeft: 10, paddingRight: 10 }}>
        <Stack spacing={4}>
          <TextField
            required
            error={!validateForm() && clicked}
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
                if (endDate != null && newDate != null) {
                  setEndDate(new Date(newDate.getTime() + daysToMilliseconds(-1 + numOfDays)))
                }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            type='number'
            onChange={(e) => {
              //conversion from string to number: https://stackoverflow.com/a/14668510/15466075
              setNumOfDays(+e.target.value);
              if (startDate != null) {
                console.log("setting")
                setEndDate(new Date(startDate.getTime() + daysToMilliseconds(-1 + +e.target.value)))
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
                  setNumOfDays(Math.round(millisecondsToDays(newDate.getTime() - startDate.getTime()) * 10) / 10 + 1)
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