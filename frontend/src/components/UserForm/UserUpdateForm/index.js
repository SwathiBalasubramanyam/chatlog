import React, { useState } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import FormError from '../FormError';
import "./UserUpdateForm.css";
import * as modalActions from "../../../store/modal";
import { unwrapResult } from '@reduxjs/toolkit'

function UpdateUserForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.currentUser);
    const [user, setUser] = useState(sessionUser);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(sessionActions.updateUser(user))
            .then(unwrapResult)
            .then(() => {
                dispatch(modalActions.closeModal())
            })
            .catch(async(res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
    }

    return (
        <form className="user-update-form" onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <FormError error={error}/>)}
            </ul>
            <input type="text" value={user.email} placeholder='Email'
                onChange={(e) => setUser({...user, email: e.target.value})} required/>

            <input type="text" value={user.fullName || ""} placeholder='Full Name'
                onChange={(e) => setUser({...user, fullName: e.target.value})}/>

            <input type="text" value={user.displayName || ""} placeholder='Display Name'
                onChange={(e) => setUser({...user, displayName: e.target.value})}/>

            <input type="text" value={user.aboutMe || ""} placeholder='About Me'
                onChange={(e) => setUser({...user, aboutMe: e.target.value})}/>

            <input type="text" value={user.namePronunciation || ""} placeholder='Name Pronunciation'
                onChange={(e) => setUser({...user, namePronunciation: e.target.value})}/>
            
            <button className="user-update-form-submit" type="submit">Update Profile</button>
        </form>
    );
}

export default UpdateUserForm;