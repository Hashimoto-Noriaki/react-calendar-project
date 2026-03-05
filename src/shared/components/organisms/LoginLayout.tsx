import { Link,Navigate,Outlet,useNavigate } from "react-router-dom";
import { useLoginUser } from "../../../features/auth/hooks/useLoginUser";
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

export const LoginLayout = () => {
    const navigate = useNavigate()
    const { loginUser, setLoginUser } = useLoginUser()

    const handleLogout = () => {
        setLoginUser({ id: 0, name: "" })
        navigate("/login")
    }

    // ログインしていない場合はログインページにリダイレクト
    if(loginUser.id === 0) return <Navigate to="/login" />

    return (
        <div className="relative">
            <header className="bg-white leading-12.5 fixed top-0 left-0 right-0">
                <div className="container mx-auto flex justify-between">
                    <h1 className="logo">
                        <Link to="/">スケジュール管理APP</Link>
                    </h1>
                    <nav>
                        <ul className="flex gap-5 text-lime-800">
                            <li className="flex items-center gap-2">
                                <FaUser/>
                                {loginUser.name}
                            </li>
                            <li className="flex items-center gap-2">
                                <MdLogout/>
                                <a onClick={handleLogout}>ログアウト</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="pt-12.5 bg-linear-to-r from-lime-100 to-lime-200 h-screen flex flex-col justify-center items-center">
                <Outlet/>
            </main>
        </div>
    )
}
