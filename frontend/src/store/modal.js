export const UPDATE_MODAL_STATE = "modals/UPDATE_MODAL_STATE"

export const updateModalState = () => {
    return {
        type: UPDATE_MODAL_STATE
    }
}

const modalReducers = (state = {modalOpen: false}, action) => {
    console.log(state);
    console.log(action);
    let nextState = {...state};
    switch (action.type) {
        case UPDATE_MODAL_STATE:
            nextState.modalOpen = !nextState.modalOpen;
            return nextState;
        default:
            return state;
    }
}

export default modalReducers;