
import * as React from 'react';
import { IPostItem } from '@/types'
import PostBase, { IPostBase } from '@/components/PostElements/Base'
import { PostLabel } from '@/components/PostItem/PostItemParts'
import Image2To1 from '@/components/Images/Image2To1'
import { PostItemMediaImg } from '@/components/PostElements/PlayButton'


interface ITopImgPost {
    noBorder?: boolean
    showType?: boolean
    noExcerpt?: boolean
    noBg?: boolean
}

const TopImgPost: React.FC<IPostItem & ITopImgPost> = (props) => {
    const {
        title,
        excerpt,
        image,
        noBorder,
        noExcerpt,
        media,
        showType,
        format,
        noBg
    } = props

    return (
        <div
            className={`flex flex-col max-w-lg text-gray-800 h-full overflow-hidden ${noBg === true ? 'bg-none' : 'bg-white '} ${noBorder !== true ? ' rounded-xxl sm:rounded-xl border' : ''} `}>
            <PostItemMediaImg
                className={`relative w-full sm:pl-0 flex justify-end`}
                track={media}
                slug={props.slug}
            >
                {showType && format && format[0] && (
                    <div className="absolute p-3  top-0 left-0 flex">
                        <PostLabel text={format[0].name}></PostLabel>
                    </div>
                )}

                <Image2To1
                    image={image}
                    imageClassName={`w-full h-full pointer-events-none w-auto object-cover g-image ${noBorder === true ? 'rounded-xl' : 'rounded-xl rounded-b-none'}`}
                    alt={title}
                />
            </PostItemMediaImg>
            <PostBase
                post={props}
                wrapperClass={noBorder === true ? ' pt-4 pr-4' : 'px-4 pt-4'}
                postTitleProps={{
                    fontKey: 'text-lg',
                    clamp: 3,
                    bold: "font-semibold",
                    className: "mb-2 text-d4slate-dark"
                }}
                postExcerptProps={noExcerpt ? undefined : {
                    fontKey: 'text-base',
                    clamp: 3,
                    className: "flex items-stretch mb-4"
                }}
                audioDuration />
        </div>

    )
}

export default TopImgPost