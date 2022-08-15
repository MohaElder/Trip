import type { CommuteInfo } from "../CommuteInfo/CommuteInfo"
import type { StayInfo } from "../StayInfo/StayInfo"

export type Itinerary = {
    id: string;
    date: string;
    start: string;
    end: string;
    tripInfo: string;
    commuteInfo: CommuteInfo | null;
    stayInfo: StayInfo | null;
    ps: string;
    dailyItinerary: Array<DailyItinerary>
}

type DailyItinerary = {
    date: string;
    location: string;
    tripInfo: string;
    commuteInfo: CommuteInfo;
}