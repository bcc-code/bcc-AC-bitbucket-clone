import React from "react"
import { IPostItem, INavItem } from "@/types"
import { UnderlineTitleLink } from '@/components/Headers'
import FeaturedCard from '@/components/PostItem/FeaturedCard'
import LeftImg from '@/components/PostItemCards/LeftImg'
import TopImg from '@/components/PostItemCards/TopImg'
export interface IOnePostByType {
    type: INavItem,
    post: IPostItem,
    postThumnailType?: 'featuredCard' | 'leftImage' | 'topImage'
    position: '1' | '2' | '3' | '4' | '1-wide' | '2-wide',
    postThumbnailProps?: any
}
interface IPostByTypeList {
    types: IOnePostByType[]
}

const OnePostByType: React.FC<IOnePostByType> = ({ type, post, postThumnailType, position, postThumbnailProps }) => {

    const getPostThumnail = () => {
        switch (postThumnailType) {
            case "featuredCard": {
                let props: any = {
                    ...post
                }
                if (postThumbnailProps) {
                    props = { ...props, ...postThumbnailProps }
                }
                return <FeaturedCard {...props} />
            }
            case "leftImage": {
                return <LeftImg {...post} />
            }

            default: {
                return <TopImg showType {...post} />
            }
        }
    }

    const postItem = getPostThumnail()
    return (
        <div className={`div${position}`}>
            <UnderlineTitleLink name={type.name} to={`${type.to}`} />
            <div className={`div-content ${postThumnailType === "leftImage" ? 'hidden sm:block' : ''}`}>
                {postItem}
            </div>
        </div>
    )
}

const PostsByTypes: React.FC<IPostByTypeList> = ({ types }) => {
    return (
        <div className="hidden sm:grid grid-4col grid-h80 mt-12">
            {types.map((item, i) => {

                return (
                    <OnePostByType {...item} key={i} />
                )
            })}
        </div>
    )
}

export default PostsByTypes