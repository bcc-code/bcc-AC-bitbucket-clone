import * as React from "react"
import { CloseIcon } from '@/components/Icons/MUI'

interface IButton {
    onClick?: () => void
    href?: string
    to?: string
}
const CloseButton: React.FC<IButton> = ({ onClick }) => (
    <button
        onClick={onClick}
        onKeyDown={onClick}
        className="w-5 h-5 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-800 rounded-full flex items-center justify-center">
        <CloseIcon customSize="3" />
    </button>
)

export default CloseButton