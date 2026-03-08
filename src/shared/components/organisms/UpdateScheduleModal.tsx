import Modal from "react-modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../atoms/Input";
import { PrimaryBtn } from "../atoms/PrimaryBtn";
import { Textarea } from "../atoms/Textarea";
import type { Schedule } from "../../../types/calendar";

type PropsType = {
    isOpen: boolean;
    closeModal: () => void;
    selectedSchedule: Schedule;
    updateSchedule: (schedule: Schedule) => Promise<void>;
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

export const UpdateScheduleModal = ({
    isOpen,
    closeModal,
    selectedSchedule,
    updateSchedule,
}: PropsType) => {
    const [editSchedule, setEditSchedule] = useState<Schedule>(selectedSchedule);

    const changeEditSchedule = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setEditSchedule({ ...editSchedule, [name]: value });
    };

    const handleUpdateSchedule = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateSchedule(editSchedule);
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
            <div>
                <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
                    予定編集
                </h3>
                <form className="flex flex-col gap-8" onSubmit={handleUpdateSchedule}>
                    <div className="w-full flex items-center">
                        <label className="w-[30%] text-lime-800">タイトル</label>
                        <Input
                            name="title"
                            type="text"
                            value={editSchedule.title}
                            onChange={changeEditSchedule}
                        />
                    </div>
                    <div className="w-full flex items-center">
                        <label className="w-[30%] text-lime-800">日付</label>
                        <Input
                            name="date"
                            type="date"
                            value={editSchedule.date}
                            onChange={changeEditSchedule}
                        />
                    </div>
                    <div className="w-full flex items-center">
                        <label className="w-[30%] text-lime-800">内容</label>
                        <Textarea
                            name="description"
                            value={editSchedule.description}
                            onChange={changeEditSchedule}
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            className="bg-gray-200 text-gray-700 rounded px-6 py-2"
                            onClick={closeModal}
                        >
                            キャンセル
                        </button>
                        <PrimaryBtn size="lg" type="submit">
                            保存
                        </PrimaryBtn>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
