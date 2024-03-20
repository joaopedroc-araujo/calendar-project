import { eachDayOfInterval, endOfMonth, format, getDay, startOfMonth } from 'date-fns';
import { Weekdays } from '../../utils/Weekdays/Weekdays';

const EventCalendar = () => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    const startingDayIndex = getDay(firstDayOfMonth);

    return (
        <div className='container mx-auto py-4'>
            <div className='mb-4'>
                <h2 className='text-center'>{format(currentDate, 'MMMM yyyy')}</h2>
            </div>
            <div
                className='grid grid-cols-7'
                style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}
            >
                {Weekdays.map((day) => {
                    return (
                        <div
                            key={day}
                            className='font-bold text-center'
                        >
                            {day}
                        </div>
                    )
                })}
                {Array.from({ length: startingDayIndex }).map((_, index) => {
                    return (
                        <div
                            key={`empty-${index}`}
                            className='border rounded-md p-2 text-center'
                        />
                    );
                })}

                {daysInMonth.map((day, index) => {
                    return (
                        <div
                            key={index}
                            className='border rounded-md p-2 text-center'
                        >
                            {format(day, 'd')}
                        </div>
                    );
                })
                }
            </div>
        </div>
    );
};

export default EventCalendar;