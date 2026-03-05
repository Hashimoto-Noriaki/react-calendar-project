import { Input } from "../shared/components/atoms/Input";
import { PrimaryBtn } from "../shared/components/atoms/PrimaryBtn";

export const LoginPage = () => {
    return (
        <div className="w-125 bg-white rounded-lg shadow-lg py-10">
            <form className="flex flex-col items-center justify-center gap-10">
                <h1 className="text-3xl font-bold text-lime-800">ログイン</h1>
                <div className="w-[80%]">
                    <Input
                        type="text"
                        placeholder="メールアドレス"
                    />
                </div>
                <div className="w-[80%]">
                    <Input
                        type="password"
                        placeholder="パスワード"
                    />
                </div>
                <PrimaryBtn>ログイン</PrimaryBtn>
            </form>
        </div>
    )
}