import { useState } from "react";
import { getDate } from "date-fns";
import { dateColor } from "../../../libs/date";
import { ScheduleBtn } from "../atoms/ScheduleBtn";
import { ScheduleDetailModal } from "./ScheduleDetailModal";
import { UpdateScheduleModal } from "./UpdateScheduleModal";
import type { DateList, Schedule } from "../../../types/calendar";

type PropsType = {
  currentDate: Date;
  dateList: DateList;
  updateSchedule: (schedule: Schedule) => Promise<void>;
  deleteSchedule: (schedule: Schedule) => Promise<void>;
};

export const CalendarBody = ({ currentDate, dateList, updateSchedule,deleteSchedule }: PropsType) => {
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isUpdateOpen,setIsUpdateOpen] = useState(false);

  const closeDetailModal = () => setSelectedSchedule(null);
  const openUpdateModal = () => setIsUpdateOpen(true);
  const closeUpdateModal = () => setIsUpdateOpen(false);

  const handleDelete = async () => {
    if (!selectedSchedule) return;
    await deleteSchedule(selectedSchedule);
    closeDetailModal();
  };

  return (
    <>
      <tbody>
        {dateList.map((oneWeek) => (
          <tr key={`week-${getDate(oneWeek[0].date)}`} className="mx-10">
            {oneWeek.map((item) => (
              <td
                key={`day-${getDate(item.date)}`}
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
                <div className="flex flex-col items-center gap-1 pb-2">
                  {item.schedules.map((schedule) => (
                    <ScheduleBtn
                      key={schedule.id}
                      onClick={() => setSelectedSchedule(schedule)}
                    >
                      {schedule.title}
                    </ScheduleBtn>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <ScheduleDetailModal
        selectedSchedule={selectedSchedule}
        closeModal={closeDetailModal}
        onClickEdit={openUpdateModal}
        onClickDelete={handleDelete}
      />
      {selectedSchedule && (
        <UpdateScheduleModal
          isOpen={isUpdateOpen}
          closeModal={closeUpdateModal}
          selectedSchedule={selectedSchedule}
          updateSchedule={updateSchedule}
        />
      )}
    </>
  );
};
