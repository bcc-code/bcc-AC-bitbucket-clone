/* eslint-disable */

import React from "react"
import {languages} from './strings/generated/menus.json'

export const preloadedState = {
    auth: {
        loggedIn: 'notLoggedIn'
    },
    translatedUrls:languages,
    playlist:[],
    currentMedia:{},
    isPlaying:false,
    isAutoPlay:false,
    mpPlayPause:false,
    
    isSignInModalOpen:null,
    isModalOpen:false,
    userLibrary:{
        bookmarkedPosts: [],
        unfinishedPosts: [],
        followedTopics: [],
        followedPlaylists: [],
        followedAuthors: [],
        historyPosts: []
    },
    mpHeight:0,
    breadcrumb:{
        items:[],
        title:''
    }
}

export default ({ element }) => {
    
    return (
      <div> nothing</div>
    )
}