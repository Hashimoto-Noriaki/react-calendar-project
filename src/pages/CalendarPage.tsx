import { useState, useEffect } from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  getMonth,
  isSameDay,
  parseISO,
  startOfMonth,
} from "date-fns";
import type { DateList, Schedule } from "../types/calendar";
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

      // fetchした予定を対応する日付のセルに格納
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