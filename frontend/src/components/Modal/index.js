import React from 'react';
import { closeModal } from '../../store/modal';
import { useSelector, useDispatch } from 'react-redux';
import './Modal.css';
import { FiX } from "react-icons/fi";
import DemoModal from '../DemoModal';
import WorkspaceForm from "../WorkspacesPage/WorkspaceForm";
import UpdateUserForm from '../UserForm/UserUpdateForm';
import ChannelForm from '../Channel/ChannelForm';
import AddMemberForm from '../AddMemberForm';

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
        case 'createWorkspace':
            component = <WorkspaceForm />;
            break;
        case 'editWorkspace':
            component = <WorkspaceForm edit={true}/>;
            break;
        case 'updateUser':
            component = <UpdateUserForm/>;
            break;
        case 'createChannel':
            component = <ChannelForm/>;
            break;
        case 'updateChannel':
            component = <ChannelForm update={true}/>;
            break;
        case 'addMembers':
            component = <AddMemberForm/>;
            break;
        case 'createDirectMessage':
            component = <AddMemberForm directMessage={true}/>;
            break;
        default:
            return null;
    }

    const headers = {
        "demo": "Welcome to ChatLog !!",
        "createWorkspace": "Create a workspace",
        "editWorkspace": "Edit your workspace",
        "updateUser": "Update Profile",
        "createChannel": "Create a channel",
        "updateChannel": "Edit your channel",
        "addMembers": "Add Members to your channel",
        "createDirectMessage": "New Message"
    }

    return (
        <>
            <div className='modal-background' onClick={handleClick}></div>
            <div className='modal-foreground'>
                <header className='modal-header'>
                    <h3>{headers[modal]}</h3>
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