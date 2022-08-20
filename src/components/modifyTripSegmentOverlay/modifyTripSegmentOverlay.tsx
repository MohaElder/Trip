import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectTripStatus, addSegment, updateSegmentInfo, TripStatus, deleteSegment, cancelEditSegment } from '../../features/trip/tripslice';

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
import { TripSegment } from '../../data/Trip/Trip';

export default function ModifyTripSegmentOverlay(props: { segment: TripSegment, segmentIndex: number }) {


  const dispatch = useAppDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const tripStatus = useAppSelector(selectTripStatus);

  const [open, setOpen] = useState(
    tripStatus === TripStatus.editingSegment ||
    tripStatus === TripStatus.creatingSegment);
  useEffect(() => {
    setOpen(
      tripStatus === TripStatus.editingSegment ||
      tripStatus === TripStatus.creatingSegment)
  }, [tripStatus]);

  const [segmentName, setSegmentName] = useState<string>(
    tripStatus == TripStatus.creatingSegment ? 'New Segment' :
      props.segment.name)
  useEffect(() => {
    setSegmentName(tripStatus == TripStatus.creatingSegment ? 'New Segment' :
      props.segment.name)
  }, [tripStatus]);

  const [startDate, setStartDate] = useState<Date | null>(
    tripStatus == TripStatus.creatingSegment ? new Date() :
      new Date(props.segment.startDate),
  );

  const [endDate, setEndDate] = useState<Date | null>(
    tripStatus == TripStatus.creatingSegment ? new Date() :
      new Date(props.segment.endDate),
  );

  const [numOfDays, setNumOfDays] =
    useState<number>(startDate !== null && endDate !== null ?
      Math.round(
        millisecondsToDays(startDate.getTime() - endDate.getTime()) * 10) / 10 : 0);

  function handleEditSegment() {
    if (tripStatus === TripStatus.creatingSegment) {
      dispatch(addSegment({
        name: segmentName,
        startDate: startDate?.toDateString(),
        endDate: endDate?.toDateString()
      }))
    }
    else {
      dispatch(
        updateSegmentInfo(
          {
            index: props.segmentIndex,
            name: segmentName,
            startDate: startDate?.toDateString(),
            endDate: endDate?.toDateString()
          }))
    }
  }

  function handleCancel() {
    if (tripStatus === TripStatus.creatingSegment) {
      dispatch(deleteSegment({ index: props.segmentIndex }));
    }
    else {
      dispatch(cancelEditSegment());
    }
  }

  //modified from https://bobbyhadz.com/blog/javascript-convert-days-to-milliseconds
  function daysToMilliseconds(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }

  function millisecondsToDays(milliseconds: number): number {
    return milliseconds / 24 / 60 / 60 / 1000;
  }

  return (
    <Dialog open={open} fullScreen={fullScreen}>
      <DialogTitle sx={{ textAlign: 'center', paddingTop: 5 }}>
        {tripStatus === TripStatus.editingSegment ? 'EDIT' : 'CREATE'} SEGMENT👇
      </DialogTitle>
      <DialogContent sx={{ paddingLeft: 10, paddingRight: 10 }}>
        <Stack spacing={4}>
          <TextField
            required
            onChange={(e) => { setSegmentName(e.target.value) }}
            autoFocus
            value={segmentName}
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
            type='number'
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
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button autoFocus onClick={handleEditSegment}>
          {tripStatus === TripStatus.editingSegment ? 'Edit' : 'Create'}
        </Button>
      </DialogActions></Dialog>
  );
}
