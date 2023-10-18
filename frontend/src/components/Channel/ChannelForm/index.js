import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormError from '../../UserForm/FormError';
import "./ChannelForm.css";
import * as modalActions from "../../../store/modal";
import * as channelActions from "../../../store/channels";

function ChannelForm({update=false}) {
    const dispatch = useDispatch();
    const sessionWorkspace = useSelector(state => state.session.currentWorkspace);
    const sessionChannel = useSelector(state => state.session.currentChannel);
    let oldChannel = {
        name: "",
        description: "",
        isChannel: true
    }

    if (update) {
        oldChannel = {...sessionChannel}
    }

    const [channel, setChannel] = useState(oldChannel);
    const [errors, setErrors] = useState([]);
    let thunkAction = channelActions.createChannel;
    let channelCta = "Create Channel";

    if(update){
        thunkAction = channelActions.updateChannel
        channelCta = "Update Channel";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        channel["isChannel"] = true;

        return dispatch(thunkAction(sessionWorkspace.id, channel))
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
            .then(() => {
                if(errors.length === 0) {
                    dispatch(modalActions.closeModal())
                }
            });
    }

    return (
        <form className="channel-form" onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <FormError error={error}/>)}
            </ul>

            <input type="text" value={channel.name} placeholder='Channel Name'
                onChange={(e) => setChannel({...channel, name: e.target.value})} required/>

            <input type="text" value={channel.description} placeholder='Channel Description'
                onChange={(e) => setChannel({...channel, description: e.target.value})}/>

            <button className="channel-form" type="submit">{channelCta}</button>
        </form>
    );
}

export default ChannelForm;