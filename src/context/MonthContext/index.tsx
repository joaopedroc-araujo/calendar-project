/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

interface MonthContextType {
    currentDate: Date;
    handleMonthChange: (newMonth: Date) => void;
}

const MonthContext = createContext<MonthContextType>({
    currentDate: new Date(),
    handleMonthChange: () => { },
});

export const useMonthContext = () => useContext(MonthContext);

export const MonthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleMonthChange = (newMonth: Date) => {
        console.log('monthchange')
        setCurrentDate(newMonth);
    };

    return (
        <MonthContext.Provider value={{ currentDate, handleMonthChange }}>
            {children}
        </MonthContext.Provider>
    );
};
