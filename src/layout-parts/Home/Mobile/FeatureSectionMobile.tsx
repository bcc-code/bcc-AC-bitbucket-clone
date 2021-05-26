import React from 'react'
import shortid from 'shortid'
import RightImg from '@/components/PostItemCards/RightImg'
import { getRandomArray } from '@/helpers/normalizers'
import { ITopicPostItems, IPostItem } from '@/types'
import MotionStagger from '@/components/Motion/StaggerChildren'
const FeatureSection: React.FC<{ topicPosts: ITopicPostItems[] }> = ({ topicPosts }) => {

    let postSlugs: IPostItem[] = []
    topicPosts.map(t => {
        postSlugs.push(...t.posts)
    })
    const posts = getRandomArray(postSlugs, 3)
    React.useEffect(() => {

    }, [])
    return (

        <MotionStagger
            className="px-4"
        >
            {posts.map(item => {
                return (
                    <RightImg {...item} key={shortid()} />
                )
            })}
        </MotionStagger>


    )
}

export default FeatureSection