
import React, { Profiler } from 'react'
import { useDispatch } from "react-redux"
import loadable from '@loadable/component'
/* import shortid from 'shortid'
import Breadcrumb from './Breadcrumb'
import TopDesktop from '@/layout-parts/Nav/TopDesktop'
import TopMobile from '@/layout-parts/Nav/TopMobile'
const SideNav = loadable(() => import('@/layout-parts/Nav/SideNav/index.tsx'))
const Footer = loadable(() => import('@/layout-parts/Footer'))
 */

import { openSignInModal } from '@/state/action'
import { setLogout, setUser, } from '@/state/action/authAction'
import { getUserLibrary } from '@/state/action/userAction'

const MediaPlayer = loadable(() => import('@/components/MediaPlayer/AudioPlayerGlobal'))
import shortid from 'shortid'
import BottomMobile from '@/layout-parts/Nav/BottomMobile'

import CookieConsent from "@/layouts/AppWrapper/CookeConsent";
import Helmet from 'react-helmet'
const SignInSignUpModal = loadable(() => import('@/layout-parts/SignInSignUp'))
import { menusItems } from '@/strings/generated/menus.json'

function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
) {
    console.log(id)
    console.log(actualDuration)
    // Aggregate or log render timings...
}
// string

import acApi from '@/util/api'
// type 
import { IUser } from '@/types'


import './Layout.css'


export interface IDrawerNav {
    isSideNavOpen: boolean
    setSideNavOpen: (status: boolean) => void
    isModalOpen?: boolean
}


const App: React.FC<{ pageContext: { title?: string, slug?: string } }> = (props) => {
    const { children } = props
    const localStorageKey = 'ac.loggedIn'
    const dispatch = useDispatch();
    const [isSideNavOpen, setSideNavOpen] = React.useState(false)

    React.useEffect(() => {
        const redirectedFromFb = window.location.href && window.location.href.indexOf('#_=_') > -1
        const loggedIn = localStorage.getItem(localStorageKey)
        if (loggedIn === "true" || redirectedFromFb) {
            checkUser()
        }

    }, [])

    const checkUser = () => {
        console.log('checking user')
        acApi
            .profile()
            .then((res: IUser) => {
                if (res && res.id) {
                    if (res.meta && res.meta.consented) {
                        dispatch(setUser(res))
                        dispatch(getUserLibrary())
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
    }

    const handleSideNavOpen = (status: boolean) => {
        setSideNavOpen(status)
    }



    const NavProps = React.useMemo(() => {
        return (
            {
                isSideNavOpen,
                setSideNavOpen: handleSideNavOpen
            }
        )
    }, [
        isSideNavOpen,
        setSideNavOpen,
        handleSideNavOpen
    ])

    return (
        <>
            < Profiler id="cookie" onRender={onRenderCallback} >
                <CookieConsent key={shortid()} />
            </ Profiler>
            < Profiler id="sign in" onRender={onRenderCallback} >
                <SignInSignUpModal key={shortid()} />
            </Profiler>

            < Profiler id="media player" onRender={onRenderCallback} >
                <MediaPlayer key={shortid()} />
            </Profiler>

            {/*          <TopDesktop key={shortid()} {...NavProps} explorePage={menusItems.explore} />
            <TopMobile
                {...NavProps}
                key={shortid()}
            />
            {isSideNavOpen && <SideNav {...NavProps} />}
            <Breadcrumb key={shortid()} /> */}
            {children}
            {/* <BottomMobile key={shortid()}  /> */}
            {/*       <Footer key={shortid()} /> */}
        </>

    )

}

export default App

