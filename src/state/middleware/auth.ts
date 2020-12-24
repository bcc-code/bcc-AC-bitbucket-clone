
import { Middleware } from 'redux'

import { setUser, setLogInError, setRegisterError, setLogout } from '@/state/action/authAction'
import { closeSignInModal, openSignInModal } from '@/state/action'
import { getUserLibrary } from '@/state/action/userAction'
import { IRootState } from '@/state/types'
import ac_strings from '@/strings/ac_strings.js'
/* import { IProfileRes } from '@/types/apiResType' */

import acApi from '@/util/api'


const apiMiddleware: Middleware<void, IRootState> = (store) => (next) => (action) => {
    switch (action.type) {
        // only catch a specific action
        case 'INITIATE_CONSENT_NOTIFY':
            const { receivedEmail, consent } = action.payload
            return acApi.toggleNotifyAndGiveConsent(receivedEmail)
                .then(res => {
                    if (res.consent.success) {
                        return acApi.profile().then(userRes => {
                            if (userRes && userRes.meta && userRes.meta.consented) {
                                store.dispatch(setUser(userRes))
                                store.dispatch(getUserLibrary())
                                store.dispatch(closeSignInModal())
                            } else {
                                store.dispatch(openSignInModal("signInForm"))
                            }
                            /* return store.dispatch(setUser(userRes)) */
                        })
                    } else {
                        store.dispatch(setLogout())
                        store.dispatch(setLogInError('Something'))
                    }

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
                        const data = res.signIn
                        if (data.success && data.user) {

                            if (data.user.meta && data.user.meta.consented) {
                                store.dispatch(setUser(data.user))
                                store.dispatch(closeSignInModal())
                                store.dispatch(setLogInError(''))
                            } else {
                                store.dispatch(setLogInError(''))
                                store.dispatch(openSignInModal("giveConsent"))
                            }

                        } else {

                            throw new Error(ac_strings.error_email_password)
                        }
                    } else {
                        throw new Error(ac_strings.error_email_password)
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
                .register(register_email, register_password, false)
                .then((UserRes: any) => {
                    if (UserRes && UserRes.signUp && UserRes.signUp.user) {
                        store.dispatch(setUser(UserRes.signUp.user))
                        if (UserRes.signUp.user.meta && UserRes.signUp.user.meta.consented) {
                            store.dispatch(closeSignInModal())
                        } else {
                            store.dispatch(openSignInModal("signInForm"))
                        }

                    } else {
                        store.dispatch(setRegisterError(ac_strings.error_something_went_wrong))
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