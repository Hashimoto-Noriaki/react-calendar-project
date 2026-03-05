import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../shared/components/atoms/Input";
import { PrimaryBtn } from "../shared/components/atoms/PrimaryBtn";
import { loginSchema, type LoginFormData } from "../features/auth/schemas/loginSchema"
import { login } from "../features/auth/api/login";
import { useLoginUser } from "../features/auth/hooks/useLoginUser"

export const LoginPage = () => {
    const navigate = useNavigate()
    const { setLoginUser } = useLoginUser()
    const [errorMessage,setErrorMessage] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data: LoginFormData) => {
        setErrorMessage("")
        try {
            const resUser = login(data)
            setLoginUser({ id: resUser.id, name: resUser.name })
            navigate("/calendar")
        } catch {
            setErrorMessage("ログインに失敗しました。")
        }
    }

    return (
        <div className="w-125 bg-white rounded-lg shadow-lg py-10">
            <form className="flex flex-col items-center justify-center gap-10" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-3xl font-bold text-lime-800">ログイン</h1>
                {errorMessage !== "" && (
                    <div className="p-5 bg-red-500 text-white w-[80%] rounded-lg">
                        {errorMessage}
                    </div>
                )}
                <div className="w-[80%]">
                    <Input
                        type="text"
                        placeholder="メールアドレス"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div className="w-[80%]">
                    <Input
                        type="password"
                        placeholder="パスワード"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>
                <PrimaryBtn onClick={()=> null}>ログイン</PrimaryBtn>
            </form>
        </div>
    )
}