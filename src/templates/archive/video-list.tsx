
import React from 'react'
import LazyLoad from '@/components/LazyLoad';
import { navigate } from "gatsby"
import { IPaginate, INavItem, IPostItem } from "@/types"
import { normalizePostRes } from '@/helpers'
import VideoItem from '@/components/PostItem/TopImg'
import Pagination from '@/components/Pagination'
import { LayoutH1Wide } from '@/components/Headers'
import { fetchLocalPostsFromSlugs, } from '@/helpers/fetchLocalData'

interface ITaxonomyPageProps {

    pageContext: {
        slug: string
        title: string
        description?: string
        posts: string[],
        paginate: IPaginate
        breadcrumb: INavItem[]
    }
    path: string
}
const PostList: React.FC<ITaxonomyPageProps> = ({ pageContext, path }) => {

    const { title, paginate, posts } = pageContext

    const [postList, setPostList] = React.useState<IPostItem[]>([])
    React.useEffect(() => {
        fetchLocalPostsFromSlugs(posts).then(res => {
            setPostList(res)
        })
    }, posts)

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }
    return (
        <div className="standard-max-w-px" >
            <LayoutH1Wide title={title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4">
                {postList.map(post => {
                    return (

                        <div className="div-content pb-8">
                            <LazyLoad>
                                <VideoItem key={post.slug} {...post} />
                            </LazyLoad>
                        </div>
                    )

                })}
            </div>

            {
                paginate && (
                    <div className="flex justify-item py-4">
                        <Pagination
                            currentPage={paginate.currentPage}
                            totalPages={paginate.totalPages}
                            onChange={(activePage: number) => {
                                const fullPath = activePage > 1 ? `${path}/${activePage}` : path
                                scrollToTop()
                                navigate(fullPath)
                            }}
                        />
                    </div>
                )
            }
        </div>

    )
}

export default PostList