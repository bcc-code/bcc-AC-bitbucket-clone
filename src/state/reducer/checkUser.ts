
import { openSignInModal, closeSignInModal, openInfo } from '@/state/action'
import { setLogout, setUser } from '@/state/action/authAction'
import { getUserLibrary } from '@/state/action/userAction'
const acApiModule = import('@/util/api')
import { IUser } from '@/types'

export default (dispatch: any) => {
    acApiModule.then(res => {
        const api = res.default
        api
            .profile()
            .then((res: IUser) => {
                if (res && res.id) {
                    if (res.meta && res.meta.consented) {
                        console.log(res)
                        dispatch(setUser(res))
                        dispatch(getUserLibrary())
                        dispatch(closeSignInModal())
                        dispatch(openInfo({ text: "You logged in!" }))
                    } else {
                        dispatch(openSignInModal("giveConsent"))
                    }
                } else {
                    dispatch(setLogout())
                }
            })
            .catch((err: any) => {
                console.log(err)
                dispatch(setLogout())
                console.log('handle login error')
            })
    })

}