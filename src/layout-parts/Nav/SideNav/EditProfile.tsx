import * as React from 'react';
import ac_strings from '@/strings/ac_strings.json'
import SideNavWrapper from './SideNavWrapper'
import Icon from '@/components/Icons/Icon'
import TS from '@/strings'
import UserInitial from '@/layout-parts/User/UserInitial'
import { INavItem } from '@/types'
const SideMobile: React.FC<{
    isSideNavOpen: boolean
    close: () => void
    back: () => void
}> = ({ isSideNavOpen, close, back, }) => {

    return (
        <SideNavWrapper
            title={ac_strings.edit_profile}
            isSideNavOpen={isSideNavOpen}
            back={back}
            className="flex flex-col "
        >
            {/*            <ChangePassword
                isSideNavOpen={openChangePassword}
                close={closeEdit}
                back={() => setOpenChangePassword(false)}
            /> */}
            <div className="mx-auto flex-1 flex flex-col font-roboto items-center justify-center font-semibold">
                {/*  <UserInitial /> */}
                <div>
                    <div><label htmlFor="">{TS.username}</label><input type="text" name="" id="" /></div>
                    <div><label htmlFor="">{TS.email}</label><input type="text" name="" id="" /></div>
                    <div>
                        <button>{TS.submit}</button>
                        <button>{ac_strings.cancel}</button>
                    </div>
                </div>
            </div>

        </SideNavWrapper >
    )
}

export default React.memo(SideMobile)
