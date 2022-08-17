import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import type { Trip } from '../../data/Trip/Trip';
import { trip } from '../../data/Trip/Trip';
import { EditorState, convertToRaw } from "draft-js";
import type { RawDraftContentState } from "draft-js"
import { v4 as uuidv4 } from 'uuid';

import { itineraryTemplate } from '../../data/Templates/Template';
import type { TripSegment } from '../../data/Trip/Trip';

export interface TripState {
    Trip: Trip;
    status: 'welcome' | 'opened' | 'created';
}

const initialState: TripState = {
    Trip: trip,
    status: 'welcome',
};

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateTripInfo: (state, action: PayloadAction<{ name?: string, startDate?: string, endDate?: string }>) => {
            state.Trip.name = action.payload.name == undefined ? state.Trip.name : action.payload.name;
            state.Trip.startDate = action.payload.startDate == undefined ? state.Trip.startDate : action.payload.startDate;
            state.Trip.endDate = action.payload.endDate == undefined ? state.Trip.endDate : action.payload.endDate;
            state.status = 'created';
        },

        updateSegmentInfo: (state, action: PayloadAction<{ name?: string, startDate?: string, endDate?: string, index: number }>) => {
            state.Trip.tripSegments[action.payload.index].name = action.payload.name == undefined ? state.Trip.name : action.payload.name;
            state.Trip.tripSegments[action.payload.index].startDate = action.payload.startDate == undefined ? state.Trip.startDate : action.payload.startDate;
            state.Trip.tripSegments[action.payload.index].endDate = action.payload.endDate == undefined ? state.Trip.endDate : action.payload.endDate;
        },

        addNote: (state) => {
            state.Trip.notes = [
                ...state.Trip.notes,
                { placeholder: 'write anything...', id: uuidv4(), data: convertToRaw(EditorState.createEmpty().getCurrentContent()) }
            ]
        },

        addNoteSegment: (state, action: PayloadAction<{ index: number }>) => {
            state.Trip.tripSegments[action.payload.index].notes = [
                ...state.Trip.tripSegments[action.payload.index].notes,
                { placeholder: 'write anything...', id: uuidv4(), data: convertToRaw(EditorState.createEmpty().getCurrentContent()) }
            ]
        },

        updateNote: (state, action: PayloadAction<{
            index: number,
            data: RawDraftContentState
        }>) => {
            state.Trip.notes[action.payload.index].data = action.payload.data
        },

        updateNoteSegment: (state,
            action: PayloadAction<{
                segmentIndex: number,
                noteIndex: number, data: RawDraftContentState
            }>) => {
            state.Trip.tripSegments[action.payload.segmentIndex].notes[action.payload.noteIndex].data = action.payload.data;
        },

        deleteNote: (state, action: PayloadAction<{ index: number }>) => {
            state.Trip.notes.splice(action.payload.index, 1);
        },

        deleteNoteSegment: (state, action: PayloadAction<{
            segmentIndex: number,
            noteIndex: number
        }>) => {
            state.Trip.tripSegments[action.payload.segmentIndex]
                .notes.splice(action.payload.noteIndex, 1);

        },

        updateItinenary: (state, action: PayloadAction<{
            tripSegmentIndex: number, itinenaryIndex: number, start?: string,
            end?: string, tripInfo?: string, ps?: string, date?: string, open: boolean
        }>) => {
            let org = state.Trip
                .tripSegments[action.payload.tripSegmentIndex]
                .itineraries[action.payload.itinenaryIndex];
            state.Trip
                .tripSegments[action.payload.tripSegmentIndex]
                .itineraries[action.payload.itinenaryIndex] = {
                open: action.payload.open,
                id: org.id,
                date: action.payload.date === undefined ?
                    org.date : action.payload.date,
                start: action.payload.start === undefined ?
                    org.start : action.payload.start,
                end: action.payload.end === undefined ?
                    org.end : action.payload.end,
                tripInfo: action.payload.tripInfo === undefined ?
                    org.tripInfo : action.payload.tripInfo,
                commuteInfo: org.commuteInfo,
                stayInfo: org.stayInfo,
                ps: action.payload.ps === undefined ?
                    org.ps : action.payload.ps,
                dailyItinerary: org.dailyItinerary
            }
        },

        updateDayItinenary: (state, action: PayloadAction<{
            tripSegmentIndex: number, itinenaryIndex: number, dayItinenaryIndex: number,
            date?: string, location?: string, tripInfo?: string
        }>) => {
            let org = state.Trip.tripSegments[action.payload.tripSegmentIndex]
                .itineraries[action.payload.itinenaryIndex].dailyItinerary[action.payload.dayItinenaryIndex];
            state.Trip.tripSegments[action.payload.tripSegmentIndex]
                .itineraries[action.payload.itinenaryIndex]
                .dailyItinerary[action.payload.dayItinenaryIndex] = {
                id: org.id,
                date: action.payload.date === undefined ?
                    org.date : action.payload.date,
                location: action.payload.location === undefined ?
                    org.location : action.payload.location,
                tripInfo: action.payload.tripInfo === undefined ?
                    org.tripInfo : action.payload.tripInfo,
                commuteInfo: org.commuteInfo,
            }
        },

        deleteItinenary: (state, action: PayloadAction<{
            tripSegmentIndex: number, itinenaryIndex: number
        }>) => {
            state.Trip.tripSegments[action.payload.tripSegmentIndex]
                .itineraries.splice(action.payload.itinenaryIndex, 1)
        },

        deleteDayItinenary: (state, action: PayloadAction<{
            tripSegmentIndex: number, itinenaryIndex: number, dayItinenaryIndex: number
        }>) => {
            state.Trip.tripSegments[action.payload.tripSegmentIndex]
                .itineraries[action.payload.itinenaryIndex]
                .dailyItinerary.splice(action.payload.dayItinenaryIndex, 1)
        },

        updateCommuteInfo: (state,
            action: PayloadAction<{
                segmentIndex: number,
                itinenaryIndex: number,
                dayItinenaryIndex?: number,
                ride: string,
                code?: string,
                location?: string,
                departTime: string,
                arrivalTime: string
            }>) => {

            if (action.payload.dayItinenaryIndex !== undefined) {
                state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex]
                    .dailyItinerary[action.payload.dayItinenaryIndex].commuteInfo = {
                    ride: action.payload.ride,
                    code: action.payload.code,
                    location: action.payload.location,
                    departTime: action.payload.departTime,
                    arrivalTime: action.payload.arrivalTime,
                }
            }
            else {
                state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex].commuteInfo = {
                    ride: action.payload.ride,
                    code: action.payload.code,
                    location: action.payload.location,
                    departTime: action.payload.departTime,
                    arrivalTime: action.payload.arrivalTime,
                }
            }
        },

        updateStayInfo: (state,
            action: PayloadAction<{
                segmentIndex: number,
                itinenaryIndex: number,
                type: string, link?: string,
                name: string, location: string,
                price: number
            }>) => {
            state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex].stayInfo = {
                type: action.payload.type,
                name: action.payload.name,
                price: action.payload.price,
                link: action.payload.link,
                location: action.payload.location,
            }
        },

        addSegment: (state, action: PayloadAction<{ name: string }>) => {
            function getLatestTripDate(): string {
                let length = state.Trip.tripSegments.length;
                return length === 0 ?
                    state.Trip.startDate :
                    state.Trip.tripSegments[length - 1].endDate;
            }

            let newItinenary = structuredClone(itineraryTemplate);
            newItinenary.date = getLatestTripDate();
            newItinenary.id = uuidv4();

            state.Trip.tripSegments = [
                ...state.Trip.tripSegments,
                {
                    name: action.payload.name, id: uuidv4(), startDate: getLatestTripDate(), endDate: state.Trip.endDate, notes: [{
                        id: uuidv4(),
                        placeholder: 'I wanna go to...',
                        data: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                    },
                    {
                        id: uuidv4(),
                        placeholder: 'I want to...',
                        data: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                    },
                    {
                        id: uuidv4(),
                        placeholder: 'I wanna eat...',
                        data: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                    },
                    {
                        id: uuidv4(),
                        placeholder: 'I wanna stay at...',
                        data: convertToRaw(EditorState.createEmpty().getCurrentContent()),
                    }],
                    budgets: [], itineraries: []
                }
            ]
        },

        addItinenary: (state, action: PayloadAction<{ segmentIndex: number }>) => {
            function getLatestTripDate(): string {
                let length = state.Trip
                    .tripSegments[action.payload.segmentIndex].itineraries.length;
                if (length === 0) {
                    return state.Trip
                        .tripSegments[action.payload.segmentIndex].startDate;
                }
                let date = new Date(state.Trip
                    .tripSegments[action.payload.segmentIndex]
                    .itineraries[length - 1]
                    .date);
                date.setDate(date.getDate() + 1);
                return date.toString();
            }
            state.Trip.tripSegments[action.payload.segmentIndex].itineraries = [
                ...state.Trip.tripSegments[action.payload.segmentIndex].itineraries,
                {
                    open: false,
                    id: uuidv4(),
                    date: getLatestTripDate(),
                    start: 'Start',
                    end: 'End',
                    tripInfo: 'Trip Info',
                    commuteInfo: {
                        ride: 'Car',
                        departTime: '12:00',
                        arrivalTime: '12:00'
                    },
                    stayInfo: {
                        type: 'Hotel',
                        name: 'Staying at...',
                        location: 'Adress is...',
                        price: 0
                    },
                    ps: 'side note',
                    dailyItinerary: [
                        {
                            id: uuidv4(),
                            date: '10:00',
                            location: 'Address',
                            tripInfo: 'Trip Info',
                            commuteInfo: {
                                ride: 'Car',
                                departTime: '12:00',
                                arrivalTime: '12:00'
                            },
                        }
                    ]
                }
            ]
        },

        addDayItinenary: (state, action: PayloadAction<{ segmentIndex: number, itinenaryIndex: number }>) => {
            state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex].dailyItinerary = [
                ...state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex].dailyItinerary,
                {
                    id: uuidv4(),
                    date: '10:00',
                    location: 'Address',
                    tripInfo: 'Trip Info',
                    commuteInfo: {
                        ride: 'Car',
                        departTime: '12:00',
                        arrivalTime: '12:00'
                    },
                }
            ]
        }
    },

});

export const { updateTripInfo, updateSegmentInfo, addNote, addNoteSegment,
    updateNote, updateNoteSegment, deleteNote,
    deleteNoteSegment, addSegment, updateCommuteInfo,
    updateStayInfo, updateItinenary, updateDayItinenary,
    addItinenary, addDayItinenary, deleteDayItinenary, deleteItinenary } = tripSlice.actions;

export const selectTrip = (state: RootState) => state.trip.tripReducer.Trip;

export const selectTripStatus = (state: RootState) => state.trip.tripReducer.status;

export default tripSlice.reducer;
