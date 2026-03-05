import { useContext } from 'react'
import { LoginUserContext } from '../providers/LoginUserContext'

export const useLoginUser = () => {
     // Contextからデータを取得
    const context = useContext(LoginUserContext)

    // Providerの外で使用された場合のエラーハンドリング
    if(context === undefined){
        throw new Error("useLoginUser must be used within a LoginUserProvider")
    }
    return context
}
