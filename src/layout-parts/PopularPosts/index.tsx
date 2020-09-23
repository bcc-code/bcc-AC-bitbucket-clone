import * as React from 'react';
import Link from '@/components/CustomLink'
import { PostItemPlayButtonSmall } from '@/layout-parts/Buttons/PlayButton'
import { IPostItem } from '@/types'
import { PostTitle, ReadingTimingAuthor } from '@/components/PostItem/PostItemParts'
interface IProps {
    title: string
    small?: boolean
    posts: IPostItem[]
    playIcon?: boolean
}
const PopularPosts: React.FC<IProps> = ({ posts, title, playIcon, small }) => {
    return (
        <div className="p-4 rounded-lg" style={{ backgroundImage: 'linear-gradient(#edf2f7,#fff)' }}>
            <div className="flex flex-col pb-4">
                <h6 className="text-d4slate-dark text-lg font-bold mb-4">{title}</h6>
                <ol className="w-full">
                    {posts.map((post, i) => {

                        return (
                            <div className="flex" key={post.slug}>
                                <div className="flex items-center">
                                    <div className="bg-white w-8 h-8 flex justify-center items-center pt-1 mt-1" style={{ borderRadius: 9999 }}>
                                        <div className="mx-4 text-gray-300 ">
                                            {!small && (post.media.audio || post.media.video) ?
                                                (
                                                    <PostItemPlayButtonSmall track={post.media} />
                                                )
                                                : (
                                                    <div className="-mt-1 mx-4">{i + 1}</div>
                                                )}

                                        </div>
                                    </div>
                                </div>

                                <Link to={post.slug} className="flex-1 ml-4 my-2">
                                    {small ? (
                                        <h2 className="text-sm font-semibold">{post.title}</h2>
                                    ) : (
                                            <PostTitle
                                                rawText={post.title}
                                                bold="font-semibold"
                                                fontKey="top-img"
                                            />
                                        )}

                                    {post.media.audio && !small && (
                                        <span>
                                            <ReadingTimingAuthor
                                                authors={[]}
                                                readingTime={post.media.audio.duration}
                                            />

                                        </span>
                                    )}
                                    {playIcon && (
                                        <ReadingTimingAuthor readingTime={post.reading_time?.text} authors={post.authors} />
                                    )}
                                </Link>
                            </div>

                        )

                    })}
                </ol>
            </div>
        </div>
    )
}

export default PopularPosts