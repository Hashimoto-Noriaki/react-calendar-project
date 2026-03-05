import { useState, useEffect } from "react";
import {
    eachDayOfInterval,
    eachWeekOfInterval,
    endOfMonth,
    endOfWeek,
    getDate,
    getMonth,
    startOfMonth,
} from "date-fns";
import { DAYS_LIST } from "../constants/calendar";
import type { DateList } from "../types/calendar";
import { dateColor } from "../libs/date"; 

export const CalendarPage = () => {
    const [dateList, setDateList] = useState<DateList>([]);

    useEffect(() => {
        const currentDate = new Date(); // useEffect内で定義することで警告が出ない
        const fetchCalendar = async () => {
            // MSWのAPIから予定一覧を取得（現時点では空配列が返る）
            const res = await fetch("/api/schedules");
            await res.json(); // 後の章で予定を反映する際に使用する

            // 表示月の各週の開始日（日曜）を取得
            const monthOfSundayList = eachWeekOfInterval({
                start: startOfMonth(currentDate),
                end: endOfMonth(currentDate),
            });

            // 各週の開始日から7日間の配列を作り、二次元配列にする
            const newDateList: DateList = monthOfSundayList.map((date) =>
                eachDayOfInterval({
                    start: date,
                    end: endOfWeek(date),
                }).map((date) => ({ date, schedules: [] }))
            );
            setDateList(newDateList);
        };
        fetchCalendar();
    }, []);

    return (
    <>
        <h1 className="font-bold text-3xl mb-5">
        {`${getMonth(new Date()) + 1}月`}
        </h1>
        <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
            <thead>
                <tr className="bg-lime-800 text-white rounded-tl-lg rounded-tr-lg py-10">
                {DAYS_LIST.map((day) => (
                    <th key={day} className="text-center text-xl py-3">
                    {day}
                    </th>
                ))}
                </tr>
            </thead>
            <tbody>
                {dateList.map((oneWeek, weekIndex) => (
                    <tr key={`week-${weekIndex}`} className="mx-10">
                        {oneWeek.map((item, dayIndex) => (
                            <td
                                key={`day-${weekIndex}-${dayIndex}`}
                                className="bg-white h-[10vh] border-2 border-solid border-lime-800"
                            >
                                <span className={`inline-block w-5 leading-5 text-center ${dateColor(
                                    item.date,
                                    new Date()
                                )}`}>
                                    {getDate(item.date)}
                                </span>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </>
    );
};
