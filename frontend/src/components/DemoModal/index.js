import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { FiX } from "react-icons/fi";
import { closeModal } from '../../store/modal';
import "./DemoModal.css";


const DemoModal = () => {
    const dispatch = useDispatch();

    const logDemo1 = () => {
        dispatch(closeModal());
        dispatch(sessionActions.login("demo1@chatlog.com", "chatlog"))
        
    }

    const logDemo2 = () => {
        dispatch(closeModal());
        dispatch(sessionActions.login("demo2@chatlog.com", "chatlog"))
    }

    return(
        <div className="demo-modal-body-container">
            <p>Please follow the below instructions carefully to signin as two different users and experience live chat.</p>
            <ul className="modal-instructions">
                <li>Open a <strong>new incognito window</strong> and click on <strong>"TRY A DEMO"</strong> button on top right or a similar button anywhere on the page.</li><br></br>
                <li>A similar modal will appear, click on <strong>"Signin as demo user 2"</strong></li><br></br>
                <li>On this window, click on <strong>"Signin as demo user 1"</strong></li><br></br>
                <li>You now have two different sessions with user1 and user2 logged in. Explore the site using these two user sessions.</li><br></br>
            </ul>
            <div className="modal-signin-btns">
                <button className="modal-signin-cta" onClick={logDemo1}>Sign in as demo user 1</button>
                <button className="modal-signin-cta" onClick={logDemo2}>Sign in as demo user 2</button>
            </div>
        </div>
    )
}

export default DemoModal;