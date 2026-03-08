import { ChangeEvent, FormEvent, useState } from "react"
import { format } from "date-fns"
import type { NewSchedule } from "../types/calendar"

const INIT_SCHEDULE: NewSchedule = {
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
}

type PropsType = {
    closeModal: () => void
    addSchedule: (newSchedule: NewSchedule) => Promise<void>
}

export const useCreateSchedule = ({ closeModal, addSchedule }: PropsType) => {
    const [newSchedule, setNewSchedule] = useState<NewSchedule>(INIT_SCHEDULE)
    const [errorMessage, setErrorMessage] = useState("")

    const changeNewSchedule = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target
        setNewSchedule({ ...newSchedule, [name]: value })
    }

    const handleCreateSchedule = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (newSchedule.title === "") {
            setErrorMessage("タイトルを入力してください")
            return
        } else {
            setErrorMessage("")
        }
        await addSchedule(newSchedule)
        setNewSchedule(INIT_SCHEDULE)
        closeModal()
    }

    return {
        errorMessage,
        newSchedule,
        changeNewSchedule,
        handleCreateSchedule,
    }
}
