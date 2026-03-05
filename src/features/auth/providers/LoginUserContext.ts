import { createContext } from 'react'
import type { LoginUserType } from '../types/login'

// Contextの型定義
export type LoginUserType = {
    loginUser: LoginUserType
    setLoginUser: (user: LoginUserType)=> void
}

// Contextの作成（初期値はundefined
export const LoginUserContext = createContext<LoginUserType | undefined>(
    undefined
)
