import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { useDispatch } from 'react-redux'
import { updateTranslationUrl, updateBreadcrumb } from '@/state/action'

import { Location } from '@reach/router'
import ac_strings from "@/strings/ac_strings.js"
import { INavItem, ITranslations } from '@/types'

export interface MetaTagProps {
    path?: string
    breadcrumb: INavItem[]
    wpId?: number
    title: string
    type: 'website' | 'page' | 'article' | 'profile' | 'book' | 'video' | 'music' | 'message' | 'audio' | 'podcast'
    meta?: {
        [k: string]: any
    }
    translatedUrls?: ITranslations[]
}

const MetaTag: React.FC<MetaTagProps> = ({ title, type, meta, translatedUrls, breadcrumb, path }) => {

    const dispatch = useDispatch()

    const { description, date, tags, categories, imageUrl, authors }: { [k: string]: any } = meta || {}

    const mediaTypes: { [k: string]: string } = {
        music: 'music.song',
        video: 'video.other',
        message: 'music.other',
        podcast: 'music.other',
        audio: 'music.playlist',
    }

    useEffect(() => {

        if (translatedUrls) {
            dispatch(updateTranslationUrl({ translated: translatedUrls }))
        } else {
            dispatch(updateTranslationUrl({ translated: [] }))
        }
        dispatch(updateBreadcrumb({
            items: breadcrumb ? breadcrumb : [],
            title: path === "/" ? ac_strings.home : title

        }))
    }, [translatedUrls, path])

    return (
        <Location>
            {({ navigate, location }) => (
                <div>
                    <Helmet>
                        <title>{type === 'page' ? `${title} – ${ac_strings.site_title}` : title}</title>
                        <meta name="description" content={description} />
                        {tags && tags.length ? tags.map((t: INavItem) => <meta property="article:tag" key={t.to} content={t.name} />) : null}
                        {categories && categories.length ? <meta property="article:section" content={categories[0].name} /> : null}
                        {date ? <meta property="article:published_time" content={date} /> : null}
                        <link rel="canonical" href={`${process.env.SITE_URL}/${path}`} />
                        <meta name="og:title" content={title} />
                        <meta property="og:site_name" content={ac_strings.site_title} />
                        <meta name="og:description" content={description} />
                        <meta property="og:type" content={mediaTypes[type] ? mediaTypes[type] : type} />
                        {authors ? (
                            authors.map((a: INavItem, k: number) => <meta key={k} property="book:author" content={`${process.env.SITE_URL}/${ac_strings.slug_ac_author}/${a.to}`} />)
                        ) : null}
                        {imageUrl ? [
                            (<meta key={1} property="og:image" content={imageUrl} />),
                            (<meta key={2} name="twitter:image" content={imageUrl} />),
                            (<meta key={3} property="og:image:secure_url" content={imageUrl} />),
                            (<meta key={4} property="og:image:width" content="800" />),
                            (<meta key={5} property="og:image:height" content="400" />),
                            (<meta key={7} property="og:image:alt" content={title} />),

                            (<meta key={9} name="twitter:image" content={imageUrl} />)
                        ] : null}
                        {translatedUrls ? (translatedUrls.map(url => {
                            if (process.env.LANG_CODE === url.lang) {
                                let checkedUrl = url.slug
                                if (!url.slug.startsWith('http')) {
                                    checkedUrl = `${process.env.SITE_URL}${checkedUrl}`
                                } return <link rel="canonical" key={url.lang} href={checkedUrl} />
                            } else {
                                return <link rel="alternate" key={url.lang} href={url.slug} />
                            }

                        })) : null}
                        <meta name="twitter:card" content="summary" />
                        <meta name="twitter:title" content={title} />
                        <meta name="twitter:description" content={description} />
                    </Helmet>

                </div>
            )}
        </Location>
    )
}

export default MetaTag