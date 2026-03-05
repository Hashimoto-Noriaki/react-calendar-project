import { PrimaryBtn } from "../shared/components/atoms/PrimaryBtn";

export const LoginPage = () => {
    return (
        <div className="w-125 bg-white rounded-lg shadow-lg py-10">
            <form className="flex flex-col items-center justify-center gap-10">
                <h1 className="text-3xl font-bold text-lime-800">ログイン</h1>
                <div className="w-[80%]">
                    <input
                        type="text"
                        className="w-full border-4 border-solid border-lime-800 rounded-md p-2"
                        placeholder="メールアドレス"
                    />
                </div>
                <div className="w-[80%]">
                    <input
                        type="password"
                        className="w-full border-4 border-solid border-lime-800 rounded-md p-2"
                        placeholder="パスワード"
                    />
                </div>
                <PrimaryBtn>ログイン</PrimaryBtn>
            </form>
        </div>
    )
}