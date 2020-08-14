import * as React from 'react'
import { IIconProps } from '@/types'
const SearchIconThin: React.FC<IIconProps> = ({ className }) => (
    <svg
        className={className ? className : ''}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="6.66675" cy="6" r="5.5" stroke="#384156" />
        <path d="M10 10.6667L14.6667 15.3333" stroke="#384156" strokeLinecap="round" />
    </svg>
)

export default SearchIconThin