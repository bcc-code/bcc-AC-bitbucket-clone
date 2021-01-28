import * as React from 'react'

const Series: React.FC<IDummy> = (props) => {
    console.log(props)
    return (
        <div>
            {props.pageContext.title}
        </div>
    )
}

export default Series

interface IDummy {
    path: string

    pageContext: {
        title: string

    }
}
