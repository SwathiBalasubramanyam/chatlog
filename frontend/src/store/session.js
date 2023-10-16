import csrfFetch from "./csrf"

export const SET_CURRENT_USER = "sessions/SET_CURRENT_USER"
export const SET_CURRENT_WORKSPACE = "sessions/SET_CURRENT_WORKSPACE"

export const setCurrentUser = (user) => {
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

export const logout = () => {
    return (dispatch) => {
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

const sessionReducer = (state = {currentUser: JSON.parse(sessionStorage.getItem("currentUser")), 
                                    currentWorkspace: JSON.parse(sessionStorage.getItem("currentWorkspace"))}, 
                                    action) => {
    let nextState = {...state}
    switch (action.type) {
        case SET_CURRENT_USER:
            nextState.currentUser = action.user;
            return nextState;
        case SET_CURRENT_WORKSPACE:
            console.log("whats acttion.workspace", action.workspace);
            nextState.currentWorkspace = action.workspace;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;