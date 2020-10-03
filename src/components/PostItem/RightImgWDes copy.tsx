import * as React from 'react';
import Link from '@/components/CustomLink'

import { IPostItem } from '@/types'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import { TopicWithIcon } from '@/components/PostElements/TopicToggleFollow'
import { PostTitle, PostExcerpt, ReadingTimingAuthor } from '@/components/PostItem/PostItemParts'
import { PostItemMediaImg } from '@/components/PostElements/PlayButton'
import { BookmarksAndViews } from '@/components/PostElements'

import 'lazysizes';

interface IRightImgNoDes extends IPostItem {
    border?: boolean,
    audioDuration?: boolean
    noDes?: boolean
    withTopics?: boolean
}
const RightImgWDes: React.FC<IRightImgNoDes> = (props) => {

    const {
        title,
        image,
        types,
        topics,
        format,
        bookmarked,
        excerpt,
        border,
        slug,
        id,
        reading_time,
        authors,
        media,
        date,
        audioDuration,
        noDes,
        likes,
        views,
        withTopics
    } = props
    let postAuthors = authors
    let postReadingTime = reading_time?.text

    if (media && media.audio && audioDuration == true) {
        postAuthors = []
        postReadingTime = media.audio.duration
    }

    return (
        <div className={`${border !== false ? 'border-b border-b-1 border-gray-300 last:border-b-1 mr-4 sm:border-none pb-4' : ''}`}>
            <div className="flex items-center sm:items-stretch w-full cursor-pointer mt-2">
                <div className={`sm:pr-4 pb-5 flex flex-col w-9/12 sm:w-6/12 md:w-9/12 items-start ${border !== false ? 'sm:border-b sm:border-b-1 sm:border-gray-300 last:sm:border-b-1 mr-4' : ''}`}>
                    {format && format[0] && (
                        <div className="pb-2">
                            <span className="rounded uppercase p-1 text-xxs font-bold bg-gray-100 text-gray-600">{format[0].name}</span>
                        </div>
                    )}
                    {media && media.audio && media.audio.playlistSlug === "podcast" && date && (
                        <span className="text-gray-500 text-xxs">{date.getDate()} {date.toLocaleString('default', { month: 'short' })} {date.getFullYear()}</span>
                    )}
                    <Link to={`${slug}`} className="w-full">
                        <PostTitle
                            rawText={title}
                            fontKey="right-img"
                            bold="font-semibold"
                            className="block mb-2 sm:mb-4 mt-1"
                        />
                        {noDes !== true && (
                            <PostExcerpt
                                rawText={excerpt}
                                clamp={2}
                                fontKey="top-img-exceprt"
                                className="block mb-2 mx max-w-full sm:whitespace-normal sm:overflow-visible"
                            />
                        )}
                        {withTopics && topics && (
                            <div className="flex flex-wrap">
                                {topics.map(t => (
                                    <div className="">
                                        <TopicWithIcon  {...t} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </Link>

                    <div className="items-center w-full hidden sm:flex  sm:mt-12">

                        <ReadingTimingAuthor className="w-full text-sm text-d4gray-dark hidden md:block" readingTime={postReadingTime} authors={postAuthors} />
                        <div>
                            {typeof likes === "number" && typeof views === "number" && (
                                <BookmarksAndViews
                                    id={id}
                                    likes={likes}
                                    views={views}
                                />
                            )}
                        </div>

                    </div>
                </div>
                <div className="w-3/12 sm:w-6/12 md:w-3/12 flex justify-center">
                    <PostItemMediaImg
                        className="relative w-full max-h-24 pb-square sm:pb-half"
                        track={media}
                        slug={slug}

                    >
                        <LazysizesFeaturedImage
                            {...image}
                            className="absolute w-full h-full inset-0 rounded-xxl sm:rounded-xl object-cover g-image"
                            alt={title}
                        />

                    </PostItemMediaImg>

                </div>

            </div>
            <div className="items-center w-full flex sm:hidden  sm:mt-12">

                <ReadingTimingAuthor className="w-full text-sm text-d4gray-dark lg:block" readingTime={reading_time?.text} authors={authors} />
                {typeof likes === "number" && typeof views === "number" && (
                    <BookmarksAndViews
                        id={id}
                        views={views}
                        likes={likes}
                    />
                )}

            </div>
        </div>

    )
}

export default RightImgWDes;