
import * as React from 'react'
import { IGalleryImage, IQuote } from '@/types'
/* import ShowWallpaperRelatedInfo from './ShowRelatedInfo' */
import Wallpaper from '@/components/QuoteImage'
import { KeyboardArrowDownIcon } from '@/components/Icons/MUI/arrowIcons'
import WallpaperInfo from '@/components/QuoteImage/WallpaperInfo'
import ac_strings from '@/strings/ac_strings'
import ShareInfo from './ShareQuote'

interface ISwipeViewContent {
    id?: string | number
    image?: IGalleryImage
    wallpaper?: IQuote
    border?: boolean
    color: number[]
    size: string
}

const WallpaperModalContent: React.FC<ISwipeViewContent & { isActive?: boolean, background?: string }> = ({ image, color, size, wallpaper, isActive, background, border }) => {
    const findImage = image || wallpaper && wallpaper.images && wallpaper.images[0]
    const download = (e: any, id: number) => {
        e.preventDefault();
        fetch(e.target.href, {
            method: "GET",
            headers: {}
        })
            .then(response => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `ActiveChristianity-wallpaper-${id}.png`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="pb-8 sm:w-3/4 md:w-tablet mx-auto md:grid md:grid-cols-2">
            <div className="relative">
                {findImage && isActive && (
                    <Wallpaper
                        className={`rounded-t-lg rounded-b-none md:rounded-l-lg md:rounded-r-none ${border ? 'border-t border-l border-b' : ""}`}
                        key={findImage.id}
                        image={findImage}
                        size={size}
                        color={color}
                        alt={findImage.alt}
                    />
                )}

                <div
                    className=" absolute bottom-0 left-0 right-0 z-10 h-12 text-white w-full flex justify-center items-center md:hidden"
                    style={{ background: `linear-gradient( to bottom, transparent, ${background} )` }}
                >
                    <KeyboardArrowDownIcon />
                </div>
            </div>
            <div className={`py-6 px-4 bg-white rounded-b-lg md:rounded-r-lg md:rounded-l-none ${border ? 'border-t border-r border-b' : ""}`}>
                {isActive && (
                    < div >
                        <div className="flex justify-between flex-col md:flex-row">
                            {wallpaper && findImage && (
                                <ShareInfo
                                    title={findImage.alt}
                                    imageUrl={findImage?.src}
                                    shareUrl={`${ac_strings.wallpaper_slug}/${wallpaper.id}`}
                                    text={wallpaper.content}
                                />
                            )}
                            <div className="flex items-center md:order-2">
                                <a className="w-full rounded-lg bg-ac-slate-dark text-white text-lg px-4 py-2 font-semibold text-center" href={findImage && findImage.src} onClick={(e) => download(e, findImage && findImage.id ? findImage.id : 1)}>{ac_strings.download}</a>
                            </div>
                        </div>
                        {wallpaper && <WallpaperInfo  {...wallpaper} />}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WallpaperModalContent