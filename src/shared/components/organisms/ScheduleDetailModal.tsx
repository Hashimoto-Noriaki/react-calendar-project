import Modal from "react-modal";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import type { Schedule } from "../../../types/calendar";

type PropsType = {
    selectedSchedule: Schedule | null;
    closeModal: () => void;
    onClickEdit:()=> void; 
};

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        width: "30%",
        transform: "translate(-50%, -50%)",
    },
};

export const ScheduleDetailModal = ({
    selectedSchedule,
    closeModal,
    onClickEdit,
}: PropsType) => {
    return (
        <Modal
            isOpen={!!selectedSchedule}
            style={customStyles}
            onRequestClose={closeModal}
        >
            {selectedSchedule && (
                <div className="flex flex-col gap-8">
                    <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
                        {selectedSchedule.title}
                    </h3>
                    <p>{format(parseISO(selectedSchedule.date), "yyyy年M月d日")}</p>
                    <p>{selectedSchedule.description}</p>
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-gray-200 text-gray-700 rounded px-6 py-2"
                            onClick={closeModal}
                        >
                            閉じる
                        </button>
                        <button
                            className="bg-lime-800 text-white rounded px-6 py-2"
                            onClick={onClickEdit}
                        >
                            編集
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
