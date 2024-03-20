
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, addMonths, subMonths } from 'date-fns';
import { Weekdays } from '../../utils/Weekdays/Weekdays';
import clsx from 'clsx';
import { EventCalendarProps, Event } from './types';
import { useMemo } from 'react';
import useStore, { State } from '../../zustand/store';
import Header from './components/Header';
import { useMonthContext } from '../../context/MonthContext';

const EventCalendar = ({ events }: EventCalendarProps) => {
    const { currentDate } = useMonthContext();

    const startingDate = useStore((state: State) => state.startingDate);
    const endingDate = useStore((state: State) => state.endingDate);

    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    const startingDayIndex = getDay(firstDayOfMonth);

    const eventsByDay = useMemo(() => {
        return events.reduce((acc: { [key: string]: Event[] }, event) => {
            const dateKey = format(event['starting-date'], 'yyyy-MM-dd');
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(event);
            return acc;
        }, {});
    }, [events]);


    const handleDaysClick = (day: Date) => {
        const starting = startingDate;
        const ending = endingDate;

        if (!starting || ending || day < starting) {
            useStore.setState({ startingDate: day, endingDate: undefined });
            return;
        }

        useStore.setState({ endingDate: day });
    };

    console.log(currentDate)

    return (
        <div className='container mx-auto p-4 border mt-5 border-gray-800 shadow-md shadow-slate-600 rounded-md'>
            <Header />
            <div
                className='grid grid-cols-7 gap-2 m-4'>
                {Weekdays.map((day) => {
                    return (
                        <div
                            key={day}
                            className='font-bold text-center text-blue-700'
                        >
                            {day}
                        </div>
                    )
                })}
                {Array.from({ length: startingDayIndex }).map((_, index) => {
                    return (
                        <div
                            key={`empty-${index}`}
                            className='border rounded-md border-gray-800 p-2 text-center w-28 h-28 ml-[10px]'
                        />
                    );
                })}
                {daysInMonth.map((day, index) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const todayEvents = eventsByDay[dateKey] || [];
                    const isDaySelected = startingDate && endingDate && day >= startingDate && day <= endingDate;

                    return (
                        <div
                            key={index}
                            className={clsx('border border-gray-800 rounded-md p-2 w-28 h-28 text-center align-top ml-[10px]', {
                                'bg-gray-400': isToday(day),
                                'bg-blue-800': startingDate && endingDate && day >= startingDate && day <= endingDate,
                                'text-white': isToday(day),
                            })}
                            onClick={() => handleDaysClick(day)}>
                            <span>{format(day, 'd')}</span>
                            {isDaySelected && (
                                <div className="selected-indicator absolute bottom-0 left-0 right-0 h-1 ">selecionado</div>
                            )}
                            {todayEvents.map((event) => (
                                <div
                                    key={event.title}
                                    className='bg-blue-500 text-gray-600'>
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventCalendar;
