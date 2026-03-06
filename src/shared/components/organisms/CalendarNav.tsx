import { Dispatch, SetStateAction } from "react";
import { addMonths } from "date-fns";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { PrimaryBtn } from "../atoms/PrimaryBtn";

type PropsType = {
    setCurrentDate: Dispatch<SetStateAction<Date>>;
};

export const CalendarNav = ({ setCurrentDate }: PropsType) => {
    const changeToday = () => setCurrentDate(new Date());
    const changePrevMonth = () => setCurrentDate((prev) => addMonths(prev, -1));
    const changeNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

    return (
    <div className="w-[80%] flex justify-between mb-2">
        <div className="flex items-center gap-4">
            <FaArrowAltCircleLeft
                className="text-lime-800 text-2xl cursor-pointer"
                onClick={changePrevMonth}
            />
            <PrimaryBtn size="sm" onClick={changeToday}>
                今日
            </PrimaryBtn>
            <FaArrowAltCircleRight
                className="text-lime-800 text-2xl cursor-pointer"
                onClick={changeNextMonth}
            />
        </div>
    </div>
    );
};
