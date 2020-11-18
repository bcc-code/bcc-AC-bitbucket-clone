import React from "react"
import loadable from '@loadable/component'

import ByCatergories from '@/layout-parts/RecommendLayout/ByCategoriesMobile'
import { UnderlineLinkViewAll } from '@/components/Button'

import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'

import LazyLoad from '@/components/LazyLoad';
import MetaTag from '@/components/Meta'
import { PageSectionHeader } from '@/components/Headers'
import RightImg from '@/components/PostItemCards/RightImg'
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'

const HSCardList = loadable(() => import('@/layout-parts/HorizontalScroll/HSCardList'))
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendDesktopLayout'))

import { INavItemCount, ISubtopicLinks, IRecommendationPage } from '@/types'
import { IRootState } from '@/state/types'

import ac_strings from '@/strings/ac_strings.js'
import { useSelector } from "react-redux";
import { getRandomArray, processRecommendationContext, getRandomFeatured } from "@/helpers"

const Read: React.FC<IProps> = (props) => {
    const { loggedIn } = useSelector((state: IRootState) => state.auth)
    const { pageContext, path } = props
    const { title, info, items, popularPosts, featuredPosts, latestPosts } = pageContext

    const latestSlug = `${path}/${ac_strings.slug_latest}`

    const { latest, popular, featured } = processRecommendationContext({ popularPosts, featuredPosts, latestPosts })
    const featuredMixed = getRandomFeatured({ latest, popular, featured })
    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]}
                type="page"
                breadcrumb={[]}
                path={path}
            />

            <div className="sm:hidden">


                <div style={{ backgroundImage: 'linear-gradient(#fff,#EDF1FA)' }}>

                    <div className="w-full py-6">
                        <PageSectionHeader title={ac_strings.featured} className="pb-4" />
                        <HSCardList posts={featuredMixed} />
                    </div>
                </div>
                <LazyLoad>
                    <FetchTopicPostItems
                        topics={items.map(f => ({ name: f.name, slug: `${f.to}`, id: '' }))}
                        layout="list"
                        render={({ topicPostItems }) => {
                            return (
                                <ScrollNavTabs tabs={topicPostItems.map(item => ({
                                    name: item.name,
                                    to: item.slug,
                                    content: (
                                        <div>
                                            {getRandomArray(item.posts, 3).map(p => {
                                                return (
                                                    <RightImg {...p} />
                                                )
                                            })}
                                            <div className="w-full flex justify-center py-6">
                                                <UnderlineLinkViewAll to={`${item.slug}`} />
                                            </div>
                                        </div>
                                    )
                                }))} />
                            )
                        }}

                    />
                </LazyLoad>
                <LazyLoad>
                    {loggedIn !== "success" ? (
                        <>
                            <div className="bg-d4slate-lighter py-6 overflow-hidden">
                                <PageSectionHeader title={ac_strings.popular} className="pb-4" />
                                <HSCardList posts={popular} />
                            </div>
                            <div className="py-6">
                                <PageSectionHeader title={ac_strings.latest} />
                                <div className="px-4 ">
                                    {latest.slice(0, 3).map(p => {
                                        return (
                                            <RightImg {...p} />
                                        )
                                    })}
                                </div>
                                <div className="w-full flex justify-center py-6">
                                    <UnderlineLinkViewAll to={`${latestSlug}`} />
                                </div>
                            </div>
                        </>
                    ) : (
                            <>
                                <div className="bg-d4slate-lighter py-6 overflow-hidden">

                                    <div className="w-full flex justify-between items-center py-6 pr-4">
                                        <PageSectionHeader title={ac_strings.latest} />
                                        <UnderlineLinkViewAll to={`${latestSlug}`} />
                                    </div>
                                    <HSCardList posts={latest} />

                                </div>
                                <div className=' py-6'>
                                    <PageSectionHeader title={ac_strings.popular} />
                                    <div className="px-4">

                                        {popular.slice(0, 3).map(p => {
                                            return (
                                                <RightImg {...p} />
                                            )
                                        })}
                                    </div>
                                </div>

                            </>
                        )}

                    <ByCatergories
                        title={`${ac_strings.read} ${ac_strings.byCategories}`}
                        types={items}
                    />
                </LazyLoad>
            </div>
            <RecommendDesktopLayout
                latestSlug={latestSlug}
                latestPosts={latest}
                popularPosts={popular}
                featured={featuredMixed}
                topics={items}
                name={title}
            />

        </div>
    )
}

export default Read

interface IPageContext extends IRecommendationPage {
    info: INavItemCount
    items: ISubtopicLinks[]
    menu: INavItemCount[]
}
interface IProps {
    pageContext: IPageContext
    path: string
}
