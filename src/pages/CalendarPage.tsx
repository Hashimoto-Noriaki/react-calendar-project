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
import { CalendarHeader, CalendarBody } from "../shared/components/organisms";

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
            <CalendarHeader />
            <CalendarBody currentDate={new Date()} dateList={dateList} />
        </table>
    </>
    );
};
