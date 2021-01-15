import * as React from "react"
import loadable from '@loadable/component'
import HomeMobile from '@/layout-parts/Home/Mobile'
import HomeDesktop from '@/layout-parts/Home/Desktop'
import MetaTag from '@/components/Meta'

import { processRecommendationContext, getRandomFeatured } from '@/helpers'


// Type
import { IPostRes, ITopicPostItems } from '@/types'

// Helpers
import ac_strings from '@/strings/ac_strings.js'


const IndexPage: React.FC<IHomeProps> = (props) => {
  const { pageContext, path } = props

  const {
    featuredPosts: featuredPosts,
    popularTopics: popularTopicsAll,
    popularPosts: popularPostsAll,
    latestPosts: latestPosts

  } = pageContext

  const popularPosts = popularPostsAll.dynamic && popularPostsAll.dynamic.length > 0 ? popularPostsAll.dynamic : popularPostsAll.static
  const { featured, latest, popular } = processRecommendationContext({ popularPosts, featuredPosts, latestPosts })

  const mixed = getRandomFeatured({ latest, popular, featured })

<<<<<<< HEAD
=======
  let home = <HomeDesktop
    mixed={mixed}
    latest={latest}
    popular={popular}
    popularTopicsAll={popularTopicsAll}
  />
  if (typeof window !== "undefined" && window.innerWidth <= 640) {
    home = <HomeMobile
      mixed={mixed}
      latest={latest}
      popular={popular}
      popularTopicsAll={popularTopicsAll}
    />
  }
>>>>>>> 8762ecd67471522f51d24e3ba7d5dd3935c2ae97
  return (

    <div className="standard-max-w">
      <MetaTag
        path={path}
        title={`${ac_strings.site_title} - ${ac_strings.tagline}`}
        type="website"
        translatedUrls={[]}
        breadcrumb={[]}
      />
<<<<<<< HEAD
      <HomeMobile
        mixed={mixed}
        latest={latest}
        popular={popular}
        popularTopicsAll={popularTopicsAll}
      />
      <HomeDesktop
        mixed={mixed}
        latest={latest}
        popular={popular}
        popularTopicsAll={popularTopicsAll}
      />
=======
      {home}
>>>>>>> 8762ecd67471522f51d24e3ba7d5dd3935c2ae97
    </div >

  )
}

export default IndexPage


interface IHomeProps {
  path: string
  pageContext: {
    featuredPosts: IPostRes[]
    latestPosts: IPostRes[]
    popularPosts: {
      static: IPostRes[]
      dynamic: IPostRes[]
    }
    popularTopics: {
      static: ITopicPostItems[]
      dynamic: ITopicPostItems[]
    }
  }

}
