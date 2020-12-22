import React from 'react'
import loadable from '@loadable/component'
import ByCatergories from '@/layout-parts/RecommendLayout/ByCategoriesMobile'
import MetaTag from '@/components/Meta'
import LazyLoad from '@/components/LazyLoad';
import { FetchTopicPostItems } from '@/HOC/FetchTopicFormatType'
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'

const FeaturedBanner = loadable(() => import('@/layout-parts/HorizontalScroll/FeaturedBanner'))
const TopImgHorizontalScroll = loadable(() => import('@/layout-parts/HorizontalScroll/TopImgRow'))
const RecommendDesktopLayout = loadable(() => import('@/layouts/RecommendDesktopLayout'))
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'
import RightImgPostItem from '@/components/PostItemCards/RightImg'
import { LayoutH1Wide, PageSectionHeader } from '@/components/Headers'

import { UnderlineLinkViewAll } from '@/components/Button'

import { IPostItem, ISubtopicLinks, IRecommendationPage } from '@/types'
import { processRecommendationContext, getRandomFeatured } from '@/helpers'
// Types 
import ac_strings from '@/strings/ac_strings.js'

const TaxonomyPage: React.FC<ITaxonomyPageProps> = (props) => {

    const { pageContext, path } = props

    const {
        id,
        title,
        formats,
        breadcrumb,
        popularPosts,
        latestPosts,
        featuredPosts
    } = pageContext

    const latestSlug = `${path}/1`

    const { latest, popular, featured } = processRecommendationContext({ popularPosts, featuredPosts, latestPosts })
    const [mixedFeaturedPosts, setMixedFeaturedPosts] = React.useState<IPostItem[]>([])
    React.useEffect(() => {

        const mixed = getRandomFeatured({ latest, popular, featured })
        setMixedFeaturedPosts(mixed)
    }, [])

    const topicSlug = ac_strings.slug_topic
    return (
        <div>
            <MetaTag
                title={title}
                translatedUrls={[]} type="page"
                breadcrumb={breadcrumb}
                path={path}
            />

            <div className="sm:hidden">
                <LayoutH1Wide
                    title={title}
                />
                <div className="px-4">
                    <ToggleFollowOutlineBtn id={id} />
                </div>
                <div className="w-full pb-4 pt-8">
                    <PageSectionHeader title={ac_strings.featured} className="pb-4" />
                    <FeaturedBanner featured={mixedFeaturedPosts} />
                </div>
                <div className="bg-ac-slate-lighter sm:bg-transparent py-6 overflow-hidden">
                    <PageSectionHeader title={ac_strings.popular} className="pb-4" />
                    <TopImgHorizontalScroll posts={popular.slice(5)} />
                </div>

                <FetchTopicPostItems
                    topics={formats.map(f => ({ name: f.name, slug: `${topicSlug}/${f.to}`, id: '' }))}
                    layout="list"
                    render={({ topicPostItems }) => (
                        <ScrollNavTabs tabs={topicPostItems.map(item => ({
                            name: item.name,
                            to: item.slug,
                            content: (
                                <div>
                                    {item.posts.slice(0, 6).map(p => {
                                        return (
                                            <RightImgPostItem {...p} />
                                        )
                                    })}
                                    <div className="w-full flex justify-center py-6">
                                        <UnderlineLinkViewAll to={`${item.slug}`} />
                                    </div>
                                </div>
                            )
                        }))} />
                    )}

                />
                <ByCatergories
                    title={ac_strings.byCategories}
                    types={formats.map(f => ({ name: f.name, to: `${topicSlug}/${f.to}`, id: '' }))}
                />
            </div>
            <RecommendDesktopLayout
                topicId={id}
                latestSlug={latestSlug}
                popularPosts={popular}
                latestPosts={latest}
                featured={mixedFeaturedPosts}
                topics={formats.map(f => ({ ...f, to: `${topicSlug}/${f.to}` }))}
                name={title}
            />

        </div>
    )

}

export default TaxonomyPage

interface IPageContext extends IRecommendationPage {
    types: ISubtopicLinks[]
    formats: ISubtopicLinks[]

    id: string
}

interface ITaxonomyPageProps {
    pageContext: IPageContext
    path: string
}

