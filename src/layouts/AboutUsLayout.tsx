import React from 'react';
import StickyBox from "react-sticky-box";
import { PageSectionHeader } from '@/components/Headers'
import { SideNavItem } from '@/components/Button'
import Icon from '@/components/Icons/Icon'
const imageUrl = 'https://media.activechristianity.org/2019/08/ac-home-hero-bg.jpg'
import ScrollSectionChild, { IScrollSectionChildProps } from '@/components/ScrollSection/Section'
import RenderFeaturedPost, { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import CustomizedPageComponent from '@/components/ScrollSection/CustomizedPageComponent'
import {
    ScrollingProvider,
    useScrollSections,
    useScrollSection,
    Section,
} from 'react-scroll-section';

interface IProps {
    sections: IScrollSectionChildProps[]
    title: string
}



const App: React.FC<IProps> = ({ sections, title }) => {
    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    const links = sections.map(item => ({ name: item.title, id: item.slug, ...useScrollSection(item.slug) }))
    console.log(links)
    return (

        <div className="flex">
            <div className="hidden sm:flex flex-col items-center bg-d4slate-lighter " style={{ width: "400px", minHeight: "80vh" }}>
                <StickyBox offsetTop={150} >
                    {links.map(({ id, onClick, selected, name }) => (
                        < SideNavItem key={id} onClick={onClick} selected={selected}>
                            {name}
                        </ SideNavItem>
                    ))}
                </StickyBox>

            </div>
            <div className="max-w-sm relative">

                <Section id={"about-us"} className={`pb-16 relative`} >
                    <div
                        className="background-image w-full flex flex-col justify-center px-4 py-12"
                        style={{
                            top: "50px",
                            background: `url(${imageUrl}) center center no-repeat`,
                            backgroundSize: "cover",
                            zIndex: 200,
                            /*    minHeight: "250px", */
                            /*  backgroundPositionY: "30%", */
                        }}
                    >
                        <h1 className="sm:text-lg lg:text-4xl xl:text-5xl font-bold mb-4" >{title}</h1>
                    </div>

                </Section>
                <div className="sm:hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-4 pb-4">
                        {links.map(({ id, onClick, selected, name }) => (
                            <div className="border rounded p-2 font-roboto font-semibold text-d4slate-light" key={id} onClick={onClick} selected={selected}>
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
                {sections.map((item, k) =>
                    (
                        <Section id={item.slug}>
                            <div className={`px-4 ${k % 2 == 0 ? 'bg-d4slate-lighter' : ''}`}>
                                <h2 className="text-2xl py-6 font-roboto">{item.title}</h2>
                                <CustomizedPageComponent
                                    {...item.childPage}
                                />
                            </div>
                        </Section>
                        /*    k % 2 == 0  <ScrollSectionChild key={k} {...item} background={k % 2 == 0} /> */
                    )
                )}
                <div className="hiddem sm:flex flex-col fixed bottom-0 right-0 mx-3 py-2 mb-16 bg-white shadow rounded-full text-white text-sm" style={{ zIndex: 60 }}>

                    <button className="px-2 py-1" onClick={scrollToTop}>
                        <Icon
                            name="Publish"
                            color="secondary"
                            size="6"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App