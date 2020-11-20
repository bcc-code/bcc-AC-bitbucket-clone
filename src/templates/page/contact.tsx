import React from 'react'
import MetaTag from '@/components/Meta'
import FetchSocialMediaPlatform from '@/HOC/FetchSocialMediaPlatforms'
import TS from '@/strings'
import { LayoutH1 } from '@/components/Headers'
import { MobileMainWrapper } from '@/layout-parts/PostLayout/PostSections'

import ContactForm from '@/layout-parts/Form/Contact'

const ContactPage = () => {
    const imageUrl = 'https://media.activechristianity.org/2019/08/ac-home-hero-bg.jpg'
    const height = 150
    return (
        <div className="">
            <MetaTag title={TS.contact} type="page" breadcrumb={[]} />
            <Header
                className={`fixed transition-transform background-image w-full flex flex-col justify-center px-4 pb-12 sm:hidden`}
                imageUrl={imageUrl}
                style={{ top: "50px", height }}
            />
            <MobileMainWrapper height={height}>
                <ContactForm />
            </MobileMainWrapper>
            <div className="w-full hidden sm:flex justify-center p-12 bg-gray-200" >
                <div className="max-w-tablet m-auto bg-white rounded-xl overflow-hidden shadow-lg">
                    <Header
                        className={`hidden sm:block h-48 w-full px-4`}
                        imageUrl={imageUrl}
                        style={{}}
                    />

                    <div className="p-4">
                        <ContactForm />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContactPage
const Header: React.FC<{ className: string, style: any, imageUrl: string }> = ({ className, style, imageUrl }) => {

    return (

        <div
            className={className}
            style={{ top: "50px", background: `url(${imageUrl}) center center no-repeat`, backgroundSize: "cover", ...style }}
        >
            <LayoutH1 title={TS.contact} />

            <FetchSocialMediaPlatform

                render={({ platforms }) => {
                    return (
                        <div className="w-full flex text-xs sm:text-sm text-d4secondary opacity-75">
                            {platforms.map(item => {
                                return (
                                    <a href={item.url} target="_blank" className="bg-white rounded-xl p-2 mx-2 flex items-center">
                                        <div className="pr-2">{item.icon} </div><div>{item.name}</div>
                                    </a>
                                )
                            })}
                        </div>
                    )
                }}

            />


        </div>

    )
}