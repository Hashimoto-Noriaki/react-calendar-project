import { Link,Outlet } from "react-router-dom";

export const NotLoginLayout = () => {
    return (
        <div className="relative">
            <header className="bg-white leading-12.5 fixed top-0 left-0 right-0">
                <div className="container mx-auto flex justify-between">
                    <h1 className="logo">
                        <Link to="/">スケジュール管理APP</Link>
                    </h1>
                    <nav>
                        <ul className="flex gap-5 text-lime-800">
                            <li>利用説明</li>
                            <li>
                                <Link to="/login">ログイン</Link>
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
