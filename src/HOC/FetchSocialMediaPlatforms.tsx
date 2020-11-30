import React from 'react'
import { Link, StaticQuery, graphql } from "gatsby";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/Icons/SocialMedia'
import { GooglePodcastIcon, SpotifyIcon, ApplePodcastIcon } from '@/components/Icons/Podcast'
interface QProps {
    podcast?: boolean
    render: (data: { platforms: ISMPlatform[] }) => JSX.Element
}

interface ISMPlatform {
    name: string
    url: string
    icon: JSX.Element
}
export const FetchSocialPlatformUrls: React.FC<QProps> = ({ render, podcast }) => {
    return (
        <StaticQuery
            query={query}
            render={(data: IFooterData) => {
                const { social_facebook, social_instagram, social_youtube, social_rss, social_itunes, social_spotify } = data.acNodeSetting
                const platforms = podcast !== true ? [
                    {
                        url: social_facebook,
                        icon: <FacebookIcon />,
                        name: 'Facebook'
                    },
                    {
                        url: social_instagram,
                        icon: <InstagramIcon />,
                        name: 'Instagram'
                    },
                    {
                        url: social_youtube,
                        icon: <YoutubeIcon />,
                        name: 'Youtube'
                    }
                ] : [
                        {
                            icon: <ApplePodcastIcon customSize={36} className="w-6 h-6" />,
                            name: 'iTunes',
                            url: social_itunes
                        }, {
                            icon: <SpotifyIcon customSize={36} className="w-6 h-6" />,
                            name: 'Spotify',
                            url: social_spotify
                        },
                        {
                            icon: <YoutubeIcon customSize={36} className="w-6 h-6" />,
                            name: 'Youtube',
                            url: social_youtube
                        },
                        {
                            icon: <GooglePodcastIcon customSize={36} className="w-6 h-6" />,
                            name: 'RSS',
                            url: social_rss
                        },
                    ]


                return render({ platforms })
            }} />
    )
}

export default FetchSocialPlatformUrls

const query = graphql`
    query GetSocialMediaPlatforms{
        acNodeSetting {
            social_rss
            social_itunes
            social_youtube
            social_spotify
            social_facebook
            social_instagram    
        }
    }
`

interface IFooterData {
    acNodeSetting: {
        social_rss: string
        social_itunes: string
        social_youtube: string
        social_spotify: string
        social_facebook: string
        social_instagram: string
    }

}