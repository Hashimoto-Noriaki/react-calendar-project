import Modal from "react-modal";
import { Input } from "../atoms/Input";
import { PrimaryBtn } from "../atoms/PrimaryBtn";
import { Textarea } from "../atoms/Textarea";
import { useCreateSchedule } from "../../../hooks/useCreateSchedule";
import type { NewSchedule } from "../../../types/calendar";

type PropsType = {
    isOpen: boolean;
    closeModal: () => void;
    addSchedule: (newSchedule: NewSchedule) => Promise<void>;
};

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        width: "30%",
        height: "50vh",
        transform: "translate(-50%, -50%)",
    },
};

export const CreateScheduleModal = ({
    isOpen,
    closeModal,
    addSchedule,
}: PropsType) => {
    const { newSchedule, errorMessage, changeNewSchedule, handleCreateSchedule } =
        useCreateSchedule({ closeModal, addSchedule });

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
            <div>
            <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
                予定作成
            </h3>
            {errorMessage !== "" && (
                <div className="p-5 mb-5 bg-red-500 text-white text-center rounded-lg">
                {errorMessage}
                </div>
            )}
            <form className="flex flex-col gap-8" onSubmit={handleCreateSchedule}>
                <div className="w-full flex items-center">
                <label className="w-[30%] text-lime-800">タイトル</label>
                <Input
                    name="title"
                    type="text"
                    value={newSchedule.title}
                    onChange={changeNewSchedule}
                />
                </div>
                <div className="w-full flex items-center">
                <label className="w-[30%] text-lime-800">日付</label>
                <Input
                    name="date"
                    type="date"
                    value={newSchedule.date}
                    onChange={changeNewSchedule}
                />
                </div>
                <div className="w-full flex items-center">
                <label className="w-[30%] text-lime-800">内容</label>
                <Textarea
                    name="description"
                    value={newSchedule.description}
                    onChange={changeNewSchedule}
                />
                </div>
                <div className="flex justify-center">
                <PrimaryBtn size="lg" onClick={() => null}>
                    作成
                </PrimaryBtn>
                </div>
            </form>
            </div>
        </Modal>
    );
};
