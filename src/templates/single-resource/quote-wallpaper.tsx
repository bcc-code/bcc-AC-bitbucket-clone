import React from 'react'
import { graphql } from "gatsby"
import MetaTag from '@/components/Meta'
import WallpaperModalContent from '@/components/QuoteImage/QuoteModalContent'
import { CloseIcon, KeyboardArrowRightIcon, KeyboardArrowLeftIcon } from '@/components/Icons/MUI/arrowIcons'
import Link from '@/components/CustomLink'
import Modal from 'react-modal';
import ac_strings from '@/strings/ac_strings.js'
import { useLocation } from '@reach/router';
import { getAllUrlParams } from '@/helpers/index-js'
import { normalizePostRes } from '@/helpers/normalizers'
const Wallpaper: React.FC<IQuoteWallpaperProps> = (props) => {
    const { post, ...moreInfo } = props.data.ac.quote
    console.log(post)
    const wallpaper = props.pageContext
    const normalizedPost = normalizePostRes(post)
    const { image, color, size, nextId, previousId, pagePath, breadcrumb, content, isBibleQuote, source } = wallpaper
    const location = useLocation();
    const parsed = getAllUrlParams(location.search);

    const child = (
        <WallpaperModalContent
            image={image}
            wallpaper={{ ...wallpaper, ...moreInfo, post: normalizedPost }}
            isActive={true}
            size={size}
            color={color}
            border={parsed.openmodal !== "true"}
        />
    )
    return (
        <div className="pt-9 sm:pt-0">
            <MetaTag
                title={`${isBibleQuote ? source : ''} Bibleverse wallpaper - ${content} `}
                type="page"
                path={pagePath}
                breadcrumb={breadcrumb}
            />
            {parsed.openmodal === "true" ? (<Modal
                isOpen={true}
                className="inset-0 h-screen w-screen px-2 flex justify-center items-center overflow-scroll"
                style={{
                    overlay: {
                        backgroundColor: color ? `rgba(${color[0]}, ${color[1]}, ${color[2]}` : 'rgba(0, 0, 0, 0.5)',
                        zIndex: 700,
                        transition: `background-color 1000ms linear`
                    }
                }}
            >
                <div
                    className="absolute top-0 right-0 left-0 z-10 text-white w-full flex justify-end"
                    style={{ background: 'linear-gradient( to top, transparent, rgba(0, 0, 0, 0.5) )' }}

                >
                    <Link
                        className="p-4"
                        to={`${ac_strings.wallpaper_slug}`}
                    >
                        <CloseIcon />
                    </Link>
                </div>
                <div className="h-full w-full pt-10 overflow-scroll relative ">
                    <div className="absolute bottom-1/2 right-0 left-0 z-10 text-white w-full flex p-2 justify-between">

                        <Link
                            className=""
                            to={`${ac_strings.wallpaper_slug}/${previousId}`}
                        >
                            <KeyboardArrowLeftIcon />
                        </Link>
                        <Link
                            className=""
                            to={`${ac_strings.wallpaper_slug}/${nextId}`}
                        >
                            <KeyboardArrowRightIcon />
                        </Link>
                    </div>
                    {child}
                </div>
            </Modal>
            ) : (
                <div className="py-6">

                    {child}
                </div>
            )}
        </div>
    )
}

/* id?: string | number
image?: IGalleryImage
wallpaper?: IQuote
color: number[]
size: string */

export default Wallpaper

interface IQuoteWallpaperProps {
    path: string
    pageContext: any
    data: any
}

export const wallpaperQuery = graphql`
    query quoteById($id: ID!) {
        ac {
            quote(id:$id){
                author {
                    id
                    name
                    slug
                }

                post {
                    title
                    slug

                    excerpt
                    image {
                        src
                        srcset
                        dataUri
                        colors

                    }
                    track {
                        url
                        title
                        duration
                        playlists {
                            slug
                            title
                        }
                        post {
                            title
                            slug
                        }
                    }
                    authors {
                        name
                        slug
                        id
                        pivot {
                            as
                        }
                    }
                    topics {
                        name
                        slug
                        id
                        group {
                            id
                            name
                            slug
                        }
                    }
                }
                topics {
                    id
                    name
                    slug
                }
            }
        }
    }
`