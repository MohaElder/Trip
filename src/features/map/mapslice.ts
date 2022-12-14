import { RootState } from '../../app/store';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getAutoCompleteLocation, getDirection } from '../../api/map';
import { GeoNode } from '../../data/GeoNode/GeoNode';

export const getAutoCompleteLocationThunk =
    createAsyncThunk('map/getAutoCompleteLocationThunk',
        async (str: string) => {
            const response = await getAutoCompleteLocation(str);
            return response;
        })

export const getDirectionThunk =
    createAsyncThunk('map/getDirectionThunk',
        async () => {
            const response = await getDirection([[0, 1]])
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
        clearSearchResult: (state) => {
            state.searchResults = [];
        }

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
            .addCase(getDirectionThunk.fulfilled, (state, action) => {
                console.log("done!")
                console.log(action.payload)
            })
    }
})

export const { clearSearchResult } = mapSlice.actions;

export const selectSearchResults = (state: RootState) => state.map.searchResults;

export default mapSlice.reducer;