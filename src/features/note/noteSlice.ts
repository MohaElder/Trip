import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface NoteState {
  editorInfo: Object;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: NoteState = {
  editorInfo: '',
  status: 'idle',
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action: PayloadAction<Object>) => {
      state.editorInfo = action.payload;
    },
  },
});

export const { update } = noteSlice.actions;

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

export default noteSlice.reducer;
