import React from 'react'
import Link from '@/components/CustomLink'
import { IMedia } from '@/types'
import PlayIcon from '@/components/Icons/Play'
import SpeakerIcon from '@/components/Icons/Speaker'
import PlaySmallIcon from '@/components/Icons/PlaySmall'

import PlayButtonTrack from './PlayButtonTrack'
import PlayButtonList from './PlayButtonList'
import NewString from '@/strings/ac_strings.json'
export interface IPlayButtonProps {
    track: IMedia

}

export interface IPostItemMediaImg {
    track: IMedia
    slug: string
    className?: string
    style?: any
}

export const PostItemMediaImg: React.FC<IPostItemMediaImg> = ({ track, slug, className, children, style }) => {
    let ImgTag: any = Link
    let props: any = { to: slug }
    if (track && track.audio) {
        ImgTag = PlayButtonTrack
        props = { track }
    }


    return (
        <ImgTag className={className} style={style} {...props}>
            {track && (track.video || track.audio) && (
                <div
                    id="play-button"
                    className="absolute p-3 text-white inset-0 flex justify-center items-center z-10"
                >
                    {track.video ? <PlayIcon /> : <SpeakerIcon className="w-16 h-16" />}
                </div>
            )}
            {children}
        </ImgTag>
    )
}

export const PostItemPlayButton: React.FC<IPlayButtonProps> = ({ track }) => {
    if (track.audio || track.video) {

        return (
            <PlayButtonTrack track={track}>
                {track.video ? <PlayIcon /> : <SpeakerIcon className="w-16 h-16" />}
            </PlayButtonTrack>
        )
    } else {
        return null
    }
}

export const PostItemPlayButtonSmall: React.FC<IPlayButtonProps> = ({ track }) => {
    if (track.audio || track.video) {

        return (
            <PlayButtonTrack track={track}>
                {track.video ? <PlaySmallIcon /> : <SpeakerIcon className="w-10 h-10" />}
            </PlayButtonTrack>
        )
    } else {
        return null
    }
}

export const PlaylistPlayButton: React.FC<{ slug: string }> = ({ slug }) => {
    return (
        <PlayButtonList slug={slug}>
            <SpeakerIcon className="w-16 h-16" />
        </PlayButtonList>
    )
}

export const PlaylistPlayOutlineButton: React.FC<{ slug: string }> = ({ slug }) => {
    return (
        <PlayButtonList slug={slug}>
            <button className="rounded-full bg-d4slate-dark text-sm text-white font-semibold py-2 px-4">
                {NewString.play}
            </button>
        </PlayButtonList>
    )
}
