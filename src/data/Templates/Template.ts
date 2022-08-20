import type { Itinerary } from "../Itinerary/Itinerary";
import type { TripSegment } from "../Trip/Trip";

export const itineraryTemplate: Itinerary = {
    open: false,
    id: '',
    date: '',
    start: 'The place you start the day',
    end: 'The place you end the day',
    tripInfo: 'this is where you can put brief of your day',
    commuteInfo: null,
    stayInfo: {
        type: 'Hotel',
        link: 'https://booking.com',
        name: 'Westmark Hotel',
        location: 'Anchorage, Alaska',
        price: 399,
    },
    ps: 'you may put extra note here',
    dailyItinerary: [],
}

export const tripSegmentTemplate: TripSegment = {
    name: '',
    id: '',
    startDate: '',
    endDate: '',
    notes: [],
    budgets: [],
    itineraries: []
}