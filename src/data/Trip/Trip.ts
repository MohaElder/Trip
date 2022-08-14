import type { Note } from '../Note/Note';

import { v4 as uuidv4 } from 'uuid';

type TripSegment = {
    name: string;
    startDate: string;
    endDate: string;
    notes: Array<Note>;
    budgets: Array<Object>;
    itineraries: Array<Object>;
}

export type Trip = {
    name: string;
    startDate: string;
    endDate: string;
    notes: Array<Note>;
    budgets: Array<Object>;
    tripSegments: Array<TripSegment>;
}

var trip: Trip = {
    name: "",
    startDate: Date.toString(),
    endDate: Date.toString(),
    notes: [
        {
            id: uuidv4(),
            placeholder: 'I wanna go to...',
            data: {},
        },
        {
            id: uuidv4(),
            placeholder: 'I wanna do...',
            data: {},
        },
    ],
    budgets: [],
    tripSegments: []
}

export { trip }