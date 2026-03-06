import { useState } from "react";
import { getMonth } from "date-fns";
import { useCalendar } from '../hooks/useCalendar'
import {
    CalendarHeader,
    CalendarBody,
    CalendarNav,
} from "../shared/components/organisms";

export const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const { dateList } = useCalendar({ currentDate });

    return (
        <>
            <h1 className="font-bold text-3xl mb-5">
                {`${getMonth(currentDate) + 1}月`}
            </h1>
            <CalendarNav setCurrentDate={setCurrentDate} />
            <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
                <CalendarHeader />
                <CalendarBody currentDate={currentDate} dateList={dateList} />
            </table>
        </>
    );
};
