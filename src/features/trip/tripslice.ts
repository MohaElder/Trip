import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Notes from '../../components/notes/notes';
import type { Trip } from '../../data/Trip/Trip';
import { trip } from '../../data/Trip/Trip';
import { EditorState, convertToRaw } from "draft-js";
import type { RawDraftContentState } from "draft-js"
import { v4 as uuidv4 } from 'uuid';

export interface TripState {
    Trip: Trip;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TripState = {
    Trip: trip,
    status: 'idle',
};

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
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
            state.Trip.tripSegments = [
                ...state.Trip.tripSegments,
                {
                    name: action.payload.name, startDate: "May", endDate: "June", notes: [],
                    budgets: [], itineraries: []
                }
            ]
        }
    },
});

export const { addNote, addNoteSegment, updateNote, updateNoteSegment, deleteNote, deleteNoteSegment, addSegment } = tripSlice.actions;

export const selectTrip = (state: RootState) => state.trip.tripReducer.Trip;

export default tripSlice.reducer;
