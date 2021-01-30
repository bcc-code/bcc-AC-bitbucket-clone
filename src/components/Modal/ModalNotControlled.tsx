import * as React from 'react'

import ReactModal from 'react-modal'
import ac_strings from '@/strings/ac_strings.js'

interface IModal {
    isOpen: boolean
    closeModal: () => void
    content: JSX.Element
}

const Modal: React.FC<IModal> = ({ content, closeModal, isOpen }) => {


    const handleClose = () => {
        closeModal()
    }

    const customStyles = {
        overlay: {
            background: `rgba(255,255,255,0.9)`,
            zIndex: 5000
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className="flex flex-col bg-white text-grey-500 rounded-lg shadow-md relative w-5/6 sm:w-3/4 md:w-mobile max-h-full overflow-scroll"
            overlayClassName="absolute top-0 left-0 h-screen w-screen p-2 flex justify-center items-center"
            contentLabel={ac_strings["ebook_preview"]}
            style={customStyles}
        >

            {content}

        </ReactModal>
    )
}

export default Modal
