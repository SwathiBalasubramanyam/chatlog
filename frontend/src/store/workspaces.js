import csrfFetch from "./csrf"
import * as sessionActions from "./session";

export const RECEIVE_WORKSPACES = "workspaces/RECEIVE_WORKSPACES"
export const RECEIVE_WORKSPACE = "workspace/RECEIVE_WORKSPACE"

export const receiveWorkspaces = (workspaces) => {
    return {
        type: RECEIVE_WORKSPACES,
        workspaces: workspaces
    }
}

export const receiveWorkspace = (workspace) => {
    return {
        type: RECEIVE_WORKSPACE,
        workspace: workspace
    }
}

// selectors to avoid re-renders ??
export const getWorkspaces = () => (state) => {
    return state?.workspaces ? Object.values(state.workspaces) : []
}

export const fetchWorkspaces = () => {
    return async(dispatch) => {
        const res = await csrfFetch("/api/workspaces");
        const data = await res.json();
        dispatch(receiveWorkspaces(data));
        return data
    }
}

export const createWorkspace = (workspace) => {
    return async(dispatch) => {
        const res = await csrfFetch("/api/workspaces", {
            method: "POST",
            body: JSON.stringify(workspace)
        })
        const data = await res.json();
        dispatch(receiveWorkspace(data.workspace));
        dispatch(sessionActions.setCurrentworkspace(data.workspace));
        return data;
    }
}

export const updateWorkspace = (workspace) => {
    return async(dispatch) => {
        const res = await csrfFetch(`/api/workspaces/${workspace.id}`, {
            method: "PATCH",
            body: JSON.stringify(workspace)
        })
        const data = await res.json();
        dispatch(receiveWorkspace(data.workspace));
        dispatch(sessionActions.setCurrentworkspace(data.workspace));
        return data
    }
}

const workspaceReducer = (state = {}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case RECEIVE_WORKSPACES:
            nextState = action.workspaces
            return nextState;
        case RECEIVE_WORKSPACE:
            nextState[action.workspace.id]= action.workspace
            return nextState;
        default:
            return state;
    }
}

export default workspaceReducer;


