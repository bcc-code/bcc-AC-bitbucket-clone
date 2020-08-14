
import * as React from 'react';
import { IPostItem } from '@/types'
import { PostBase, IPostBase } from '@/components/PostItem/PostItemParts'
import { LazysizesFeaturedImage } from '@/components/Images/LazysizesImage'
import { PostItemMediaImg } from '@/components/Buttons/PlayButton'
import "./style/leftverticle.css"


interface ITopImgPost {
    isLeftImg?: boolean
    isHeader?: boolean
    noBorder?: boolean
    showType?: boolean
}

const TopImgPost: React.FC<IPostItem & ITopImgPost> = (props) => {
    const {
        title,
        excerpt,
        types,
        isLeftImg,
        isHeader,
        image,
        noBorder,
        media,
        showType
    } = props

    const topImgClasses = {
        mainClass: 'flex flex-col max-w-lg bg-white text-gray-800 h-full overflow-hidden ',
        imageWrapper: {
            className: "relative block w-full sm:pl-0 flex justify-end",
            style: { minWidth: '84px', height: "180px" }
        },
        imageClass: "w-full h-full pointer-events-none w-auto object-cover g-image",
        postbaseWrapperClass: 'px-4 pt-4'

    }

    if (noBorder !== true) {
        topImgClasses.mainClass = topImgClasses.mainClass + ' rounded-xxl sm:rounded-xl border hover:shadow-md'
    }

    const leftImgClasses = {
        mainClass: topImgClasses.mainClass + ' left-vert w-full',
        imageWrapper: {
            className: "relative flex justify-end left-vert-img"
        },
        imageClass: topImgClasses.imageClass + ' rounded-l-xl',
        postbaseWrapperClass: topImgClasses.postbaseWrapperClass + ' left-vert-content'
    }


    if (noBorder !== true && isLeftImg !== true) {
        topImgClasses.imageClass = topImgClasses.imageClass + ' rounded-xl rounded-b-none'
    }

    const classConfig = isLeftImg ? leftImgClasses : topImgClasses

    const postBaseProps: IPostBase = {
        post: props,
        wrapperClass: classConfig.postbaseWrapperClass,
        postTitleProps: {
            rawText: title,
            fontKey: isHeader ? "top-img-lg" : "top-img",
            clamp: isHeader ? 2 : 3,
            bold: "font-semibold",
            className: "mb-2"
        },
        postExcerptProps: {
            rawText: excerpt,
            fontKey: "top-img-exceprt",
            clamp: 3,
            className: "flex items-stretch mb-8"
        },
        hasReadingTime: true

    }

    return (
        <div
            className={classConfig.mainClass}>
            <PostItemMediaImg
                {...classConfig.imageWrapper}
                track={media}
                slug={props.slug}
            >
                {showType && types && types[0] && (
                    <div className="absolute p-3  top-0 left-0">
                        <span className="font-roboto rounded uppercase p-1 text-xxs bg-white opacity-75">{types[0].name}</span>
                    </div>
                )}

                <LazysizesFeaturedImage
                    {...image}
                    className={classConfig.imageClass}
                    alt={title}
                />
            </PostItemMediaImg>
            <PostBase {...postBaseProps} audioDuration />
        </div>

    )
}

export default TopImgPost