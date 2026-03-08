import Modal from "react-modal";
import { ChangeEvent, FormEvent, useState } from "react";
import { format } from "date-fns";
import { Input } from "../atoms/Input";
import { PrimaryBtn } from "../atoms/PrimaryBtn";
import { Textarea } from "../atoms/Textarea";
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

const INIT_SCHEDULE: NewSchedule = {
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
};

export const CreateScheduleModal = ({
    isOpen,
    closeModal,
    addSchedule,
}: PropsType) => {
    const [newSchedule, setNewSchedule] = useState<NewSchedule>(INIT_SCHEDULE);
    const [errorMessage, setErrorMessage] = useState("");

    const changeNewSchedule = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
    const { name, value } = event.target;
    setNewSchedule({ ...newSchedule, [name]: value });
    };

    const handleCreateSchedule = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (newSchedule.title === "") {
            setErrorMessage("タイトルを入力してください");
        return;
        } else {
            setErrorMessage("");
        }
        await addSchedule(newSchedule);
        setNewSchedule(INIT_SCHEDULE);
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
            <div>
                <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">
                    予定作成
                </h3>
                {errorMessage !== "" && (
                    <div className="p-3 mb-3 bg-red-500 text-white text-center rounded-lg">
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
