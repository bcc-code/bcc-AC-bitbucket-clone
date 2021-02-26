import React, { Profiler } from 'react'
import loadable from '@loadable/component'
import ViewNext from '@/layout-parts/PostLayout/ViewNext'
import LazyLoad from 'react-lazyload';
import { ToggleFollowWithName } from '@/components/PostElements/TopicToggleFollow'
import { useSelector } from 'react-redux'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import Row3ColAndXScroll from '@/components/List/Combo/Row3Col-HorizontalScroll'
import shortid from 'shortid'
/* const AudioPlayer */
import { FetchPostsFromSlugs } from '@/HOC/FetchPosts'
import AudioMediaPlayer from '@/components/MediaPlayer/AudioBanner'
const VideoMediaPlayer = loadable(() => import('@/components/MediaPlayer/VideoPlayer'))
const Content = loadable(() => import('@/components/Content'))
const RecommendedPosts = loadable(() => import('@/layout-parts/PostLayout/RecommendedPostsSectionUpdate'))
import PostContent from '@/components/Content/PostContent'
import { PostH1 } from '@/components/Headers'

import RightImgWDes from '@/components/PostItemCards/RightImg'
import Link from '@/components/CustomLink'
import { ITopicPostItems } from '@/types'
import { PageSectionHeaderUpperCaseGray } from '@/components/Headers'
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow'
import SquareLeftImg from '@/components/PostItemCards/SquareLeftImg'
import {
    AuthorBookmarkShareSection,
    Translations,
    ShareBookmarkTopShortCuts
} from '@/layout-parts/PostLayout/PostSections'

import { ReadingTimingAuthor } from '@/components/PostElements'
import TwoToOneImg from "@/components/Images/Image2To1"
const acApiModule = import('@/util/api')
import { debounce } from '@/helpers'


import { IPostItem, ITopicPostSlugs, INavItem } from '@/types'
import { IRootState } from '@/state/types'

// mock data

import ac_strings from '@/strings/ac_strings.js'


type IMediaType = "audio" | "video"

export interface IMediaTypes {
    types: IMediaType[]
    default: IMediaType | "none"
}
interface IPostProps extends IPostItem {
    content: string
    allInterestedPosts: string[]
    topicPosts: ITopicPostSlugs[]
    authorsPosts: ITopicPostSlugs[]
    tranlsatedUrl: INavItem[]
    credits?: string
    seoTitle: string
    mediaTypes: IMediaTypes
}

