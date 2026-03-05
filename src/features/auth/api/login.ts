import type { LoginFormData } from '../schemas/loginSchema'
import type { LoginReturnType } from '../types/login'

export const login = (info: LoginFormData): LoginReturnType => {
    const { email, password } = info
    if(email === "test@example.com" && password === "password"){
        return { id: 1, name: "sample太郎" }
    } else {
        throw new Error("ログインに失敗しました。")
    }
}
