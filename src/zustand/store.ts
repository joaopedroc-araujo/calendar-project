import { create } from 'zustand';
import { Event } from '../components/EventCalendar/types';

export interface State {
    events: Event[];
    dateRange: [Date, Date];
    startingDate: Date;
    endingDate: Date;
    addEvent: (newEvent: Event) => void;
    setStartingDate: (date: Date) => void;
    setEndingDate: (date: Date) => void;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

const useStore = create<State>((set) => ({
    events: [],
    startingDate: new Date(),
    endingDate: new Date(),
    dateRange: [new Date(), new Date()],
    addEvent: (newEvent: Event) => set(({ events, ...state }) => ({ ...state, events: [...events, newEvent] })),
    setStartingDate: (date: Date) => set((state) => ({ ...state, startingDate: date })),
    setEndingDate: (date) => set({ endingDate: date ? new Date(date.getTime() + (1000 * 60 * 60 * 24)) : undefined }),
    showModal: false,
    setShowModal: (showModal: boolean) => set({ showModal }),
}));

export default useStore;