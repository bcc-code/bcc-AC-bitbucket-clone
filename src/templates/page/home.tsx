import React, { Profiler } from 'react'
import LazyLoad from '@/components/LazyLoad';
import loadable from '@loadable/component'
import FeaturedBanner from '@/components/HorizontalScroll/FeaturedBanner'
import { TopImgRowHorizontalScroll } from '@/components/HorizontalScroll'
import LatestSectionHeader from '@/layout-parts/LatestSectionHeader'
import LatestSection from '@/components/List/PostRow4Col'
import FeatureSectionMobile from '@/layout-parts/Home/Mobile/FeatureSectionMobile'
import FeaturedTopics from '@/components/HorizontalScroll/FeaturedTopics'
import BgImgTopicCard from '@/components/Cards/BgImgTopicCard'
import HomeTopFeaturePost from '@/layout-parts/Home/HeaderPost'
import { PageSectionHeader } from '@/components/Headers'
import MetaTag from '@/components/Meta'
import shortid from 'shortid'
import { processRecommendationContext, getRandomFeatured } from '@/helpers'
import TopImgPost from '@/components/PostItemCards/TopImg'
// Type
import { IPostItem, IPostRes, ITopicPostItems } from '@/types'
import '@/components/HorizontalScroll/horizontal-scroll.css';
// Helpers
import ac_strings from '@/strings/ac_strings.js'

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  console.log(id)
  console.log(actualDuration)
  // Aggregate or log render timings...
}

const HomeContent: React.FC<{
  mixed: IPostItem[]
  latest: IPostItem[]
  popular: IPostItem[]
  popularTopicsAll: {
    static: ITopicPostItems[]
    dynamic: ITopicPostItems[]
  }
}> = (props) => {


  const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" && window.innerWidth < 640)

  React.useEffect(() => {
    setIsMobile(typeof window !== "undefined" && window.innerWidth < 640)
  }, [])

  if (isMobile) {
    return (
      <div className="sm:hidden">
      </div>
    )
  } else {

    const DesktopHome = loadable(() => import("@/layout-parts/Home/Desktop"));
    return (
      <DesktopHome {...props} />
    );
  };
}
const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props

  const latestPostAsTopic = {
    id: '',
    name: ac_strings.latest,
    slug: ac_strings.slug_latest
  }
  const { featured, latest, popularTopics, popular } = pageContext
  return (


    <div>
      <MetaTag
        path={path}
        title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />
      <div>
        <div className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full" >
          {featured.map((c, i) => {

            return (
              <div className="scroll-snap-x-child ml-4" style={{ width: "88%", minWidth: "88%" }} key={shortid()}>
                <TopImgPost {...c} />
              </div>
            )

          })}
          <div className="min-w-4">

          </div>
        </div>
      </div>

      <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
        <PageSectionHeader title={ac_strings.latest} className="pb-4" />
        <div className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full" >
          {latest.map((c, i) => {

            return (
              <div className="scroll-snap-x-child ml-4" style={{ width: "88%", minWidth: "88%" }} key={shortid()}>
                <TopImgPost {...c} />
              </div>
            )

          })}
        </div>

      </div>
      {/*       <LazyLoad>
        <div className="py-6">
          <PageSectionHeader title={ac_strings.recommend_for_you} className="pb-4" />
          <FeatureSectionMobile topicPosts={popularTopics.static} />
        </div>
      </LazyLoad> */}
      <LazyLoad>
        <div className="py-6">
          <PageSectionHeader title={ac_strings.topics_for_you} className="pb-4" />
          {/* <FeaturedTopics featured={popularTopics.static} /> */}
          <div className="div6 bg-gray-200 sm:bg-transparent py-6 overflow-hidden">
            <PageSectionHeader title={ac_strings.popular} className="pb-4" />
            <div className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full" >
              {popular.map((c, i) => {

                return (
                  <div className="scroll-snap-x-child ml-4" style={{ width: "88%", minWidth: "88%" }} key={shortid()}>
                    <TopImgPost {...c} />
                  </div>
                )

              })}
            </div>

          </div>
          {/*           <div className="w-full p-4">
            <div className="w-full h-16">
              <BgImgTopicCard
                name={ac_strings.browse_resource}
                to={ac_strings.slug_explore}
              />
            </div>
          </div> */}
        </div>
      </LazyLoad>
    </div>

  )
}

export default IndexPage


interface IHomeProps {
  path: string
  pageContext: {
    featuredPosts: IPostRes[]
    latest: IPostItem[]
    popular: IPostItem[]
    featured: IPostItem[]
    mixedFeaturedPosts: IPostItem[][]
    popularTopics: {
      static: ITopicPostItems[]
      dynamic: ITopicPostItems[]
    }
  }

}
