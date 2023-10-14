import React from 'react';
import { closeModal } from '../../store/modal';
// import LoginForm from '../SessionForm/LoginForm';
// import SignupForm from '../SessionForm/SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import './Modal.css';
import { FiX } from "react-icons/fi";
import DemoModal from '../DemoModal';

function Modal() {
    const dispatch = useDispatch();
    const modal = useSelector( state => state.ui.modal );

    if (!modal) {
        return null;
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(closeModal())
    }

    let component;
    switch(modal) {
        case 'demo':
            component = <DemoModal />;
            break;
        default:
            return null;
    }

    return (
        <>
            <div className='modal-background' onClick={handleClick}></div>
            <div className='modal-foreground'>
                <header className='modal-header'>
                    <h3>Welcome to ChatLog !!</h3>
                    <FiX className="close-button" onClick={handleClick}/>
                </header>
                <div className='modal-body' onClick={(e) => e.stopPropagation()}>
                    { component }
                </div>
            </div>
        </>
    )
}

export default Modal;