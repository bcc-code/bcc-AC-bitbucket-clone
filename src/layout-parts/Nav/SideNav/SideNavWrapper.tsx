import * as React from 'react';
import { KeyboardArrowLeftIcon, CloseIcon } from '@/components/Icons/MUI/arrowIcons'


export interface ISideMobile {
    testName?: string
    isSideNavOpen: boolean
    back?: () => void
    close?: () => void,
    title?: string
    children: React.ReactNode
    className?: string
}
const SideMobile: React.FC<ISideMobile> = ({ isSideNavOpen, close, back, title, children, className, testName }) => {
    return (
        <div
            style={{ zIndex: 700 }}
            className={`drawer-side ${testName}-drawer ${isSideNavOpen ? 'drawer-side-open' : 'drawer-side-close'} drawer-side-submenu bg-ac-slate-lighter w-full h-full flex flex-col justify-between xs:w-mobile xs:left-auto xs:shadow overflow-y-scroll fixed top-0 right-0 bottom-0 `}
        >
            <div className="min-h-12 h-12 w-full border-b border-d4slate-light p-4">
                {back && (
                    <button className={`absolute left-0 top-0 p-3 ${testName}-back`} onClick={back} onKeyDown={back}>
                        <KeyboardArrowLeftIcon customSize="6" className="fill-slate-dark" />
                    </button>
                )}
                {title && <div className="flex justify-center w-full font-roboto font-semibold">{title}</div>}
                {close && <div className={`cursor-pointer absolute right-0 top-0 p-3 ${testName}-close`} onClick={close} onKeyDown={close}>
                    <CloseIcon customSize="6" className="fill-slate-light" />
                </div>}
            </div>
            <div className={`flex-1 ${testName}-container ${className ? className : ''}`}>
                {children}
            </div>
        </div >
    )
}

export default React.memo(SideMobile)
