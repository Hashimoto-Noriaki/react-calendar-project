import { useLoginUser } from '../features/auth'

export const CalendarPage = () => {
    // Contextからログインユーザー情報を取得
    const { loginUser } = useLoginUser()
    return (
        <div>
            <p>ID: {loginUser.id}</p>
            <p>名前: {loginUser.name}</p>
        </div>
    )
}
