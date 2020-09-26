import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openSignInModal } from '@/state/action'
import { IRootState } from '@/state/types'
import { setNewFollowTopic } from '@/state/action/userAction'

type followStatus = "loading" | "true" | "false"
interface IFetchPost {
    id: string,
    className?: string
    render: (data: { followed: followStatus }) => JSX.Element
}

const FollowTopic: React.FC<IFetchPost> = ({ id, className, render }) => {
    const { followedTopics, auth } = useSelector((state: IRootState) => ({ followedTopics: state.userLibrary.followedTopics, auth: state.auth }))
    const [followed, setFollowed] = React.useState<followStatus>("loading")
    const dispatch = useDispatch()

    React.useEffect(() => {
        console.log('render following')
        const found = followedTopics.findIndex(p => p.id === id)
        const followed = found > -1
        setFollowed(followed ? "true" : "false")
    }, [id, followedTopics])

    const handleClick = () => {
        if (auth.loggedIn === "success") {
            if (followed !== "loading") {
                setFollowed("loading")
                dispatch(setNewFollowTopic({ id, followed: followed === "true" }))
            }
        } else {
            dispatch(openSignInModal("signInOptions"))
        }
    }

    return (
        <div
            className={className ? className : ''}
            onClick={handleClick}
            onKeyDown={handleClick}
        >
            {render({ followed })}
        </div>
    )
}

export default FollowTopic