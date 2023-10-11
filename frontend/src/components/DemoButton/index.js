import { useState } from "react";
import DemoModal from "../DemoModal";
import "./DemoButton.css"

const DemoButton = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div>
            {showModal && <DemoModal closeModal={() => setShowModal(false)}></DemoModal>}
            <button className="try-demo-btn" onClick={() => setShowModal(true)}> TRY A DEMO </button>
        </div>
    )
}

export default DemoButton;