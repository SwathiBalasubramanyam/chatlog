import csrfFetch from "./csrf";

export const RECEIVE_CHANNELS = "channels/RECEIVE_CHANNELS"

export const receiveChannels = (channels) => {
    return {
        type: RECEIVE_CHANNELS,
        channels: channels
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

const channelReducers = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_CHANNELS:
            nextState = action.channels;
            return nextState;
        default:
            return state;
    }
}

export default channelReducers;