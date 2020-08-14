/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import Layout from "./src/layouts/App"
import "react-placeholder/lib/reactPlaceholder.css"
import "normalize.css/normalize.css"
import "./src/styles/reset.css"

import wrapWithProvider,{preloadedState} from "./provider"

import { getScreenSize } from '@/util'
export const wrapRootElement = wrapWithProvider

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (typeof window !== 'undefined') {
    window.refTagger && window.refTagger.tag && window.refTagger.tag();
    /* window.cue && window.cue.initialize(); */
    // Since the History Change trigger fires as soon as the event is dispatched, the content might not be there yet when the tracking tags fire.
    // By delaying the trigger, the tags won’t fire until the page has had time to load the content
    const dataLayer = window.dataLayer = window.dataLayer || [];
    const pathname=typeof location.pathname ==='string' && location.pathname==='/'?location.pathname:location.pathname.replace(/\/$/, "")
    setTimeout(()=>{
      dataLayer.push({
        event: 'ac.pageview',
        location:pathname + location.search + location.hash
      })
    },500)
  }
}

