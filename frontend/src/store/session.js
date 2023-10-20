import csrfFetch from "./csrf";

export const SET_CURRENT_USER = "sessions/SET_CURRENT_USER"
export const SET_CURRENT_WORKSPACE = "sessions/SET_CURRENT_WORKSPACE"
export const SET_CURRENT_CHANNEL = "sessions/SET_CURRENT_CHANNEL"

export const setCurrentUser = (user=null) => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
    return {
        type: SET_CURRENT_USER,
        user: user
    }
}

export const setCurrentworkspace = (workspace=null) => {
    if (workspace) sessionStorage.setItem("currentWorkspace", JSON.stringify(workspace));
    else sessionStorage.removeItem("currentWorkspace");
    return {
        type: SET_CURRENT_WORKSPACE,
        workspace: workspace
    }
}

export const setCurrentChannel = (channel=null) => {
    if (channel) sessionStorage.setItem("currentChannel", JSON.stringify(channel));
    else sessionStorage.removeItem("currentChannel");
    return {
        type: SET_CURRENT_CHANNEL,
        channel: channel
    }
}

export const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

export const login = (email, password) => {
    return async(dispatch) => {
        const res = await csrfFetch('/api/session', {
            method: "POST",
            body: JSON.stringify({email: email, password: password})
        })
        const data = await res.json();
        dispatch(setCurrentUser(data.user));  
        return res;
    }
}

export const signup = (email, password) => {
    return async(dispatch) => {
        const response = await csrfFetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        dispatch(setCurrentUser(data.user));
        return response;
    }
}

export const updateUser = (userObj) => {
    return async(dispatch) => {
        const response = await csrfFetch(`/api/users/${userObj.id}`, {
            method: 'PATCH',
            body: JSON.stringify({user: userObj}),
            headers: {
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        dispatch(setCurrentUser(data.user));
        return data;
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(setCurrentChannel());
        dispatch(setCurrentworkspace());
        dispatch(setCurrentUser());
        csrfFetch('/api/session', {method: 'DELETE'})
    }
}

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    dispatch(setCurrentUser(data.user));
    return response;
};

const sessionReducer = (state = 
    {currentUser: JSON.parse(sessionStorage.getItem("currentUser")), 
    currentWorkspace: JSON.parse(sessionStorage.getItem("currentWorkspace")),
    currentChannel: JSON.parse(sessionStorage.getItem("currentChannel"))}, action)=> {

    let nextState = {...state}
    switch (action.type) {
        case SET_CURRENT_USER:
            nextState.currentUser = action.user;
            return nextState;
        case SET_CURRENT_WORKSPACE:
            nextState.currentWorkspace = action.workspace;
            return nextState;
        case SET_CURRENT_CHANNEL:
            nextState.currentChannel = action.channel;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;