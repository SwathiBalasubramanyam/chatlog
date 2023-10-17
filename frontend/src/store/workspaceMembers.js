import csrfFetch from "./csrf";

export const RECEIVE_WORKSPACE_MEMBERS = "workspace_members/RECEIVE_WORKSPACE_MEMBERS"
export const RECEIVE_WORKSPACE_MEMBER = "workspace_members/RECEIVE_WORKSPACE_MEMBER"

export const receiveWorkspaceMembers = (workspaceMembers) => {
    return {
        type: RECEIVE_WORKSPACE_MEMBERS,
        workspaceMembers: workspaceMembers
    }
}

export const receiveWorkspaceMember = (workspaceMember) => {
    return {
        type: RECEIVE_WORKSPACE_MEMBER,
        workspaceMember: workspaceMember
    }
}

export const getWorkspaceMems = (state) => {
    return state.workspaceMembers ? state.workspaceMembers : {}
}

export const createWorkspaceMember = (workspaceMember) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/workspaces/${workspaceMember.workspaceId}/workspace_members`, {
            method: "POST",
            body: JSON.stringify({workspaceMember: workspaceMember})
        })
        const data = await res.json()
        dispatch(receiveWorkspaceMember(data.workspaceMember))
        return data
    }
}

export const updateWorkspaceMember = (workspaceId, workspaceMember) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/workspaces/${workspaceId}/workspace_members/${workspaceMember.id}`, {
            method: "PATCH",
            body: JSON.stringify(workspaceMember)
        })
        const data = await res.json()
        dispatch(receiveWorkspaceMember(data.workspaceMember))
        return data
    }
}

export const fetchWorkspaceMembers = (workspaceId) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/workspaces/${workspaceId}/workspace_members`)
        const data = await res.json()
        dispatch(receiveWorkspaceMembers(data))
        return data
    }
}

const workspaceMemberReducers = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_WORKSPACE_MEMBER:
            nextState[action.workspaceMember.id] = action.workspaceMember
            return nextState;
        case RECEIVE_WORKSPACE_MEMBERS:
            nextState = action.workspaceMembers;
            return nextState;
        default:
            return state;
    }
}

export default workspaceMemberReducers;