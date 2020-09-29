import * as React from "react"
import { useSelector } from 'react-redux'
import { fetchLocalPostsFromSlugs, fetchTopicFromSlug } from '@/helpers/fetchLocalData'
import { IRootState } from '@/state/types'
import { ITopicNavItem } from '@/types'
import { OutlineRightIcon } from "@/components/Button"

const UserHistory = () => {

    const [followedTopic, setFollowedTopics] = React.useState<ITopicNavItem[]>([])
    const userLibrary = useSelector((state: IRootState) => state.userLibrary);

    React.useEffect(() => {
        Promise.all(userLibrary.followedTopics.map(item => fetchTopicFromSlug(item.slug)))
            .then(res => {
                const topics: ITopicNavItem[] = []
                res.forEach(item => {
                    if (item) {
                        topics.push(item)
                    }
                })
                setFollowedTopics(topics)
            })


    }, [userLibrary.followedTopics])

    return (
        <div className="grid-1-2col mx-4 mt-4 sm:mt-12 mb-4">
            {followedTopic.map(({ name, to }) => {
                return (
                    <OutlineRightIcon name={name} to={to} key={to} />
                )
            })}
        </div>


    )
}

export default UserHistory