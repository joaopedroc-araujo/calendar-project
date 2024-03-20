import { addMonths, subMonths, format } from 'date-fns';
import { FcNext, FcPrevious } from "react-icons/fc";
import { useMonthContext } from '../../../../context/MonthContext';

const Header = () => {
    const { currentDate, handleMonthChange } = useMonthContext();

    const goToPreviousMonth = () => {
        handleMonthChange(subMonths(currentDate, 1));
    };

    const goToNextMonth = () => {
        handleMonthChange(addMonths(currentDate, 1));
    };

    const goToCurrentMonth = () => {
        handleMonthChange(new Date());
    };

    return (
        <div className='mb-1 flex flex-row items-center justify-center p-2' >
            <button onClick={goToPreviousMonth} className='text-2xl'>
                <FcPrevious />
            </button>
            <h1 className='text-center text-2xl px-4 font-bold'>{format(currentDate, "MMMM yyyy")}</h1>
            <button onClick={goToNextMonth} className='text-2xl'>
                <FcNext />
            </button>
            <button
                onClick={goToCurrentMonth}
                className='border border-gray-800 w-24 ml-7 rounded h-11'>
                Today
            </button>
        </div>
    )
}

export default Header;