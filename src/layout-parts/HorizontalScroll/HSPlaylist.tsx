import React from 'react'
import XScroll from '@/layout-parts/HorizontalScroll/BaseCustomSize'
import { IPlaylist } from '@/types'
import PodcastTopImg from '@/components/PostItemCards/PlaylistTopImg'
const HSCardList: React.FC<{ playlists: IPlaylist[] }> = ({ playlists }) => {
    return (
        <XScroll
            childeClassName="w-3/12 min-w-3/12"
            items={playlists.map((p) => (
                <PodcastTopImg  {...p} />
            ))}
        />

    )
}

export default HSCardList