import React from 'react'
import { graphql } from "gatsby"
// components
import FeaturedCard from '@/components/PostItemCards/FeaturedCard'
import { LayoutH1Wide } from '@/components/Headers'
import MetaTag from '@/components/Meta'
import PlaylistTopImg from '@/components/PostItemCards/PlaylistTopImg'
import shortId from 'shortid'
// types
import { IPlaylist, ITranslations } from '@/types'
import TwoToThreeTabs from '@/components/Tabs/TwoToThreeTabs'
import ScrollNavTabs from '@/components/Tabs/ScrollNavTabs'
import ac_strings from '@/strings/ac_strings.js'

const PlaylistOverview: React.FC<IPlaylistOverviewProps> = ({ pageContext, data }) => {

    const { title, pagePath } = pageContext
    const translatedUrls: ITranslations[] = []
    const { audio, podcasts, songs, playlists } = data.ac


    const panels = [
        {
            name: ac_strings.all,
            list: playlists
        },

        {
            name: ac_strings.audio_posts,
            list: audio
        },
        {
            name: ac_strings.songs,
            list: songs
        },
        {
            name: ac_strings.podcast,
            list: podcasts
        }
    ]
    {/* <PodcastTopImg
                            key={shortId()}
                            {...p}
                            slug={`${ac_strings.slug_playlist}/${p.slug}`}
                        /> */}
    return (
        <div className="max-w-tablet mx-auto pt-6">
            <MetaTag
                title={title}
                translatedUrls={translatedUrls}
                type="page"
                breadcrumb={[]}
                path={pagePath}

            />
            <LayoutH1Wide title={title} />
            <div className="hidden sm:block">
                <TwoToThreeTabs
                    tabs={panels.map(panel => {
                        return ({
                            name: panel.name,
                            to: ac_strings.slug_playlist,
                            content: (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  grid-h70  gap-4 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-12 py-8">
                                    {panel.list.map((p) => {

                                        return (

                                            <PlaylistTopImg
                                                key={shortId()}
                                                {...p}
                                                slug={`${ac_strings.slug_playlist}/${p.slug}`}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })
                    })}

                />
            </div>
            <div className="sm:hidden">
                <ScrollNavTabs
                    tabs={panels.map(panel => {
                        return ({
                            name: panel.name,
                            to: ac_strings.slug_playlist,
                            content: (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  grid-h70  gap-4 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-12 py-8">
                                    {panel.list.map((p) => {

                                        return (

                                            <PlaylistTopImg
                                                key={shortId()}
                                                {...p}
                                                slug={`${ac_strings.slug_playlist}/${p.slug}`}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })
                    })}

                />
            </div>
        </div>


    )
}

export default PlaylistOverview



interface IPlaylistOverviewProps {
    path: string
    pageContext: {
        pagePath: string
        title: string
        slug: string

    }
    data: {
        ac: {
            audio: IPlaylist[]
            songs: IPlaylist[]
            podcasts: IPlaylist[]
            playlists: IPlaylist[]
        }
    }
}

export const pageQuery = graphql`
fragment PlaylistSimple on AcGraphql_Playlist {
                id
                title
                slug
                excerpt
                image {
                    src
                    srcset
                    dataUri
                }
                type
}
    query AllPlaylists {
        ac {
            audio:playlists(type:AUDIO_POSTS) {
                ...PlaylistSimple
            }
            songs:playlists(type:SONGS) {
                    ...PlaylistSimple
            }
            podcasts:playlists(type:PODCAST) {
                    ...PlaylistSimple
            }
            playlists {
                    ...PlaylistSimple
            }
        }
    }
`
