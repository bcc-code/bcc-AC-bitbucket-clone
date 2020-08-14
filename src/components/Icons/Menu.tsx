import * as React from "react"
import { IIconProps } from "@/types"

const MenuIcon: React.FC<IIconProps> = ({ className }) => (
    <svg
        className={`${className ? className : 'w-6 h-6'} fill-current hover:fill-current`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24">
        {/* <path d="M0 0h24v24H0z" fill="none" /> */}
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
)

export default MenuIcon