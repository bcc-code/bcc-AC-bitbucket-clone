import * as React from "react"
import { useSelector } from 'react-redux'
import { LayoutH1, PageSectionHeader, SectionTitleDesktopAndMobile } from '@/components/Headers'
import { IPostItem, ITopicNavItem } from '@/types'
import { IRootState } from '@/state/types'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import { FetchTopics } from '@/HOC/FetchTopicFormatType'
import PostItem from '@/components/PostItemCards/RightImg'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'
import XScrollCustomSize from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard'
import QPopularAndFeaturedPosts from '@/HOC/QPopularAndFeaturedTopics'
import TopicRowAndHorizontalScroll from '@/layout-parts/List/Combo/TopicRowAndHorizontalScroll'
import { SlateDarkUnfollowButton } from '@/components/PostElements/TopicToggleFollow'
import FeaturedTopics from '@/layout-parts/HorizontalScroll/FeaturedTopics.tsx'
import TS from '@/strings'
import { getRandomArray } from '@/helpers'
import ac_strings from '@/strings/ac_strings.js'
import shortid from 'shortid'
const UserHistory = () => {

    const { followedTopics, bookmarkedPosts, followedPlaylists } = useSelector((state: IRootState) => state.userLibrary);
    return (
        <div className="flex flex-col ">

            <div className="py-6">
                {followedTopics.length > 0 ? (
                    <FetchTopics
                        topics={followedTopics.map(p => p.slug)}
                        layout="row"
                        render={({ topics }) => {
                            return (
                                <>
                                    <SectionTitleDesktopAndMobile name={"Following Topics"} />

                                    <div className="hidden sm:grid grid-cols-6 gap-4 px-4">
                                        {topics.map(({ name, slug: to }) => {
                                            return (
                                                <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} key={shortid()} />
                                            )
                                        })}
                                    </div>
                                    <XScrollCustomSize
                                        childeClassName=""
                                        items={topics.map(({ name, slug: to, id }) => {
                                            return (
                                                <div className="flex flex-col items-center">
                                                    <div className="w-18" >
                                                        <div className="h-24 min-h-24">
                                                            <ImgBgTopicCard name={name} to={`${TS.slug_topic}/${to}`} />
                                                        </div>
                                                        <SlateDarkUnfollowButton
                                                            id={id}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    />
                                </>
                            )
                        }}
                    />
                ) : (
                        <div>
                            <SectionTitleDesktopAndMobile name={"No follow topics found. You might be interested in..."} />
                            <QPopularAndFeaturedPosts
                                render={({ topics }) => {
                                    const randomTopics = getRandomArray(topics, 6)
                                    return (
                                        <FeaturedTopics
                                            featured={randomTopics}
                                        />
                                    )
                                }}

                            />
                        </div>
                    )}
            </div>
            {followedPlaylists.length > 0 && (
                <div>{followedPlaylists.map(p => p.name)}</div>
            )}
            {bookmarkedPosts.length > 0 ? <FetchPostsFromSlugs
                slugs={bookmarkedPosts.map(p => p.slug)}
                layout="list"
                render={({ posts }) => {
                    const video: IPostItem[] = []
                    const other: IPostItem[] = []
                    posts.map(p => {
                        if (p.media.video) {
                            video.push(p)
                        } else {
                            other.push(p)
                        }
                    })
                    return (
                        <div>
                            {video.length > 0 && (
                                <div className="py-6">
                                    <SectionTitleDesktopAndMobile name={"Saved Videos"} />
                                    <HSCardListVideo posts={video} />
                                </div>
                            )}
                            {other.length > 0 && (
                                <div className="py-6">

                                    <SectionTitleDesktopAndMobile name={"Bookmarked"} />
                                    <div className="px-4">
                                        {other.map((item, i) => (
                                            <PostItem {...item} key={i} />
                                        ))}
                                    </div>
                                </div>
                            )}


                        </div>
                    )
                }}

            /> : (
                    <div className="py-6">
                        <PageSectionHeader title="No bookmark posts found" />
                    </div>
                )}



        </div>
    )
}

export default UserHistory