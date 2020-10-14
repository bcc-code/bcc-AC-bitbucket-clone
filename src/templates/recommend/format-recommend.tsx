import * as React from 'react';
import loadable from '@loadable/component'
import MetaTag from '@/components/Meta'
import TopImgPost from '@/components/PostItemCards/TopImg'


import RightImg from '@/components/PostItemCards/RightImg'
import HeaderSection from '@/layout-parts/RecommendLayout/HeaderSection'
import Post4Col from '@/layout-parts/List/PostRow4Col'
import { SectionTitleDesktopAndMobile, PageSectionHeader, LayoutH1Wide, } from '@/components/Headers'
import HSCardListVideo from '@/layout-parts/HorizontalScroll/HSCardListVideo'
const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
import { FetchPostsFromSlugs, FetchPostsFromArchivePage } from '@/HOC/FetchPosts'
import { INavItem, ITopicRes, INavItemCount, ISubtopicLinks } from '@/types'
import ac_strings from '@/strings/ac_strings.json'
import TS from '@/strings'
import { getRandomArray } from '@/helpers'
const Format: React.FC<IProps> = ({ path, pageContext }) => {
    const { formatType, breadcrumb, mostPopular } = pageContext
    const { info, items } = formatType

    const latestSlug = `${info.to}/${ac_strings.slug_latest}`
    const watch: ISubtopicLinks[] = []
    const listen: ISubtopicLinks[] = []
    const read: ISubtopicLinks[] = []
    items.map(p => {
        if (p.key === "watch") {
            watch.push(p)
        } else if (p.key === "listen") {
            listen.push(p)
        } else {
            read.push(p)
        }
    })
    return (
        <div>
            <MetaTag title={info.name} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <LayoutH1Wide title={info.name} />
            {formatType.info.count < 21 ? (
                <FetchPostsFromArchivePage
                    slug={latestSlug}
                    layout="row" render={({ posts }) => {
                        return (
                            <div className="standard-max-w-px grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-6 pb-6">
                                { posts.map(p => {
                                    return (
                                        <TopImgPost {...p} key={p.slug} />
                                    )
                                })}
                            </div>
                        )
                    }}
                />


            ) : (
                    <div className="sm:px-4 standard-max-w">
                        <FetchPostsFromSlugs
                            slugs={mostPopular}
                            layout="list"
                            render={({ posts }) => {
                                const randomHeaderPost = getRandomArray(posts.slice(5), 1)
                                return randomHeaderPost[0] ? <HeaderSection headerPost={randomHeaderPost[0]} listPosts={posts.slice(0, 5)} /> : <div></div>
                            }}
                        />

                        <div className="w-full pb-4 pt-8 sm:hidden">
                            <PageSectionHeader title={ac_strings.featured} className="pb-4" />
                            <FetchPostsFromSlugs
                                slugs={mostPopular.slice(5)}
                                layout="row"
                                render={({ posts }) => {
                                    return <FeaturedBanner featured={posts} />
                                }}
                            />
                        </div>
                        <FetchPostsFromSlugs
                            slugs={mostPopular}
                            layout="row"
                            render={({ posts }) => {
                                return (<TopImgHorizontalScroll posts={posts} />)
                            }}
                        />
                        {watch[0] && (
                            <FetchPostsFromArchivePage
                                slug={`${watch[0].to}/${info.to}`}
                                layout="row"
                                render={({ posts }) => {
                                    return (
                                        <div className="py-6">
                                            <SectionTitleDesktopAndMobile name={watch[0].name} />
                                            <HSCardListVideo posts={posts} />
                                        </div>
                                    )
                                }}

                            />
                        )}
                        <SectionTitleDesktopAndMobile name={TS.latest} />
                        {listen[0] && (
                            <FetchPostsFromArchivePage

                                slug={`${listen[0].to}/${info.to}`}
                                layout="row"
                                render={({ posts }) => {
                                    return (
                                        <div>
                                            <div className="sm:hidden px-4">
                                                {posts.slice(0, 4).map(item => (
                                                    <RightImg {...item} />
                                                ))}
                                            </div>
                                            <div className="hidden sm:block">
                                                <Post4Col posts={posts.slice(0, 4)} />
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        )}
                        {read[0] && (
                            < FetchPostsFromArchivePage

                                slug={`${read[0].to}/${info.to}`}
                                layout="row"
                                render={({ posts }) => {
                                    return (
                                        <div>
                                            <div className="sm:hidden px-4">
                                                {posts.slice(0, 4).map(item => (
                                                    <RightImg {...item} />
                                                ))}
                                            </div>
                                            <div className="hidden sm:block">
                                                <Post4Col posts={posts.slice(0, 4)} />
                                            </div>
                                        </div>
                                    )
                                }}
                            />
                        )}

                        <div className="bg-d4slate-lighter sm:hidden py-6 overflow-hidden">
                            <PageSectionHeader title={ac_strings.popular} className="pb-4" />
                            <FetchPostsFromSlugs
                                slugs={mostPopular.slice(0, 5)}
                                layout="row"
                                render={({ posts }) => {
                                    return (<TopImgHorizontalScroll posts={posts} />)
                                }}
                            />
                        </div>
                    </div>
                )}
        </div>
    )

}

export default Format


interface IProps {
    path: string
    pageContext: {
        id: string
        node: ITopicRes
        title: string
        breadcrumb: INavItem[]
        formatType: {
            info: INavItemCount
            items: ISubtopicLinks[]

        }
        mostPopular: string[]
    }

}