import * as React from 'react'
import { graphql } from "gatsby"
import { INavItem, IImage } from "@/types"
import MetaTag from '@/components/Meta'
import RenderFeaturedPost, { IPageCompTypes } from '@/components/ScrollSection/FeaturedItem'
import ac_strings from '@/strings/ac_strings.js'
import Link from '@/components/CustomLink'
import CustomizedPageComponent from '@/components/CustomizedPageComponent'
import { LayoutH1Wide } from '@/components/Headers'

const CustomizedPage: React.FC<ICustomizedPage> = ({ path, pageContext, data }) => {
    const { breadcrumb } = pageContext
    const { flexibleContent, title, slug } = data.ac.page
    const componentConfig: IPageCompTypes[] = JSON.parse(flexibleContent)

    return (
        <div>
            <MetaTag title={title} translatedUrls={[]} type="page" breadcrumb={breadcrumb} path={path} />
            <LayoutH1Wide title={title} />
            <CustomizedPageComponent items={componentConfig} slug={path} title={title} />
            <div className="w-full flex justify-center py-6">
                <Link to={`${ac_strings.slug_topic}/${slug}`} className="bg-ac-slate-dark px-4 py-2 rounded text-white text-lg">
                    More on this topic
                </Link>
            </div>

        </div>
    )
}

export default CustomizedPage


interface ICustomizedPage {
    path: string
    data: {
        ac: {
            page: {
                flexibleContent: string
                slug: string
                title: string
            }
        }
    }
    pageContext: {
        title: string
        breadcrumb: INavItem[]

    }
}


export const pageQuery = graphql`
    query getThemepage($id: ID) {
        ac {
            page(id: $id ) {
                title
                slug
                flexibleContent
            }
        }
    }
`