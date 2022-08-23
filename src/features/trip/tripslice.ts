import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import type { Trip } from '../../data/Trip/Trip';
import { trip } from '../../data/Trip/Trip';
import { EditorState, convertToRaw } from "draft-js";
import type { RawDraftContentState } from "draft-js"
import { v4 as uuidv4 } from 'uuid';
import { getAutoCompleteLocation } from '../../api/map';

export enum TripStatus {
    welcome = 'welcome',
    opened = 'opened',
    created = 'created',
    editing = 'editing',
    editingSegment = 'editingSegment',
    creatingSegment = 'creatingSegment',
}

export interface TripState {
    Trip: Trip;
    status: TripStatus;
    warn: boolean;
    warnMsg: string;
    activeSegmentIndex: number;
}

const initialState: TripState = {
    Trip: trip,
    status: TripStatus.welcome,
    warn: false,
    warnMsg: '',
    activeSegmentIndex: 0,
};

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        setTripStatus: (state, action: PayloadAction<{ status: TripStatus }>) => {
            state.status = action.payload.status;
        },

        updateTripInfo: (state, action: PayloadAction<{ name?: string, startDate?: string, endDate?: string }>) => {
            state.Trip.name = action.payload.name == undefined ? state.Trip.name : action.payload.name;
            state.Trip.startDate = action.payload.startDate == undefined ? state.Trip.startDate : action.payload.startDate;
            state.Trip.endDate = action.payload.endDate == undefined ? state.Trip.endDate : action.payload.endDate;
            state.status = TripStatus.created;
        },

        setActiveSegmentIndex: (state, action: PayloadAction<{ index: number }>) => {
            state.activeSegmentIndex = action.payload.index;
        },

        updateSegmentInfo: (state, action: PayloadAction<{ name?: string, startDate?: string, endDate?: string, index: number }>) => {
            state.Trip.tripSegments[action.payload.index].name = action.payload.name == undefined ? state.Trip.name : action.payload.name;
            state.Trip.tripSegments[action.payload.index].startDate = action.payload.startDate == undefined ? state.Trip.startDate : action.payload.startDate;
            state.Trip.tripSegments[action.payload.index].endDate = action.payload.endDate == undefined ? state.Trip.endDate : action.payload.endDate;
            state.status = TripStatus.created;
        },

        deleteSegment: (state, action: PayloadAction<{ index: number }>) => {
            state.activeSegmentIndex = 0;
            state.status = TripStatus.created;
        },

        cancelEditSegment: (state) => {
            console.log("aaa")
            state.status = TripStatus.created;
        },

        addNote: (state) => {
            state.Trip.notes = [
                ...state.Trip.notes,
                { placeholder: 'write anything...', id: uuidv4(), data: convertToRaw(EditorState.createEmpty().getCurrentContent()) }
            ]

            getAutoCompleteLocation('Watson Lake')
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

        updateBudget: (state, action: PayloadAction<{
            tripSegmentIndex: number, budgetIndex: number, name?: string,
            price?: number, quantity?: number
        }>) => {
            let org = state.Trip
                .tripSegments[action.payload.tripSegmentIndex]
                .budgets[action.payload.budgetIndex];
            state.Trip
                .tripSegments[action.payload.tripSegmentIndex]
                .budgets[action.payload.budgetIndex] = {
                id: org.id,
                name: action.payload.name === undefined ?
                    org.name : action.payload.name,
                price: action.payload.price === undefined ?
                    org.price : action.payload.price,
                quantity: action.payload.quantity === undefined ?
                    org.quantity : action.payload.quantity,
                isStay: org.isStay,
            }
        },

        deleteItinenary: (state, action: PayloadAction<{
            tripSegmentIndex: number, itinenaryIndex: number
        }>) => {
            let stayBudgetIdx = state.Trip.tripSegments[action.payload.tripSegmentIndex].budgets.findIndex((budget) => {
                return budget.id === state.Trip.tripSegments[action.payload.tripSegmentIndex]
                .itineraries[action.payload.itinenaryIndex].stayInfo.id
            });

            if(stayBudgetIdx !== -1){
                state.Trip.tripSegments[action.payload.tripSegmentIndex].budgets.splice(stayBudgetIdx, 1)
            }
            
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

        deleteBudget: (state, action: PayloadAction<{
            tripSegmentIndex: number, budgetIndex: number
        }>) => {
            state.Trip.tripSegments[action.payload.tripSegmentIndex]
                .budgets.splice(action.payload.budgetIndex, 1)
        },

        updateCommuteInfo: (state,
            action: PayloadAction<{
                segmentIndex: number,
                itinenaryIndex: number,
                dayItinenaryIndex?: number,
                ride: string,
                code: string,
                location: string,
                departTime: string,
                arrivalTime: string,
                delete?: boolean,
            }>) => {

            if (action.payload.dayItinenaryIndex !== undefined) {
                if (action.payload.delete === true) {
                    state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex]
                        .dailyItinerary[action.payload.dayItinenaryIndex].commuteInfo = null;
                }
                else {
                    state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex]
                        .dailyItinerary[action.payload.dayItinenaryIndex].commuteInfo = {
                        ride: action.payload.ride,
                        code: action.payload.code,
                        location: action.payload.location,
                        departTime: action.payload.departTime,
                        arrivalTime: action.payload.arrivalTime,
                    }
                }
            }
            else {
                if (action.payload.delete === true) {

                    state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex]
                        .commuteInfo = null;
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

            let org_id = state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex].stayInfo.id
            state.Trip.tripSegments[action.payload.segmentIndex].itineraries[action.payload.itinenaryIndex].stayInfo = {
                id: org_id,
                type: action.payload.type,
                name: action.payload.name,
                price: action.payload.price,
                link: action.payload.link,
                location: action.payload.location,
            }

            let stay_budget_idx = state.Trip.tripSegments[action.payload.segmentIndex].budgets.findIndex((budget) => {
                return budget.id === org_id && budget.isStay;
            })

            if (stay_budget_idx === -1) {
                console.log("Hey!")
                state.Trip.tripSegments[action.payload.segmentIndex].budgets = [
                    ...state.Trip.tripSegments[action.payload.segmentIndex].budgets,
                    {
                        id: org_id,
                        name: action.payload.name,
                        price: action.payload.price,
                        quantity: 1,
                        isStay: true,
                    }
                ]
            }
            else {
                console.log("change")
                state.Trip.tripSegments[action.payload.segmentIndex].budgets[stay_budget_idx] = {
                    id: org_id,
                    name: action.payload.name,
                    price: action.payload.price,
                    quantity: 1,
                    isStay: true,
                }
            }
        },

        addSegment: (state,
            action: PayloadAction<{ name?: string, startDate?: string, endDate?: string }>) => {

            function checkValidDateSegment(startDate: string, endDate: string): string {
                let ourStartDate = new Date(startDate)
                let ourEndDate = new Date(endDate)
                let str = ''
                state.Trip.tripSegments.forEach((segment) => {
                    let theirStartDate = new Date(segment.startDate)
                    let theirEndDate = new Date(segment.endDate)
                    if (
                        (ourStartDate >= theirStartDate && ourStartDate <= theirEndDate) ||
                        (ourEndDate >= theirStartDate && ourEndDate <= theirEndDate) ||
                        ourStartDate == theirStartDate || ourStartDate == theirEndDate ||
                        ourEndDate == theirEndDate || ourEndDate == theirEndDate
                    ) {
                        str += segment.name + ', ';
                    }
                })

                return str.substring(0, str.length - 2);
            }

            function checkValidDateTrip(startDate: string, endDate: string): boolean {
                let ourStartDate = new Date(startDate)
                let ourEndDate = new Date(endDate)
                let theirStartDate = new Date(state.Trip.startDate)
                let theirEndDate = new Date(state.Trip.endDate)

                return !(ourStartDate < theirStartDate || ourEndDate > theirEndDate);
            }

            if (action.payload.name !== undefined
                && action.payload.startDate !== undefined
                && action.payload.endDate !== undefined) {

                if (!checkValidDateTrip(action.payload.startDate, action.payload.endDate)) {
                    state.warnMsg = 'Your proposed dates have conflicts with the Trip date. \
                    Please either modify your trip date or your segment date to proceed.'
                    state.warn = true;
                    return;
                }

                let str = checkValidDateSegment(action.payload.startDate, action.payload.endDate);

                if (str !== '') {
                    state.warnMsg = 'There are date conflict among the following trip segments: \
                    ' + str + '. Please either adjust the dates of those or this segment to proceed.'
                    state.warn = true;
                    return;
                }
                state.Trip.tripSegments = [
                    ...state.Trip.tripSegments,
                    {
                        name: action.payload.name,
                        id: uuidv4(),
                        startDate: action.payload.startDate,
                        endDate: action.payload.endDate,
                        notes: [{
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

                state.activeSegmentIndex = state.Trip.tripSegments.length - 1;

                state.status = TripStatus.created
            }
        },

        addItinenary: (state, action: PayloadAction<{ segmentIndex: number }>) => {

            function checkValidDate(date: string): boolean {
                let d1 = new Date(date)
                let d2 = new Date(state.Trip
                    .tripSegments[action.payload.segmentIndex].endDate)
                return d1 <= d2;
            }

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

            let date = getLatestTripDate();
            if (!checkValidDate(date)) {
                console.log("invalid date!")
                state.warn = true;
                state.warnMsg = "You can't add anymore itinenary \
                 because you don't have that many days for this segment. \
                 Edit the segment's date to enable more itinenaries in this segment."
                return;
            }
            state.Trip.tripSegments[action.payload.segmentIndex].itineraries = [
                ...state.Trip.tripSegments[action.payload.segmentIndex].itineraries,
                {
                    open: false,
                    id: uuidv4(),
                    date: date,
                    start: 'Start',
                    end: 'End',
                    tripInfo: 'Trip Info',
                    commuteInfo: null,
                    stayInfo: {
                        id: uuidv4(),
                        type: 'Hotel',
                        name: '',
                        location: '',
                        price: 0
                    },
                    ps: 'side note',
                    dailyItinerary: []
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
                    commuteInfo: null,
                }
            ]
        },

        addBudget: (state, action: PayloadAction<{ segmentIndex: number }>) => {
            state.Trip.tripSegments[action.payload.segmentIndex].budgets = [
                ...state.Trip.tripSegments[action.payload.segmentIndex].budgets,
                {
                    id: uuidv4(),
                    name: 'New Item',
                    price: 0,
                    quantity: 1,
                    isStay: false,
                }
            ]
        },

        closeWarn: (state) => {
            state.warn = false;
        }
    },

});

export const { updateTripInfo, updateSegmentInfo, addNote, addNoteSegment,
    updateNote, updateNoteSegment, deleteNote,
    deleteNoteSegment, addSegment, updateCommuteInfo,
    updateStayInfo, updateItinenary, updateDayItinenary,
    addItinenary, addDayItinenary, deleteDayItinenary, deleteItinenary,
    setTripStatus, addBudget, updateBudget, deleteBudget, closeWarn, deleteSegment,
    cancelEditSegment, setActiveSegmentIndex } = tripSlice.actions;

export const selectTrip = (state: RootState) => state.trip.tripReducer.Trip;

export const selectTripStatus = (state: RootState) => state.trip.tripReducer.status;

export const selectWarn = (state: RootState) => state.trip.tripReducer.warn;

export const selectWarnMsg = (state: RootState) => state.trip.tripReducer.warnMsg;

export const selectActiveSegmentIndex = (state: RootState) => state.trip.tripReducer.activeSegmentIndex;

export default tripSlice.reducer;
