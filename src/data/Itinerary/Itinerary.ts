import type { CommuteInfo } from "../CommuteInfo/CommuteInfo"
import type { StayInfo } from "../StayInfo/StayInfo"

export type Itinerary = {
    id: string;
    open: boolean,
    date: string;
    start: string;
    end: string;
    tripInfo: string;
    commuteInfo: CommuteInfo | null;
    stayInfo: StayInfo;
    ps: string;
    dailyItinerary: Array<DailyItinerary>
}

export type DailyItinerary = {
    id: string;
    date: string;
    location: string;
    tripInfo: string;
    commuteInfo: CommuteInfo | null;
}