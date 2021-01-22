import React from 'react'
import './horizontal-scroll.css';
import shortid from 'shortid'

interface IXScrollItem {
    items: JSX.Element[]
}
const FeatureSection: React.FC<IXScrollItem> = ({ items }) => {
    return (
        <div className="scroll-snap-x-container overflow-scroll mb-4 sm:hidden w-full">
            {items.map((c, i) => {

                return (
                    <div className="scroll-snap-x-child w-8/12 min-w-8/12 ml-4" key={shortid()}>
                        {c}
                    </div>
                )

            })}
            <div className="min-w-4">

            </div>
        </div>

    )
}

export default FeatureSection