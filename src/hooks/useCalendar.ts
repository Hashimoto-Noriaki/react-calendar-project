import { useState, useEffect } from "react";
import {
    eachDayOfInterval,
    eachWeekOfInterval,
    endOfMonth,
    endOfWeek,
    isSameDay,
    parseISO,
    startOfMonth,
} from "date-fns";
import type { DateList, Schedule } from "../types/calendar";

type PropsType = {
    currentDate: Date;
};

export const useCalendar = ({ currentDate }: PropsType) => {
    const [dateList, setDateList] = useState<DateList>([]);

    useEffect(() => {
        const fetchCalendar = async () => {
            const res = await fetch("/api/schedules");
            const scheduleList: Schedule[] = await res.json();

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

            scheduleList.forEach((schedule) => {
                const scheduleDate = parseISO(schedule.date);
                const firstIndex = newDateList.findIndex((oneWeek) =>
                    oneWeek.some((item) => isSameDay(item.date, scheduleDate))
                );
                if (firstIndex === -1) return;
                const secondIndex = newDateList[firstIndex].findIndex((item) =>
                    isSameDay(item.date, scheduleDate)
                );
                newDateList[firstIndex][secondIndex].schedules = [
                    ...newDateList[firstIndex][secondIndex].schedules,
                    schedule,
                ];
            });

            setDateList(newDateList);
        };

        fetchCalendar();
    }, [currentDate]);

    return { dateList };
};
