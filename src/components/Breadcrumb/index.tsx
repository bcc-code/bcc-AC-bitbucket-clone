import React from 'react';
import Link from '@/components/CustomLink';
import { IBreadcrumb } from '@/types';
import { HomeIcon } from '@/components/Icons/MUI/navIcons'
// https://developers.google.com/search/docs/data-types/breadcrumb

import './breadcrumb.css'

const Breadcrumb: React.FC<IBreadcrumb> = ({ items }) => {
    const breadcrumb = items.length > 0 ? [
        {
            name: <HomeIcon customSize="5" />,
            to: '/'
        },
        ...items
    ] : items
    return (
        <ol className="flex pt-2 pb-2 text-sm text-gray-500">
            {breadcrumb.map((item, i) => {
                if (item) {
                    return (
                        <li key={i} className="breadcrumb-item flex justify-center items-center" >
                            <Link className="sm:hidden" to={`/${item.to}`}>
                                {typeof item.name === "string" ? `${item.name.slice(0, 15)}${item.name.length > 15 ? '...' : ''}` : item.name}
                            </Link>
                            <Link className="hidden sm:block" to={`/${item.to}`}>
                                {item.name}
                            </Link>
                        </li>
                    )
                } else {
                    return null
                }

            })}
        </ol>
    )
}

export default React.memo(Breadcrumb);

