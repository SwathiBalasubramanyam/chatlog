import csrfFetch from "./csrf";

export const RECEIVE_CHANNELS = "channels/RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "channels/RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "channels/REMOVE_CHANNEL";

export const receiveChannels = (channels) => {
    return {
        type: RECEIVE_CHANNELS,
        channels: channels
    }
}

export const receiveChannel = (channel) => {
    return {
        type: RECEIVE_CHANNEL,
        channel: channel
    }
}

export const removeChannel = (channelId) => {
    return {
        type: REMOVE_CHANNEL,
        channelId: channelId
    }
}

export const fetchChannels = (workspaceId) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels`)
        const data = await res.json()
        dispatch(receiveChannels(data))
        return data
    }
}

export const createChannel = (workspaceId, channel) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels`, {
            method: "POST",
            body: JSON.stringify(channel)
        })
        const data = await res.json();
        dispatch(receiveChannel(data.channel));
        return data;
    }
}

export const updateChannel = (workspaceId, channel) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels/${channel.id}`, {
            method: "PATCH",
            body: JSON.stringify(channel)
        })
        const data = await res.json();
        dispatch(receiveChannel(data.channel));
        return data;
    }
}

export const deleteChannel = (workspaceId, channelId) => {
    return async(dispatch) => {
        await csrfFetch(`/api/workspaces/${workspaceId}/channels/${channelId}`, {
            method: "DELETE"
        })
        dispatch(removeChannel(channelId));
    }
}

const channelReducers = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_CHANNELS:
            nextState = action.channels;
            return nextState;
        case RECEIVE_CHANNEL:
            nextState[action.channel.id] = action.channel;
            return nextState;
        case REMOVE_CHANNEL:
            delete nextState[action.channelId];
            return nextState;
        default:
            return state;
    }
}

export default channelReducers;