import { currentMediaSelector } from '@/state/selectors/other'
import { loggedInSelector } from '@/state/selectors/user'
import { divide } from 'lodash';
export const PostLayout: React.FC<IPostProps> = (post) => {
    const [isWindowLoaded, setIsWindowLoaded] = React.useState(false)
    const [showMobileImage, setShowMobileImage] = React.useState(false)
    const {
        id,
        acId,
        title,
        slug,
        excerpt,
        authors,
        image,
        topics,
        format,
        content,
        tranlsatedUrl,
        glossary,
        mediaTypes: mediaTypesDefault,
        views,
        likes,
        duration,
        media,
        credits,
        seoTitle,
        allInterestedPosts,
        authorsPosts,
        topicPosts
    } = post

    const [currentMediaType, setCurrentMediaType] = React.useState<IMediaType | "none">(mediaTypesDefault.default)

    const isCurrentMedia = useSelector(currentMediaSelector)
    const isLoggedIn = useSelector(loggedInSelector)
    const contentEl = React.useRef<HTMLDivElement>(null);
    const lastScroll = React.useRef(null);

    React.useEffect(() => {
        if (isLoggedIn === "success") {
            lastScroll.current = Date.now() + 5000
            if (id) {
                acApiModule.then(res => {
                    const acApi = res.default
                    acApi
                        .visitsPost(id)
                        .catch((err: any) => {
                            console.log(err)
                        })
                })

            }
            const handleScroll = (e: any) => {
                if (lastScroll.current < Date.now()) {
                    lastScroll.current = Date.now() + 5000

                    if (id) {
                        acApiModule.then(res => {
                            const api = res.default
                            api
                                .readingPost(id)
                                .catch((err: any) => {
                                    console.log(err)
                                })
                        })

                    }
                }
            }
            const debounceScroll = debounce(handleScroll, 1000)
            window.addEventListener('scroll', debounceScroll);

            return () => {
                window.removeEventListener('scroll', debounceScroll)
            };
        }

    }, [post.slug])

    React.useEffect(
        () => {
            const handleWindowLoaded = () => {
                console.log('The page has fully loaded');
                setTimeout(() => {
                    console.log('add components after window load')
                    setIsWindowLoaded(true)
                }, 5 * 1000)
                setTimeout(() => {
                    setShowMobileImage(true)
                }, 2000)
            }
            if (document.readyState === 'complete') {
                console.log('the page is loaded previously')
                setIsWindowLoaded(true)
                setShowMobileImage(true)

            } else {
                window.addEventListener('load', handleWindowLoaded);
            }

            return () => window.removeEventListener('load', handleWindowLoaded);
        }, [])
    const defaultHeight = {
        "audio": 88,
        "video": typeof window !== 'undefined' ? ((9 / 16) * (window.innerWidth)) + 60 : 250,
        "none": typeof window !== 'undefined' ? (window.innerWidth / 2) - 30 : 135
    }

    const currentHeigt = defaultHeight[currentMediaType] + (mediaTypesDefault.types.length > 1 ? 39 : 0)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640
    return (
        <article className="overflow-scroll sm:overflow-visible w-full relative pt-9 sm:pt-0">
            {isWindowLoaded === true && (
                <ShareBookmarkTopShortCuts
                    id={id}
                    text={excerpt || title}
                    shareSlug={slug}
                    views={views}
                    likes={likes}
                    isPlayingAudio={!!isCurrentMedia.audio}
                />
            )}
            {/*             <ViewNext
                isPlayingAudio={!!isCurrentMedia.audio}
                slug={slug}

                position={{
                    height: contentEl.current && contentEl.current.clientHeight,
                    top: contentEl.current && contentEl.current.offsetTop
                }}
                postId={id}
                topics={topics}
                formats={format}
            /> */}
            <div className="fixed sm:relative w-full z-50">
                {currentMediaType === "video" && media.video && media.video.src && (
                    <VideoMediaPlayer src={media.video.src} key={shortid()} />

                )}
                {currentMediaType === "audio" && media.audio && (
                    <AudioMediaPlayer media={media} duration={duration?.listen} stopScrollingTitle={!!isCurrentMedia.audio} key={shortid()} />
                )}

                {mediaTypesDefault.types.length > 1 && (
                    <div className="w-full flex justify-center pb-4  bg-mp-background sm:pt-4">
                        {mediaTypesDefault.types.map((item, i) => (
                            <button
                                key={item}
                                className={`border-ac-slate-light text-ac-slate-light px-2 py-1 border-t border-b text-xs sm:text-sm ${i === 0 ? 'rounded-l  border-l' : 'rounded-r  border-r'} ${currentMediaType === item ? 'bg-ac-slate-light text-ac-slate-dark' : ''}`}
                                onClick={() => setCurrentMediaType(item)}>
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="sm:hidden fixed inset-x top-0 w-full">
                {mediaTypesDefault.types.length > 0 ? (
                    <div className='fixed bg-mp-background w-full' style={{ top: "96px", height: `${currentHeigt + 90}px` }}>

                    </div>
                ) : (
                        <div
                            className={`fixed transition-transform background-image w-full`}
                            style={{ top: "96px", backgroundSize: "cover", height: "200px" }}
                        >
                            {
                                showMobileImage === true ? (
                                    <LazysizesFeaturedImage style={{ objectFit: "cover" }} {...image} alt={image.alt ? image.alt : title} className={`w-full bg-center bg-cover`} />
                                ) : (
                                        <img src={image.dataUri} alt={image.alt ? image.alt : title} className={`w-full bg-center bg-cover`} />
                                    )
                            }
                        </div>

                    )}
            </div>
            <div className='w-full sm:hidden relative' style={{ top: "60px", height: `${currentHeigt}px` }}>

            </div>


            <div className="relative w-full h-full bg-white rounded-t-2xl sm:mt-12 pt-4 px-4 z-50 flex justify-center standard-max-w " >
                <div className="max-w-full sm:max-w-tablet relative">
                    <svg className="mx-auto mb-5 sm:hidden" width="44" height="5" viewBox="0 0 44 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="44" height="5" rx="2.5" fill="#D4D4D4" />
                    </svg>
                    <PostH1 title={title} />
                    <p className="text-ac-gray-dark mb-6 sm:mb-0 sm:font-medium sm:text-lg leading-normal" dangerouslySetInnerHTML={{ __html: excerpt }} />
                    <div className="border-b w-1/6 my-8 border-ac-gray"></div>
                    <div className="pb-6 bg-white text-sm">
                        <ReadingTimingAuthor
                            duration={duration?.read}
                            authors={authors}

                        />
                    </div>


                    {(currentMediaType === "audio") && (
                        <div className="block relative sm:pt-10 mb-12 ">
                            <TwoToOneImg image={image} rounded alt={seoTitle} />

                        </div>
                    )}
                    {(currentMediaType === "none") && (
                        <div className="hidden sm:block relative sm:pt-10 mb-12 ">
                            <TwoToOneImg image={image} rounded alt={seoTitle} />
                        </div>
                    )}

                    <div>
                        {
                            isWindowLoaded === true ? (
                                <div ref={contentEl}>
                                    <PostContent
                                        content={content}
                                        glossary={glossary}
                                        slug={slug}
                                        title={title}
                                    />
                                </div>
                            ) : (
                                    <Content
                                        content={content}
                                    />
                                )
                        }

                        {credits && (
                            <Content
                                content={credits}
                            />
                        )}
                        {isWindowLoaded === true && (
                            <div>
                                <div className="flex flex-wrap border-ac-gray py-6">
                                    {topics && topics?.map(item => (
                                        <ToggleFollowWithName {...item} />
                                    ))}
                                </div>


                                <div className="border-b pb-6">
                                    <AuthorBookmarkShareSection
                                        id={id}
                                        text={excerpt || title}
                                        shareSlug={slug}
                                        views={views}
                                        likes={likes}
                                        authors={authors}
                                        formats={format}

                                    />
                                </div>
                                <RecommendedPosts
                                    postId={acId ? acId : id}
                                    topics={topicPosts}
                                    readMorePosts={allInterestedPosts}
                                />

                                {authors && (
                                    <LazyLoad>
                                        {authorsPosts.length > 0 && authorsPosts.map(item => {

                                            return (
                                                <FetchPostsFromSlugs
                                                    layout="row"
                                                    slugs={item.posts}
                                                    render={({ posts }) => {
                                                        return (
                                                            <Row3ColAndXScroll
                                                                className="pt-6"
                                                                title={`${ac_strings.more_from} ${item.name}`}
                                                                posts={posts}
                                                            />
                                                        )
                                                    }}
                                                />


                                            )
                                        })}
                                    </LazyLoad>
                                )}

                            </div>
                        )}
                    </div>
                    <Translations translatedUrls={tranlsatedUrl || []} />


                </div>
                {isWindowLoaded === true && !isMobile && (
                    <div className="bg-grey-300 hidden lg:flex flex-col w-full pl-4 justify-start">
                        <div className="py-6">
                            <PageSectionHeaderUpperCaseGray title='More from these topics' />
                            {
                                topicPosts.map(item => {
                                    return (
                                        <div className="md:flex md:flex-col" key={shortid()}>
                                            {/*         <div className="flex flex-col sm:flex-row sm:items-center mt-5 sm:mt-4">
                                                    {subHeader && <PageSectionHeaderUpperCaseGray title={subHeader} />}
                                                    {header && <h4 className="font-roboto mb-6">{header}</h4>}
                                        
                                                </div> */}
                                            <div className="w-full flex justify-between items-center text-sm mb-6">
                                                <Link to={`${item.slug}`}>
                                                    {/* <PageSectionHeaderUpperCaseGray title={ac_strings.popular_topic} /> */}
                                                    <h4 className="font-roboto text-base">{item.name}</h4>
                                                </Link>
                                                <ToggleFollowOutlineBtn id={item.id} />
                                            </div>
                                            <FetchPostsFromSlugs
                                                layout="list"
                                                slugs={item.posts}
                                                render={({ posts }) => {
                                                    return (
                                                        <div className="mb-2">
                                                            {posts.slice(0, 5).map((item, k) => {
                                                                return (
                                                                    <SquareLeftImg {...item} key={k} />
                                                                )
                                                            })}
                                                        </div>
                                                    )
                                                }}
                                            />

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            {authorsPosts.length > 0 && authorsPosts.map(item => {

                                return (
                                    <FetchPostsFromSlugs
                                        layout="list"
                                        slugs={item.posts}
                                        render={({ posts }) => {
                                            return (
                                                <div className="py-6">
                                                    <PageSectionHeaderUpperCaseGray title={`${ac_strings.more_from} ${item.name}`} />

                                                    <div className="mb-2">
                                                        {posts.slice(0, 5).map((item, k) => {
                                                            return (
                                                                <SquareLeftImg {...item} key={k} />
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    />


                                )
                            })}
                        </div>

                    </div>
                )}

            </div>

            <div className="mx-auto max-w-tablet main-content py-8 relative bg-white px-4 sm:px-0 z-50">
                <p className=""><em>{ac_strings.scripture_copyright}</em></p>
            </div>

        </article >
    )
}

export default PostLayout

