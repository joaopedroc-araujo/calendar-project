import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from 'date-fns';
import { Weekdays } from '../../utils/Weekdays/Weekdays';
import clsx from 'clsx';
import { EventCalendarProps, Event } from './types';
import { useMemo, useState } from 'react';
import useStore, { State } from '../../zustand/store';
import Header from './components/Header';
import { useMonthContext } from '../../context/MonthContext';
import useHandleDaysClick from '../../utils/Functions/HandleDaysClick';
import InputModal from './components/InputsModal';

const EventCalendar = ({ events }: EventCalendarProps) => {
    const { currentDate } = useMonthContext();
    const handleDaysClick = useHandleDaysClick();
    const [showModal, setShowModal] = useStore((state: State) => [state.showModal, state.setShowModal]);

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
        return events.reduce((acc: { [key: string]: Event }, event) => {
            const startDate = new Date(event['starting-date']);
            const endDate = new Date(event['ending-date']);

            endDate.setDate(endDate.getDate() + 1);

            const datesInRange = eachDayOfInterval({ start: startDate, end: endDate });

            datesInRange.forEach(date => {
                const dateKey = format(date, 'yyyy-MM-dd');
                if (!acc[dateKey]) {
                    acc[dateKey] = event;
                }
            });

            return acc;
        }, {});
    }, [events]);

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
                            className='border rounded-md border-gray-800 bg-slate-400 p-2 text-center w-28 h-28 ml-[10px]'
                        />
                    );
                })}

                {daysInMonth.map((day, index) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const todayEvent = eventsByDay[dateKey];
                    const isCurrentDayClicked = startingDate && format(startingDate, 'yyyy-MM-dd') === dateKey;
                    const isTodayClicked = isToday(day) && isCurrentDayClicked;
                    const isWithinRange = startingDate && endingDate && day >= startingDate && day <= endingDate;

                    return (
                        <div
                            key={index}
                            className={clsx('border border-gray-800 rounded-md p-2 w-28 h-28 text-center align-top ml-[10px]',
                                {
                                    'bg-gray-400': isToday(day),
                                    'text-white': isToday(day),
                                })}
                            onClick={() => handleDaysClick(day)} >
                            <span>{format(day, 'd')}</span>
                            {(isWithinRange && !isTodayClicked) && (
                                <div className='bg-blue-500 text-gray-600 mt-4'>New Event</div>
                            )}
                            {todayEvent && (
                                <div
                                    className='bg-blue-500 text-gray-600 mt-4'>
                                    {todayEvent.title}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {showModal && (
                <InputModal />
            )}
        </div >
    );
};

export default EventCalendar;
