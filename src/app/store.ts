import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import tripReducer from '../features/trip/tripslice';
import { enableMapSet } from 'immer';

enableMapSet();

export const store = configureStore({
  reducer: {
    trip: combineReducers({
      tripReducer,
    }),
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
