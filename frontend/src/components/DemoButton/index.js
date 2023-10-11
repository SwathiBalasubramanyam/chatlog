import { useState } from "react";
import DemoModal from "../DemoModal";
import "./DemoButton.css"

const DemoButton = () => {
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
        document.body.style.overflow = "auto";
    }

    const handleOpenModal = () => {
        setShowModal(true)
        document.body.style.overflow = "hidden";

    }

    return (
        <div>
            {showModal && <DemoModal closeModal={closeModal}></DemoModal>}
            <button className="try-demo-btn" onClick={handleOpenModal}> TRY A DEMO </button>
        </div>
    )
}

export default DemoButton;