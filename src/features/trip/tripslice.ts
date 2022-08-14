import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Notes from '../../components/notes/notes';
import type { Trip } from '../../data/Trip/Trip';
import { trip } from '../../data/Trip/Trip';
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
                { placeholder: 'write anything...', id: uuidv4(), data: {} }
            ]
        },

        updateNote: (state, action: PayloadAction<{ id: string, data: Object }>) => {
            let index = state.Trip.notes.findIndex((note) => {
                return note.id == action.payload.id;
            })
            //-1 means not found, so we don't handle
            if (index != -1) {
                state.Trip.notes[index].data = action.payload.data;
            }
        },

        deleteNote: (state, action: PayloadAction<{ id: string }>) => {
            state.Trip.notes = state.Trip.notes
                .filter((note) => {
                    return note.id !== action.payload.id;
                })
        }
    },
});

export const { addNote, updateNote, deleteNote } = tripSlice.actions;

export const selectTrip = (state: RootState) => state.trip.tripReducer.Trip;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const linenumber = (state: RootState) => state.note.editorState.;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default tripSlice.reducer;
