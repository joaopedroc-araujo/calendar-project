import { useState } from 'react';
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, addMonths, subMonths } from 'date-fns';
import { Weekdays } from '../../utils/Weekdays/Weekdays';
import clsx from 'clsx';
import { EventCalendarProps, Event } from './types';
import { useMemo } from 'react';
import useStore, { State } from '../../zustand/store';
import { FcNext, FcPrevious } from "react-icons/fc";

const EventCalendar = ({ events }: EventCalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
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

    const goToPreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const goToCurrentMonth = () => {
        setCurrentDate(new Date());
    };

    const handleDaysClick = (day: Date) => {
        const starting = startingDate;
        const ending = endingDate;

        if (!starting || ending || day < starting) {
            useStore.setState({ startingDate: day, endingDate: undefined });
            return;
        }

        useStore.setState({ endingDate: day });
    };

    return (
        <div className='container mx-auto p-4 border mt-5 border-gray-800 shadow-md shadow-slate-600 rounded-md'>
            <div className='mb-1 flex flex-row items-center justify-center p-2' >
                <button onClick={goToPreviousMonth} className='text-2xl'>
                    <FcPrevious />
                </button>
                <h1 className='text-center text-2xl px-4 font-bold'>{format(currentDate, 'MMMM yyyy')}</h1>
                <button onClick={goToNextMonth} className='text-2xl'>
                    <FcNext />
                </button>
                <button
                    onClick={goToCurrentMonth}
                    className='border border-gray-800 w-24 ml-7 rounded h-11'>
                    Today
                </button>
            </div>
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
