import * as React from 'react';
import ac_strings from '@/strings/ac_strings.js'
import SideNavWrapper from './SideNavWrapper'

import { SideNavItem } from '@/components/Button'
import loadable from '@loadable/component'
import { userMenuItems } from '@/strings/generated/menus.json'

const EditProfile = loadable(() => import('./EditProfile'))
const EditAccountSettings = loadable(() => import('./EditAccountSettings'))

const SideMobile: React.FC<{
    isSideNavOpen: boolean
    close: () => void
    back: () => void
}> = ({ isSideNavOpen, close, back }) => {

    const [openEditProfile, setOpenEditProfile] = React.useState(false)
    const closeEditProfile = () => {
        setOpenEditProfile(false)
        close()
    }

    const [openEditAcc, setOpenEditAcc] = React.useState(false)
    const closeEditAcc = () => {
        setOpenEditAcc(false)
        close()
    }


    return (
        <SideNavWrapper
            title={ac_strings.my_profile}
            isSideNavOpen={isSideNavOpen}
            back={back}
            className="flex flex-col "
        >
            {openEditProfile && <EditProfile
                close={closeEditProfile}
                back={() => setOpenEditProfile(false)}
                isSideNavOpen={openEditProfile}
            />}
            {openEditAcc && <EditAccountSettings
                close={closeEditAcc}
                back={() => setOpenEditAcc(false)}
                isSideNavOpen={openEditAcc}
            />}
            <div className="w-full justify-center items-center flex flex-col px-4 py-8">
                {[
                    userMenuItems.myContent,
                    userMenuItems.history
                ].map((item, i) => {
                    return (
                        <SideNavItem key={i} to={item.to} onClick={close}>
                            {item.name}
                        </SideNavItem >
                    )
                })}
            </div>
        </SideNavWrapper>
    )
}

export default React.memo(SideMobile)
