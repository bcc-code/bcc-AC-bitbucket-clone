import * as React from "react"
import { IPlaylist, IPostItem } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
import { getPlaceholder } from '@/layout-parts/Loader/PlaceHolders'
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData'
import ac_strings from '@/strings/ac_strings.json'


interface IFetchLatestPlaylist {
    layout: "row" | "list" | "one",
    render: (data: { playlists: IPlaylist[] }) => JSX.Element
}
export const FetchLatestPlaylists: React.FC<IFetchLatestPlaylist> = ({ render, layout }) => {
    const [playlists, setPlaylists] = React.useState<IPlaylist[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        fetch(`/page-data/${ac_strings.slug_playlist}/page-data.json`)
            .then(res => res.json())
            .then(res => {
                setLoading(false)
                if (res.result && res.result.data.ac && res.result.data.ac.playlists) {
                    const allPlaylist = res.result.data.ac.playlists
                    setPlaylists(allPlaylist)
                }

            })
    }, [])

    const CustomPlaceholder = getPlaceholder[layout]
    return (

        <CustomPlaceholder
            loading={loading}
        >
            {render({ playlists })}
        </CustomPlaceholder>
    )

}


interface IFetchLatestPodcast {
    layout: "row" | "list" | "one",
    render: (data: { podcastEps: IPostItem[] }) => JSX.Element
}
export const FetchLatestPodcast: React.FC<IFetchLatestPodcast> = ({ layout, render }) => {
    const [podcastEps, setPodcastEps] = React.useState<IPostItem[]>([])
    const [loading, setLoading] = React.useState(true)
    React.useEffect(() => {
        setLoading(true)
        fetch(`/page-data/${ac_strings.podcast}/page-data.json`)
            .then(res => res.json())
            .then(res => {

                const postSlugs = res.result.data.ac.topics[0].posts.slice(0, 12).map(p => p.slug)
                return fetchLocalPostsFromSlugs(postSlugs).then(res => {
                    if (res) {
                        setPodcastEps(res)
                    }
                    setLoading(false)
                })

            })
    }, [])
    const CustomPlaceholder = getPlaceholder[layout]
    return (

        <CustomPlaceholder
            loading={loading}
        >
            {render({ podcastEps })}
        </CustomPlaceholder>
    )

}
