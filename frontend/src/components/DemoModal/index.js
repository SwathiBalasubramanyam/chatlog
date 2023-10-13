import { useDispatch } from "react-redux";
import * as sessionActions from "./../../store/session";
import "./DemoModal.css";
import { FiX } from "react-icons/fi";

const DemoModal = ({closeModal}) => {
    const dispatch = useDispatch();

    const logDemo1 = () => {
        closeModal();
        console.log("what happens after you closemodal");
        debugger;
        dispatch(sessionActions.login("demo1@chatlog.com", "chatlog"))
        
    }

    const logDemo2 = () => {
        closeModal();
        dispatch(sessionActions.login("demo2@chatlog.com", "chatlog"))
    }

    return(
        <div className="demo-modal-background" onClick={closeModal}>
            <div className="demo-modal-foreground" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <h4>Welcome to ChatLog !!</h4>
                    <button onClick={closeModal}><FiX/></button>
                </div>
                <p>Please follow the below instructions carefully to signin as two different users and experience live chat.</p>
                <ul className="modal-instructions">
                    <li>Open a new incognito window and click on <strong>"TRY A DEMO"</strong> button on top right or a similar button anywhere on the page.</li><br></br>
                    <li>A similar modal will appear, click on <strong>"Signin as demo user 2"</strong></li><br></br>
                    <li>On this window, click on <strong>"Signin as demo user 1"</strong></li><br></br>
                    <li>You now have two different sessions with user1 and user2 logged in. Explore the site using these two user sessions.</li><br></br>
                </ul>
                <div className="modal-signin-btns">

                    <button className="modal-signin-cta" onClick={logDemo1}>Sign in as demo user 1</button>
                    <button className="modal-signin-cta" onClick={logDemo2}>Sign in as demo user 2</button>
                </div>
            </div>
        </div>
    )
}

export default DemoModal;