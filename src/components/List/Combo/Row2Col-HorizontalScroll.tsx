import * as React from "react"
import PostRow2Col from '@/components/List/PostRow2Col'
import TopImgHorizontalScrollRow from '@/components/HorizontalScroll/TopImgRow'
import { PageSectionHeaderUpperCaseGray } from '@/components/Headers'

import { IPostItem } from '@/types'

const Row2ColAndHorizontalScroll: React.FC<{ title: string, posts: IPostItem[] }> = ({ title, posts }) => {
    return (
        <>
            <PageSectionHeaderUpperCaseGray title={title} />
            <div className="hidden sm:block">
                <PostRow2Col posts={posts} />
            </div>
            <div className="sm:hidden -ml-4 -mr-4 py-6">
                <TopImgHorizontalScrollRow posts={posts} />
            </div>
        </>
    )
}

export default Row2ColAndHorizontalScroll