import { PrimaryBtn } from '../shared/components/organisms/PrimaryBtn'
import { NotLoginLayout } from '../shared/components/organisms/NotLoginLayout'

export const TopPage = () => {
    return (
        <NotLoginLayout>
            <div className="text-center">
                <h1 className="text-7xl logo">スケジュール管理APP</h1>
                <p className="pt-[10vh] text-5xl">お互いのスケジュールを管理するアプリです</p>
            </div>
            <div className="pt-[20vh]">
                <PrimaryBtn>ログイン</PrimaryBtn>
            </div>
        </NotLoginLayout>
    )
}
