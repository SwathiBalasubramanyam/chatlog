import csrfFetch from "./csrf"

export const RECEIVE_MESSAGES = "messages/RECEIVE_MESSAGES"
export const RECEIVE_MESSAGE = "messages/RECEIVE_MESSAGE"


export const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message: message
    }
}

export const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages: messages
    }
}

export const getChannelMessages = (state) => {
    return state.messages ? state.messages : {};
}

export const createMessage = (channelId, message) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/channels/${channelId}/messages`, {
            method: "POST",
            body: JSON.stringify(message)
        })
        const data = await res.json();
        dispatch(receiveMessage(data.message))
        return data;
    }
}

export const fetchMessages = (channelId) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/channels/${channelId}/messages`)
        const data = await res.json();
        dispatch(receiveMessages(data))
        return data;
    }
}

const messagesReducer = (state={}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_MESSAGE:
            nextState[action.message.id] = action.message
            return nextState;
        case RECEIVE_MESSAGES:
            nextState = action.messages;
            return nextState;
        default:
            return state;
    }
}

export default messagesReducer;