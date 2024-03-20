export interface Event {
    title: string;
    description: string;
    'starting-date': string;
    'ending-date': string;
    location: string;
    participants?: string[];
}

export interface EventCalendarProps {
    events: Event[];
}