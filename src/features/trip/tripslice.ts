import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import type { Trip } from '../../data/Trip/Trip';
import { trip } from '../../data/Trip/Trip';
import { EditorState, convertToRaw } from "draft-js";
import type { RawDraftContentState } from "draft-js"
import { v4 as uuidv4 } from 'uuid';

import { itineraryTemplate } from '../../data/Templates/Template';

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
        addNote: (state) => {
            state.Trip.notes = [
                ...state.Trip.notes,
                { placeholder: 'write anything...', id: uuidv4(), data: convertToRaw(EditorState.createEmpty().getCurrentContent()) }
            ]
        },

        addNoteSegment: (state, action: PayloadAction<{ name: string }>) => {
            let index = state.Trip.tripSegments.findIndex((segment) => {
                return segment.name == action.payload.name;
            })
            if (index != -1) {
                state.Trip.tripSegments[index].notes = [
                    ...state.Trip.tripSegments[index].notes,
                    { placeholder: 'write anything...', id: uuidv4(), data: convertToRaw(EditorState.createEmpty().getCurrentContent()) }
                ]
            }
        },

        updateNote: (state, action: PayloadAction<{ id: string, data: RawDraftContentState }>) => {
            let index = state.Trip.notes.findIndex((note) => {
                return note.id == action.payload.id;
            })
            //-1 means not found, so we don't handle
            if (index != -1) {
                state.Trip.notes[index].data = action.payload.data;
            }
        },

        updateCommuteInfo: (state,
            action: PayloadAction<{
                segmentName: string, itinenaryId: string,
                ride: string, code: string,
                location: string, departTime: string,
                arrivalTime: string
            }>) => {
            let index = state.Trip.tripSegments.findIndex((segment) => {
                return segment.name === action.payload.segmentName;
            })
            //-1 means not found, so we don't handle
            if (index != -1) {
                let itIndex = state.Trip.tripSegments[index].
                    itineraries.findIndex((it) => {
                        return it.id === action.payload.itinenaryId;
                    })
                if (itIndex != -1) {
                    state.Trip.tripSegments[index].itineraries[itIndex].commuteInfo={
                        ride: action.payload.ride,
                        code: action.payload.code,
                        location: action.payload.location,
                        departTime: action.payload.departTime,
                        arrivalTime: action.payload.arrivalTime,
                    }
                }
            }
        },

        updateNoteSegment: (state,
            action: PayloadAction<{ id: string, data: RawDraftContentState, name: string }>) => {
            let segmentIndex = state.Trip.tripSegments.findIndex((segment) => {
                return segment.name == action.payload.name;
            })
            if (segmentIndex != -1) {
                let index = state.Trip.tripSegments[segmentIndex].notes.findIndex((note) => {
                    return note.id == action.payload.id;
                })
                //-1 means not found, so we don't handle
                if (index != -1) {
                    state.Trip.tripSegments[segmentIndex].notes[index].data = action.payload.data;
                }
            }
        },

        deleteNote: (state, action: PayloadAction<{ id: string }>) => {
            state.Trip.notes = state.Trip.notes
                .filter((note) => {
                    return note.id !== action.payload.id;
                })
        },

        deleteNoteSegment: (state, action: PayloadAction<{ id: string, name: string }>) => {
            let segmentIndex = state.Trip.tripSegments.findIndex((segment) => {
                return segment.name == action.payload.name;
            })
            if (segmentIndex != -1) {
                state.Trip.tripSegments[segmentIndex].notes = state.Trip.tripSegments[segmentIndex].notes
                    .filter((note) => {
                        return note.id !== action.payload.id;
                    })
            }

        },

        addSegment: (state, action: PayloadAction<{ name: string }>) => {
            function getLatestTripDate(): string {
                let length = state.Trip.tripSegments.length;
                return length == 0 ?
                    state.Trip.startDate :
                    state.Trip.tripSegments[length - 1].endDate;
            }

            let newItinenary = itineraryTemplate;
            newItinenary.date = getLatestTripDate();
            newItinenary.id = uuidv4();

            state.Trip.tripSegments = [
                ...state.Trip.tripSegments,
                {
                    name: action.payload.name, startDate: getLatestTripDate(), endDate: state.Trip.endDate, notes: [{
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
                    budgets: [], itineraries: [
                        newItinenary
                    ]
                }
            ]
        }
    },
});

export const { updateTripInfo, addNote, addNoteSegment, updateNote, updateNoteSegment, deleteNote, deleteNoteSegment, addSegment, updateCommuteInfo } = tripSlice.actions;

export const selectTrip = (state: RootState) => state.trip.tripReducer.Trip;

export const selectTripStatus = (state: RootState) => state.trip.tripReducer.status;

export default tripSlice.reducer;
