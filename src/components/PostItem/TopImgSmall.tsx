
import * as React from 'react';
import { IPostItem } from '@/types'
import { PostBase, IPostBase, PostLabel } from '@/components/PostItem/PostItemParts'
import LazysizesFeaturedImage from '@/components/Images/LazysizesImage'
import Image2To1 from '@/components/Images/Image2To1'
import { PostItemMediaImg } from '@/layout-parts/Buttons/PlayButton'
import "./style/leftverticle.css"


interface ITopImgPost {
    isLeftImg?: boolean
    isHeader?: boolean
    noBorder?: boolean
    showType?: boolean
    roundedImage?: boolean
    hideReadingTime?: boolean
    noBg?: boolean
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
        roundedImage,
        media,
        showType,
        format,
        hideReadingTime,
        reading_time,
        noBg
    } = props

    const topImgClasses = {
        mainClass: `flex flex-col max-w-lg text-gray-800 h-full overflow-hidden ${noBg === true ? 'bg-none' : 'bg-white '}`,
        imageWrapper: {
            className: "relative block w-full sm:pl-0 flex justify-end",
            /* style: { minWidth: '84px', height: "180px" } */
        },
        imageClass: "w-full h-full pointer-events-none w-auto object-cover g-image",
        postbaseWrapperClass: 'px-4 pt-4'

    }

    if (noBorder !== true) {
        topImgClasses.mainClass = topImgClasses.mainClass + ' rounded-xxl sm:rounded-xl border hover:shadow-md'
    }

    if (noBorder === true && roundedImage === true) {
        topImgClasses.postbaseWrapperClass = 'pt-4 pr-4'
    }


    if (roundedImage === true) {
        topImgClasses.imageClass = topImgClasses.imageClass + ' rounded-xl'
    } else if (noBorder !== true && isLeftImg !== true) {
        topImgClasses.imageClass = topImgClasses.imageClass + ' rounded-xl rounded-b-none'
    }

    const classConfig = topImgClasses

    const postBaseProps: IPostBase = {
        post: props,
        wrapperClass: classConfig.postbaseWrapperClass,
        postTitleProps: {
            rawText: title,
            fontKey: "feature-card",
            clamp: 3,
            bold: "font-semibold",
            className: "mb-2"
        },
        /*         postExcerptProps: {
                    rawText: excerpt,
                    fontKey: "top-img-exceprt",
                    clamp: 3,
                    className: "flex items-stretch mb-4"
                }, */
        hasReadingTime: hideReadingTime ? false : true

    }

    return (
        <div
            className={classConfig.mainClass}>
            <PostItemMediaImg
                {...classConfig.imageWrapper}
                track={media}
                slug={props.slug}
            >
                {showType && format && format[0] && (
                    <div className="absolute p-3  top-0 left-0 flex">
                        <PostLabel text={format[0].name}></PostLabel>
                    </div>
                )}

                {/* <LazysizesFeaturedImage
                    {...image}
                    className={classConfig.imageClass}
                    alt={title}
                /> */}
                <Image2To1
                    image={image}
                    imageClassName={classConfig.imageClass}
                    alt={title}
                />
            </PostItemMediaImg>
            <PostBase {...postBaseProps} audioDuration />
        </div>

    )
}

export default TopImgPost