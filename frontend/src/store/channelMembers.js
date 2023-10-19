import csrfFetch from "./csrf";
import * as workspaceActions from "./workspaces";
import * as sessionActions from "./session";

export const createChannelMembers = (channelId, memberIds) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/channels/${channelId}/channel_members`, {
            method: 'POST',
            body: JSON.stringify({memberIds: memberIds})
        })
        const data = await res.json();
        dispatch(workspaceActions.receiveWorkspace(data));
        dispatch(sessionActions.setCurrentChannel(data.channels[channelId]));
        return data;
    }
}
