import * as React from "react"
import { ITopicPostSlugs } from '@/types'
import Placeholder from '@/layout-parts/Loader/MainpagePlaceholder'
interface IFetchPost {
    topics: string[]
    layout: "row" | "list",
    render: (data: { topicPostItems: ITopicPostSlugs[] }) => JSX.Element
}
const FetchPosts: React.FC<IFetchPost> = ({ topics, render }) => {
    const [topicPostItems, setTopicPostItems] = React.useState<ITopicPostSlugs[]>([])

    React.useEffect(() => {
        Promise.all(topics
            .map(slug => fetch(`/page-data/${slug}/page-data.json`)
                .then(res => res.json())
                .then(topicRes => {
                    console.log(topicRes)
                    const data = topicRes.result.pageContext
                    const topic = {
                        id: data.id,
                        name: data.title,
                        slug,
                        posts: data.posts
                    }

                    return topic
                })

            ))
            .then(res => {
                const toAdd: ITopicPostSlugs[] = []
                res.forEach(item => {
                    if (item) {
                        toAdd.push(item)
                    }
                })
                setTopicPostItems(toAdd)
            })
            .catch(error => {
                console.log(error)
            })
    }, [topics])

    return (
        <Placeholder
            loading={topicPostItems.length === 0}
        >
            {render({ topicPostItems })}
        </Placeholder>
    )

}

export default FetchPosts