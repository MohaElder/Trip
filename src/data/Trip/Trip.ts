import type { Note } from '../Note/Note';
import type { Itinerary } from '../Itinerary/Itinerary';

import { v4 as uuidv4 } from 'uuid';
import { EditorState, convertToRaw } from "draft-js";;

export type TripSegment = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    notes: Array<Note>;
    budgets: Array<Object>;
    itineraries: Array<Itinerary>;
}

export type Trip = {
    name: string;
    startDate: string;
    endDate: string;
    notes: Array<Note>;
    budgets: Array<Object>;
    tripSegments: Array<TripSegment>;
}
            
const trip: Trip = {
    name: "",
    startDate: Date().toString(),
    endDate: Date().toString(),
    notes: [
        {
            id: uuidv4(),
            placeholder: 'I wanna go to...',
            data: convertToRaw(EditorState.createEmpty().getCurrentContent()),
        },
        {
            id: uuidv4(),
            placeholder: 'I wanna do...',
            data: convertToRaw(EditorState.createEmpty().getCurrentContent()),
        },
    ],
    budgets: [],
    tripSegments: [
        {
            name: 'Default', id: uuidv4(), startDate: Date().toString(), endDate: Date().toString(), notes: [{
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
    ],
}

export { trip }