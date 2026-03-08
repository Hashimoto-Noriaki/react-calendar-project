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
import type { DateList, NewSchedule, Schedule } from "../types/calendar";

type PropsType = {
    currentDate: Date;
};

export const useCalendar = ({ currentDate }: PropsType) => {
    const [dateList, setDateList] = useState<DateList>([]);

    const getDateListIndex = (
    currentDateList: DateList,
    schedule: Schedule
    ): number[] => {
    const scheduleDate = parseISO(schedule.date);
    const firstIndex = currentDateList.findIndex((oneWeek) =>
        oneWeek.some((item) => isSameDay(item.date, scheduleDate))
    );
    if (firstIndex === -1) return [-1, -1];
    const secondIndex = currentDateList[firstIndex].findIndex((item) =>
        isSameDay(item.date, scheduleDate)
    );
    return [firstIndex, secondIndex];
    };

    const addSchedule = async (newSchedule: NewSchedule) => {
        const res = await fetch("/api/schedules", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSchedule),
        });
        const schedule: Schedule = await res.json();

        const newDateList = [...dateList];
        const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
        if (firstIndex === -1) return;
        newDateList[firstIndex][secondIndex].schedules = [
            ...newDateList[firstIndex][secondIndex].schedules,
            schedule,
        ];
        setDateList(newDateList);
    };

    const updateSchedule = async (updatedSchedule: Schedule) => {
        await fetch(`/api/schedules/${updatedSchedule.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSchedule),
        });

        const newDateList = [...dateList];
        const [firstIndex, secondIndex] = getDateListIndex(newDateList, updatedSchedule);
        if (firstIndex === -1) return;

        newDateList[firstIndex][secondIndex].schedules =
            newDateList[firstIndex][secondIndex].schedules.map((s) =>
                s.id === updatedSchedule.id ? updatedSchedule : s
            );
        setDateList(newDateList);
    };

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
            const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
            if (firstIndex === -1) return;
            newDateList[firstIndex][secondIndex].schedules = [
                ...newDateList[firstIndex][secondIndex].schedules,
                schedule,
            ];
            });

            setDateList(newDateList);
        };
        fetchCalendar();
    }, [currentDate]);

    return { dateList, addSchedule, updateSchedule  };
};
