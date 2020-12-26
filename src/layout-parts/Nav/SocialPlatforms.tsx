import React from 'react'
import FetchSocialMediaPlatforms from '@/HOC/FetchSocialMediaPlatforms'

interface ISMPlatform {
    name: string
    url: string
    icon: JSX.Element
}

const ColLink: React.FC<{ icon: JSX.Element, name: string, url: string }> = ({ icon, name, url }) => {

    return (
        <a href={url} target="_blank" className="flex w-full items-center bg-white mb-4 rounded-md p-4">
            <div className="px-2">
                {icon}
            </div>
            <div className="ml-4">
                {name}
            </div>
        </a>
    )
}

const SocialPlatforms: React.FC<{ col?: boolean }> = ({ col }) => {


    return (
        <FetchSocialMediaPlatforms

            render={({ platforms }) => {
                return !col ? (
                    <div className="flex justify-around w-full items-center">
                        {platforms.map((item, i) => {
                            return (
                                <a href={item.url} target="_blank" key={i}>
                                    {item.icon}
                                </a>
                            )
                        })}
                    </div>
                ) : (
                        <div className="flex flex-col mt-8">
                            {platforms.map((item, i) => {
                                return (
                                    <ColLink
                                        {...item}
                                        key={i}
                                    />
                                )
                            })}

                        </div>

                    )
            }}

        />



    )
}

export default SocialPlatforms
