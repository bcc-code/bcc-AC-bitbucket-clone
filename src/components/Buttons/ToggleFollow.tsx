import * as React from 'react';
import Link from '@/components/CustomLink'

import { PostExcerpt } from '@/components/PostItem/PostItemParts'
import { useDispatch } from 'react-redux'
import { setNewFollowTopic, setNewFollowTag } from '@/state/action/userAction'

import TS from '@/strings'
import ac_strings from '@/strings/ac_strings.json'

interface IProps {
    wrapperClassName?: string
    topicClassName?: string
    buttonClassName?: string
    id: string
    name: string
    to: string
    followed?: boolean
    size?: number | string
    className?: string
}

const FollowButton: React.SFC<IProps> = ({ followed, topicClassName, buttonClassName, id, to, name }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(setNewFollowTopic({ id, followed: followed === true }))

    }
    return (
        <div className="flex flex-col mr-1">
            <div className="text-sm text-d4gray-dark">{ac_strings.topic}</div>
            <Link className={topicClassName ? topicClassName : "uppercase"} to={`/${TS.slug_topic}/${to}`}>
                <PostExcerpt
                    rawText={name}
                    clamp={1}
                    fontKey='top-img break-normal'
                />
            </Link>
            <div>
                <button
                    className={buttonClassName ? buttonClassName : "m-2 px-1 rounded-sm font-semibold text-d4gray-dark text-mini border border-d4gray"}
                    onClick={handleClick}
                >
                    {followed === true ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    )
}

export default FollowButton