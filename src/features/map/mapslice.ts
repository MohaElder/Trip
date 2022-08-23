import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getAutoCompleteLocation } from '../../api/map';
import { GeoNode } from '../../data/GeoNode/GeoNode';

export const getAutoCompleteLocationThunk =
    createAsyncThunk('map/fetchMaps',
        async (str: string) => {
            const response = await getAutoCompleteLocation(str);
            return response;
        })


export interface MapState {
    status: string;
    searchResults: Array<GeoNode>;
}

const initialState: MapState = {
    status: 'idle',
    searchResults: []
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        
    },
    extraReducers: builder => {
        builder
            .addCase(getAutoCompleteLocationThunk.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAutoCompleteLocationThunk.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.status = 'idle'
            })
    }
})

export const { } = mapSlice.actions;

export const selectSearchResults = (state: RootState) => state.map.searchResults;

export default mapSlice.reducer;