import * as React from 'react';
import FetchAndSetFollowed from '@/HOC/FetchAndSetFollowed'
import Icon from "@/components/Icons/Icon"
import Link from '@/components/CustomLink'
import { ITopicNavItem } from '@/types'
import { OutlineSmallRounded } from '@/components/Button'
import ac_strings from '@/strings/ac_strings.json'

export const toggleFollowStatusMap = {
    "loading": {
        color: 'bg-slate-lighter text-d4slate-dark',
        icon: <Icon name="Cached" size="3" />,
        text: ac_strings.loading
    },
    "true": {
        color: 'bg-slate-lighter text-d4slate-dark',
        icon: <Icon name="Check" size="3" />,
        text: ac_strings.following
    },
    "false": {
        color: 'bg-d4slate-dark text-white',
        icon: <Icon name="Add" size="3" />,
        text: ac_strings.follow
    },
}

interface IToggleFollowProps {
    id: string
    text?: string
}

export const ToggleBookmarkIconOnly: React.FC<IToggleFollowProps> = ({ id }) => {

    return (
        <FetchAndSetFollowed
            id={id}
            className="p-2"
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]
                return (
                    <button>
                        {config.icon}
                    </button>
                )
            }}
        />

    )
}


export const ToggleFollowOutlineBtn: React.FC<IToggleFollowProps> = ({ id }) => {

    return (
        <FetchAndSetFollowed
            id={id}
            className=""
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]
                return (
                    <OutlineSmallRounded>
                        <div className="flex">
                            <span className="">{config.text}</span>
                            <span className="pl-2 flex items-center">
                                {config.icon}
                            </span>
                        </div>
                    </OutlineSmallRounded>
                )
            }}
        />

    )
}

export const SlateDarkFollowButton: React.FC<IToggleFollowProps> = ({ id, text }) => {

    return (
        <FetchAndSetFollowed
            id={id}
            className="w-full"
            render={({ followed }) => {
                const config = toggleFollowStatusMap[followed]

                return (
                    <div className={`flex justify-center py-1 px-2 my-2 w-full text-center text-xs rounded-full font-semibold ${config.color}`}>
                        <span>{text ? text : config.text}</span>
                        <span className="pl-2 flex items-center">
                            {config.icon}
                        </span>
                    </div>

                )
            }}
        />

    )
}

export const ToggleFollowWithName: React.FC<ITopicNavItem> = ({ id, name, to }) => {

    return (


        <div className={`flex py-1 px-3 pr-0 mb-2 mr-2 text-center text-xs rounded-full font-semibold items-center bg-gray-300`}>
            <Link to={to} className="">{name}</Link>
            <FetchAndSetFollowed
                id={id}
                className=""
                render={({ followed }) => {
                    const config = toggleFollowStatusMap[followed]
                    return (<span className="px-2">
                        {config.icon}
                    </span>)
                }}
            />
        </div>



    )
}


export const TopicWithIcon: React.FC<ITopicNavItem> = ({ name, to }) => {

    return (
        <Link to={`${to}`} className="border border-d4slate-light rounded-lg px-1 flex items-center mr-2 mb-2 py-1">
            <Icon
                size="2"
                color="slate-light"
                name="LocalOffer"
            />
            <span className="px-1 text-d4slate-light" style={{ fontSize: "12px" }}>{name}</span>

        </Link>
    )
}

