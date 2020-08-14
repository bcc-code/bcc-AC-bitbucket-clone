// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/></svg>
import * as React from 'react';
import { IIconProps } from '@/types'

const ArrowRightAlt: React.FC<IIconProps> = ({ customSize, className }) => {
    const size = customSize ? `${customSize}` : "24"
    return (
        <svg
            className={`stroke-current ${className ? className : 'w-6 h-6'}`}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"

        >
            {/* <path fill="none" d="M0 0h24v24H0z" /> */}
            <path className={className} fill="none" d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
        </svg>

    )
}

export default ArrowRightAlt