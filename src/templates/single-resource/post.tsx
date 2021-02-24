import React, { Profiler } from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import TwoToOneImg from "@/components/Images/Image2To1"
import { IMediaTypes } from '@/layouts/PostLayoutUpdate';
import { INavItem, IPostRes, IPostItem, ITopicPostItems } from '@/types'
import { PostH1 } from '@/components/Headers'
import Content from '@/components/Content'

const Post: React.FC<IPostProp> = (props) => {
    const { pageContext, data } = props
    const postRes = data.acNodePost

    const { normalized: post, tranlsatedUrl, mediaTypes, authorsPosts, topicPosts, allInterestedPosts, breadcrumb } = pageContext
    const { title, excerpt, date, topics, types, image } = post
    const { content, meta, seo } = postRes

    const seoTitle = seo && seo.title ? seo.title : title
    return (
        <div>
            <MetaTag
                title={seoTitle}
                type="article"
                meta={{
                    description: seo && seo.desc ? seo.desc : excerpt,
                    date,
                    topics,
                    types,
                    imageUrl: image.src
                }}
                translatedUrls={tranlsatedUrl}
                breadcrumb={breadcrumb}
                path={props.path}
            />
            <PostH1 title={title} />
            <TwoToOneImg image={image} rounded alt={seoTitle} />
            <Content
                content={content}
            />
            {/*             */}


        </div>
    )
}

export default Post

interface IPostProp {
    path: string
    data: {
        acNodePost: IPostRes
    }
    pageContext: {
        breadcrumb: INavItem[]
        normalized: IPostItem
        allInterestedPosts: IPostItem[]
        topicPosts: ITopicPostItems[]
        authorsPosts: ITopicPostItems[]
        tranlsatedUrl: INavItem[]
        mediaTypes: IMediaTypes
        //ITopicPostItems
    }
}

export const pageQuery = graphql`
    fragment PostMain on ac_node_post {
                id:acId
                title
                slug

                excerpt
                image {
                    src
                    srcset
                    dataUri
                    colors

                }
                readtime
                track {
                    url
                    title
                    duration
                    post {
                        title
                        slug
                        }
                    playlists {
                    slug
                    title
                    }
                    }
                    
                authors {
                    name
                    slug
                    id
                    pivot {
                        as
                    }
                }
                topics {
                    name
                    slug
                    id
                    group {
                        id
                        name
                        slug
                    }
                }
                published
                likes
                views
                seo {
                    desc
                    title
                 }
                 meta {
                    credits
                    url
                }

    }

    query PostById($id: String!) {
        acNodePost(id: { eq: $id }) {
                content
                glossary {
                    slug
                    id
                    content
                    word
                }

            }
    }
`