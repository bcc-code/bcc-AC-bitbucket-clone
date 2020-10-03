import React from 'react'
import MetaTag from '@/components/Meta'
import Content from '@/components/Content'
import { PostH1 } from '@/components/Headers'


import { INavItem } from '@/types'

const Glossary: React.FC<IGlossaryProps> = ({ pageContext, path }) => {

    const { title, content, slug, breadcrumb } = pageContext
    if (title) {
        return (
            <div className="relativeh-full pt-4 max-w-tablet m-auto px-4">
                <MetaTag
                    path={path}
                    title={title}
                    type="article"
                    translatedUrls={[]}
                    breadcrumb={breadcrumb}
                />
                <PostH1 title={title} />
                <div className="border-b w-1/6 my-8 border-d4gray"></div>
                <Content content={content} title={title} slug={path} />
            </div>
        )
    } else {
        return null
    }
}

export default Glossary
interface IGlossaryProps {
    path: string
    pageContext: {
        title: string
        slug: string
        content: string
        breadcrumb: INavItem[]
    }
}