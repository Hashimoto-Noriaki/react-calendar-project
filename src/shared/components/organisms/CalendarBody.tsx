import { getDate } from "date-fns";
import { dateColor } from "../../../libs/date";
import type { DateList } from "../../../types/calendar";

type PropsType = {
    currentDate: Date;
    dateList: DateList;
};

export const CalendarBody = ({ currentDate, dateList }: PropsType) => {
    return (
        <tbody>
            {dateList.map((oneWeek, weekIndex) => (
                <tr key={`week-${weekIndex}`} className="mx-10">
                    {oneWeek.map((item, dayIndex) => (
                        <td
                            key={`day-${weekIndex}-${dayIndex}`}
                            className="bg-white h-[10vh] border-2 border-solid border-lime-800"
                        >
                            <span
                                className={`inline-block w-5 leading-5 text-center ${dateColor(
                                    item.date,
                                    currentDate
                                )}`}
                            >
                                {getDate(item.date)}
                            </span>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};
