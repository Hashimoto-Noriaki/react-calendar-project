import { ReactNode, useState } from "react"
import type { LoginUserType } from "../types/login"
import { LoginUserContext } from "./LoginUserContext"

export const LoginUserProvider = ({ children }: { children: ReactNode }) => {
    // ログインユーザー情報をstateで管理
    const [loginUser, setLoginUser] = useState<LoginUserType>({
        id: 0,
        name: "",
    })

    return (
        // valueでログインユーザー情報とセット関数を共有
        <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
            {children}
        </LoginUserContext.Provider>
    )
}
