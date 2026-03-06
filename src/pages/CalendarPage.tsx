import { useState, useEffect } from "react";
import {
    eachDayOfInterval,
    eachWeekOfInterval,
    endOfMonth,
    endOfWeek,
    getMonth,
    startOfMonth,
} from "date-fns";
import type { DateList } from "../types/calendar";
import {
    CalendarHeader,
    CalendarBody,
    CalendarNav,
} from "../shared/components/organisms";

export const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [dateList, setDateList] = useState<DateList>([]);

    useEffect(() => {
        const fetchCalendar = async () => {
            const res = await fetch("/api/schedules");
            await res.json();

            const monthOfSundayList = eachWeekOfInterval({
                start: startOfMonth(currentDate),
                end: endOfMonth(currentDate),
            });
            const newDateList: DateList = monthOfSundayList.map((date) =>
                eachDayOfInterval({
                    start: date,
                    end: endOfWeek(date),
                }).map((date) => ({ date, schedules: [] }))
            );

            setDateList(newDateList);
        };

        fetchCalendar();
    }, [currentDate]);

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
