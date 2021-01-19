import * as React from 'react'
import Link from '@/components/CustomLink'
import ac_strings from '@/strings/ac_strings.js'
import { KeyboardArrowRightIcon } from '@/components/Icons/MUI'


interface IButton {
    className?: string
    disabledClassName?: string
    enabledClassName?: string
    onClick?: (e: any) => void
    href?: string
    to?: string
    disabled?: boolean
}

export const Button: React.FC<IButton> = ({ className, disabledClassName, enabledClassName, onClick, href, to, disabled, children }) => {
    if (to) {
        return (
            <Link to={to} className={`block ${className}`} onClick={onClick}>
                {children}
            </Link>
        )
    } else if (onClick) {
        return (
            <button
                className={`cursor-pointer ${className} ${disabled && disabledClassName ? disabledClassName : enabledClassName}`}
                onClick={onClick}
                onKeyDown={onClick}
                disabled={disabled}
            >
                {children}
            </button>
        )
    } else if (href) {
        return (
            <a href={href} className={`block ${className}`}>
                {children}
            </a>
        )
    } else {
        return (
            <div className={className}>
                {children}
            </div>
        )

    }
}

interface IButtonName extends IButton {
    name: string | JSX.Element
}

interface IFormSubmitButton extends IButton {
    loading?: boolean
}

export const OutlineSmallRounded: React.FC<IButton> = ({ children }) => (
    <Button className="font-roboto text-ac-secondary border border-ac-secondary rounded px-2 py-1">{children}</Button>
)

export const OutlineScriptureChapter: React.FC<{ active?: boolean } & IButton> = ({ children, active }) => (
    <Button
        className={` whitespace-no-wrap text-sm border border-ac-gray hover:border-ac-slate-dark rounded-lg py-2 px-2 font-semibold ${active === true ? 'bg-ac-slate-dark text-white' : 'text-ac-slate-dark bg-white'}`}
    >
        {children}
    </Button>
)

export const UnderlineLink: React.FC<{ to: string }> = ({ to, children }) => {
    return <Button to={to} className="text-ac-slate-dark underline text-sm font-semibold">
        {children}
    </Button>
}

export const UnderlineLinkViewAll: React.FC<{ to: string }> = ({ to, children }) => {
    return <Button to={to} className="text-ac-slate-dark underline text-sm">
        {ac_strings.see_all}
    </Button>
}

export const FormSubmitButton: React.FC<IFormSubmitButton> = ({ disabled, onClick, loading }) => {
    const isDisabled = disabled || loading
    return (
        <SolidDarkBgToggleActive
            disabled={isDisabled}
            onClick={onClick}
            className="w-auto px-4 py-2"
            active={!isDisabled}
        >
            {loading ? ac_strings.loading : ac_strings.send}
        </SolidDarkBgToggleActive>
    )
}
export const OutlineButton: React.FC<IButtonName> = ({ name, disabled, onClick }) => {

    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            className="border rounded-full flex justify-between items-center text-base sm:text-lg px-4 py-2"
            disabledClassName="border-ac-gray text-gray-500"
            enabledClassName="border-ac-secondary text-ac-secondary"
        >
            {name}
        </Button>
    )
}


export const OutlineSmallButton: React.FC<IButton> = ({ children, onClick }) => (
    <Button
        className="text-ac-secondary text-xxs uppercase border-ac-secondary border px-2 py-1 rounded-sm mb-4"
        onClick={onClick}
    >
        {children}
    </Button>

)

export interface IOutlineRightIcon extends IButton {
    name: string | JSX.Element
    count?: number | string
    arrow?: boolean
}

export const OutlineRightIcon: React.FC<IOutlineRightIcon> = ({ to, name, count, arrow }) => {
    return (
        <Button
            to={to}
            className={`${count ? 'border-ac-secondary text-ac-secondary' : ''} px-4 py-4  sm:px-6 border rounded-xxl sm:rounded-xl flex justify-between items-center`}
        >
            <div className="text-base sm:text-lg ">
                {name}
            </div>
            <div className="text-xs sm:text:sm">
                {count ? count : ''}
                {arrow && (
                    <KeyboardArrowRightIcon customSize="6" />
                )}
            </div>
        </Button>
    )
}

export const SolidDarkBgToggleActive: React.FC<{ active?: boolean, className?: string } & IButton> = ({ children, active, className, onClick }) => (
    <Button
        className={`flex justify-center py-1 px-2 my-2 text-center text-sm rounded-full font-semibold ${className ? className : ''} ${active === true ? 'bg-ac-slate-dark text-white' : 'bg-ac-slate-lighter text-ac-slate-dark'}`}
        onClick={onClick}
    >
        {children}
    </Button>
)

export const SideNavItem: React.FC<{ hideOnMobile?: boolean, hideOnDeskop?: boolean, next?: boolean } & IButton> = ({ onClick, children, to, hideOnMobile, hideOnDeskop, next, className }) => {
    return (
        <Button
            className={`w-full py-4 font-roboto font-semibold flex justify-center relative ${hideOnDeskop ? ' sm:hidden' : ''} ${hideOnMobile ? ' hidden sm:flex' : ''} ${className ? ` ${className}` : ''}`}
            onClick={onClick}
            to={to}
        >
            <span className="py-1">{children}</span>
            {next && <div className="absolute right-0 pr-4">
                <KeyboardArrowRightIcon customSize="6" />
            </div>}
        </Button>
    )
}

