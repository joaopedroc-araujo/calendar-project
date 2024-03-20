import { create } from 'zustand';
// import { State } from './interface';

export interface State {
    events: Event[];
    dateRange: [Date, Date];
    startingDate: Date;
    endingDate: Date;
    addEvent: (newEvent: Event) => void;
    setStartingDate: (date: Date) => void;
    setEndingDate: (date: Date) => void;
}

const useStore = create<State>((set) => ({
    events: [],
    startingDate: new Date(),
    endingDate: new Date(),
    dateRange: [new Date(), new Date()],
    addEvent: (newEvent: Event) => set(({ events, ...state }) => ({ ...state, events: [...events, newEvent] })),
    setStartingDate: (date: Date) => set((state) => ({ ...state, startingDate: date })),
    setEndingDate: (date: Date) => set((state) => ({ ...state, endingDate: date })),
}));

export default useStore;