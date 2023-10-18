import { RECEIVE_CHANNEL } from "./channels"

const channelMemberReducers = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_CHANNEL:
            nextState = action.payload.channelMembers;
            return nextState;
        default:
            return state;
    }
}

export default channelMemberReducers;