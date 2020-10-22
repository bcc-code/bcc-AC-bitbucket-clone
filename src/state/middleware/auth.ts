
import { Middleware } from 'redux'

import { setUser, setLogInError, setRegisterError, setLogout, } from '@/state/action/authAction'
import { closeSignInModal, openSignInModal } from '@/state/action'
import { getUserLibrary } from '@/state/action/userAction'
import { IRootState } from '@/state/types'

/* import { IProfileRes } from '@/types/apiResType' */

import acApi from '@/util/api'


const apiMiddleware: Middleware<void, IRootState> = (store) => (next) => (action) => {
    switch (action.type) {
        // only catch a specific action
        case 'INITIATE_CONSENT_NOTIFY':
            const { receivedEmail, consent } = action.payload
            const request = []
            if (consent) {
                request.push(
                    acApi.giveConsent()
                )
            }
            if (receivedEmail) {
                request.push(
                    acApi.toggleNotify(true)
                )
            }

            return Promise.all(request).then(res => {
                return acApi.profile().then(userRes => {
                    console.log(userRes)
                    if (userRes && userRes.meta && userRes.meta.consented) {
                        store.dispatch(setUser(userRes))
                        store.dispatch(getUserLibrary())
                        store.dispatch(closeSignInModal())
                    } else {
                        store.dispatch(openSignInModal("signInForm"))
                    }
                    /* return store.dispatch(setUser(userRes)) */
                })
            })
            break
        case 'INITIATE_LOG_IN':
            // continue propagating the action through redux
            // this is our only call to next in this middleware
            next(action)
            const { email: login_email, password: login_password, remember } = action.payload
            // fetch data from an API that may take a while to respond
            acApi.login(login_email, login_password, remember)
                .then((res: any) => {
                    if (res) {
                        console.log(res)
                        if (res.meta && res.meta.consented) {
                            store.dispatch(setUser(res))
                            store.dispatch(closeSignInModal())
                        } else {
                            store.dispatch(openSignInModal("giveConsent"))
                        }

                    } else {
                        throw new Error("Unknown error (possible wrong username or password)")
                    }

                })
                .catch((err: any) => {
                    const message = err[0] || err.message
                    store.dispatch(setLogout())
                    store.dispatch(setLogInError(message))
                })

            break
        case 'INITIATE_REGISTER':

            next(action)

            const { email: register_email, password: register_password, consent: register_consent, receiveEmail: register_receive_email } = action.payload
            /* const reguster_data = { register_fullname, register_email, register_password, register_remember } */
            acApi
                .register(register_email, register_password, true)
                .then((UserRes: any) => {
                    console.log(UserRes)
                    if (UserRes && UserRes.signUp && UserRes.signUp.user) {
                        store.dispatch(setUser(UserRes.signUp.user))
                        if (UserRes.signUp.user.meta && UserRes.signUp.user.meta.consented) {
                            store.dispatch(closeSignInModal())
                        } else {
                            store.dispatch(openSignInModal("giveConsent"))
                        }

                    } else {
                        store.dispatch(setRegisterError('Something went wrong'))
                    }
                })
                .catch((err: any) => {
                    const message = err[0] || err.message
                    store.dispatch(setLogout())
                    store.dispatch(setRegisterError(message))
                })
            break
        case 'INITIATE_LOGOUT':
            acApi
                .logout()
                .then(() => {
                    store.dispatch(setLogout())
                })
                .catch((err: any) => {
                    console.log(err)
                    store.dispatch(setRegisterError(err.message))
                })
            break
        // if we don't need to handle this action, we still need to pass it along


        default: next(action)
    }
}

export default apiMiddleware