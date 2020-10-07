
import React from "react"
import Link from '@/components/CustomLink'
import { INavItem } from "@/types"
import Icon from '@/components/Icons/Icon'
import { PageSectionHeader } from '@/components/Headers'
import ac_strings from '@/strings/ac_strings.json'

export interface ITypeCount extends INavItem {
    count?: number
}
interface IByTaxonomies {
    types: ITypeCount[]
    title: string
    count?: number | string
    arrow?: boolean
    col?: number
    icon?: JSX.Element
}

const ByTaxonomies: React.FC<IByTaxonomies> = ({ types }) => {
    return (
        <div className="bg-d4athens py-4">
            <PageSectionHeader title={ac_strings.byCategories} />
            <div className="standard-max-w">
                <div className="flex flex-col sm:hidden">
                    {types.map(({ to, name, count }, key) => {
                        return (
                            <Link key={key} className="px-4 border-b w-full py-2 flex justify-between items-center pr-2" to={to}>
                                <span>{name}</span>
                                <Icon name="KeyboardArrowRight" size="6" color="slate-light" />
                            </Link>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default ByTaxonomies