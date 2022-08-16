import type { Itinerary } from "../Itinerary/Itinerary";
import type { TripSegment } from "../Trip/Trip";

export const itineraryTemplate: Itinerary = {
    open: false,
    id: '',
    date: '',
    start: 'The place you start the day',
    end: 'The place you end the day',
    tripInfo: 'this is where you can put brief of your day',
    commuteInfo: {
        ride: 'Car',
        code: '',
        location: '6737 Fisk Ave',
        departTime: '12:00',
        arrivalTime: '13:00',
    },
    stayInfo: {
        type: 'Hotel',
        link: 'https://booking.com',
        name: 'Westmark Hotel',
        location: 'Anchorage, Alaska',
        price: 399,
    },
    ps: 'you may put extra note here',
    dailyItinerary: [
        {
            id: 'sdsdsdsd',
            date: '10:00',
            location: 'Westfield UTC',
            tripInfo: 'Hang out at Shake Shack',
            commuteInfo: {
                ride: 'Bus',
                code: 'Route 41',
                location: 'Governer Drive Gas Station',
                departTime: '10:20',
                arrivalTime: '10:25',
            }
        }
    ],
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