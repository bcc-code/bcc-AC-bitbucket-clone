import * as React from 'react'
import Link from '@/components/CustomLink'
import { useDispatch } from 'react-redux'
import ac_strings from '@/strings/ac_strings.js'
import { openSignInModal } from '@/state/action'
import { slugUser } from '@/strings/generated/menus.json'
import HOCLoginCheck from '@/HOC/LogInCheck'
import { setLogout, setUser, } from '@/state/action/authAction'

interface IUserNav {
    className?: string
    col?: boolean
    callback?: () => void
}
const UserNav: React.FC<IUserNav> = ({ className, col, callback }) => {
    const dispatch = useDispatch()
    /*     const { authInfo } = useSelector((state: IRootState) => ({ authInfo: state.auth })); */

    const handleSignIn = () => {
        dispatch(openSignInModal("signInOptions"))
        if (callback) {
            callback()
        }
    }

    const handleSignUp = () => {
        dispatch(openSignInModal("signUpOptions"))
        if (callback) {
            callback()
        }
    }

    const onClick = () => {
        if (callback) {
            callback()
        }
    }

    const handleLogout = () => {
        const r = confirm("You are logging out now");
        if (r == true) {
            dispatch(setLogout())
        }

    }
    return (
        <HOCLoginCheck
            render={({ loginStatus }) => {
                switch (loginStatus) {
                    case "loading":
                        return (
                            <div className="px-2">
                                {ac_strings.loading}
                            </div>
                        )
                    case "success":
                        return (
                            <div className={`${col ? 'flex flex-col justify-center' : 'grid grid-cols-2'} ${className}`}>
                                <Link
                                    className="py-2 hover:text-ac-slate px-2"
                                    onClick={onClick}
                                    to={`/${slugUser}`}
                                >
                                    {ac_strings.title_user}
                                </Link>
                                <button className="py-2 text-center hover:text-ac-slate px-2" onClick={handleLogout}>{ac_strings.logout}</button>

                            </div>
                        )
                    case "notLoggedIn":
                        return (
                            <div className={`${col ? 'flex flex-col' : 'grid grid-cols-2'} ${className}`}>
                                <span className="whitespace-no-wrap px-2 py-1 text-center cursor-pointer hover:text-ac-slate" onClick={handleSignIn}>{ac_strings.login}</span>
                                <span className="px-2 py-1 text-center cursor-pointer bg-ac-slate-dark rounded mb-1 text-white hover:text-ac-slate-lighter" onClick={handleSignUp}>{ac_strings.register}</span>
                            </div>
                        )

                    default:
                        return (
                            <div className={`${col ? 'flex flex-col' : 'grid grid-cols-2'} ${className}`}>
                                <span className="whitespace-no-wrap px-2 py-1 text-center cursor-pointer hover:text-ac-slate" onClick={handleSignIn}>{ac_strings.login}</span>
                                <span className="px-2 py-1 text-center cursor-pointer bg-ac-slate-dark rounded mb-1 text-white hover:text-ac-slate-lighter" onClick={handleSignUp}>{ac_strings.register}</span>
                            </div>
                        )
                }
            }}

        />
    )

}

export default UserNav