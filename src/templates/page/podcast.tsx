import React from "react"
import { graphql } from "gatsby"

// Components

import { UnderlineLinkViewAll } from '@/components/Button'
import Link from '@/components/CustomLink'
import MetaTag from '@/components/Meta'

import { SectionTitleDesktopAndMobile, TitleWithIcon } from '@/components/Headers'
import { SubscribePodcast } from "@/components/Podcast/PodcastPlatforms"
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import TopImg from '@/components/PostItemCards/TopImg'
import RightImg from '@/components/PostItemCards/RightImg'
// helpers
import { PodcastPageHeadSection } from './podcast-intro'
import livingTheGospel from '@/strings/static/podcastProperties'

import { INavItem } from '@/types'

import ac_strings from '@/strings/ac_strings.js'
// mock data
import '@/styles/react-tabs.css'


const Listen: React.FC<IListenPageProps> = (props) => {
    const { data, pageContext } = props
    const { posts } = data.ac.topics[0]
    const postSlugList = posts.map(p => p.slug)
    const { breadcrumb } = pageContext
    const path = pageContext.pagePath
    return (
        <div className="max-w-sm mx-auto">
            <MetaTag title={ac_strings.podcast} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <PodcastPageHeadSection>
                <h1 className="p-4 font-semibold text-3xl relative z-10">{livingTheGospel.title}</h1>
                <div className="flex">
                    <div className="p-4">

                        <Link
                            className="inline-block bg-white rounded-full text-ac-slate-dark px-4 py-2 font-semibold mb-4"
                            to={ac_strings.slug_podcast_intro}
                        >
                            {ac_strings.learn_more}
                        </Link>
                        <SubscribePodcast />
                    </div>
                </div>

            </PodcastPageHeadSection>
            <FetchPostsFromSlugs

                slugs={postSlugList.slice(0, 12)}
                layout="list"
                render={({ posts }) => {
                    const first = posts[0]
                    const latest = posts.slice(1)
                    return (
                        <div className="">
                            <div className="">
                                <SectionTitleDesktopAndMobile
                                    name={ac_strings.latest}

                                />
                                {first && (
                                    <div className="px-4 py-6 sm:hidden">
                                        <TopImg
                                            {...first}
                                        />
                                    </div>
                                )}

                                <div className="px-4">
                                    {first && (
                                        <div className="hidden sm:block">
                                            <RightImg  {...first} />
                                        </div>
                                    )}
                                    {latest.map(p => {
                                        return (
                                            <RightImg  {...p} key={p.slug} />
                                        )
                                    })}
                                </div>
                                <div className="flex justify-center py-4">

                                    <UnderlineLinkViewAll

                                        to={`${path}/${ac_strings.slug_latest}`}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }}
            />
        </div>
    )
}

export default Listen


export const pageQuery = graphql`
    query AllPodcast($id: [ID!])  {
        ac {
            topics(ids:$id) {
                    posts {
                    slug
                    }
            }
        }
    }
`

interface IListenPageProps {
    data: {
        ac: {
            topics: {
                posts: {
                    slug: string
                }[]
            }[]
        }
    }
    pageContext: {
        pagePath: string
        breadcrumb: INavItem[]
        hosts: string[]
    }
    path: string
}