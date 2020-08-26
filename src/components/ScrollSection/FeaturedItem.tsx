import * as React from 'react'
import { INavItem, IImage, IEbook, IPostItem, IPlaylist, } from "@/types"
import { fetchEbookFromSlug, fetchPlaylistFromSlug, fetchOneLocalPostsFromSlug } from '@/helpers'
import Ebook from '@/components/ScrollSection/Ebook'
import DesktopHeaderPost from '@/components/PostItem/DesktopHeaderPost'
import Playlist from '@/components/ScrollSection/Playlist'
interface IPageFeaturedPost {
    type: "playlist" | "ebook" | "post"
    id: number
    image: IImage
    slug: string
    sub: string
    title: string
}

interface IModifiedFields {
    exceprt?: string
    title?: string
    image?: IImage
}
const FeaturedItem: React.FC<IPageFeaturedPost & { withBg?: boolean }> = ({
    type,
    id,
    image,
    slug,
    sub,
    title
}) => {

    const [loadedEbook, setLoadedEbook] = React.useState<IEbook | undefined>(undefined)
    const [loadedPost, setLoadedPost] = React.useState<IPostItem | undefined>(undefined)
    const [loadedPlaylist, setLoadedPlaylist] = React.useState<IPlaylist | undefined>(undefined)

    React.useEffect(() => {
        setPost()
    }, [slug])

    const setPost = () => {
        let modified: IModifiedFields = {}
        if (title && title.trim() !== "") {
            modified["title"] = title
        }

        if (sub && sub.trim() !== "") {
            console.log(sub)
            modified.exceprt = sub
        }

        /*         if (image) {
                    modified.image = image
                } */
        if (type === "ebook") {
            fetchEbookFromSlug(slug).then(res => {
                if (res) {
                    console.log(res)
                    const toAdd = { ...res, ...modified }
                    setLoadedEbook(toAdd)
                }

            })
        } else if (type === "playlist") {
            fetchPlaylistFromSlug(slug).then(res => {
                if (res) {
                    const toAdd = { ...res, ...modified }
                    setLoadedPlaylist(toAdd)
                }

            })
        } else if (type == "post") {
            fetchOneLocalPostsFromSlug(slug).then(res => {
                if (res) {
                    const toAdd = { ...res, ...modified }
                    setLoadedPost(toAdd)
                }
            })
        }
    }

    if (loadedEbook) {
        return <Ebook {...loadedEbook} />
    } else if (loadedPost) {
        return <DesktopHeaderPost {...loadedPost} />
    } else if (loadedPlaylist) {
        return <Playlist {...loadedPlaylist} />
    } else {
        return null
    }
}

export default FeaturedItem