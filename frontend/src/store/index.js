import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import workspaceReducer from './workspaces';
import workspaceMemberReducers from './workspaceMembers';
import channelReducers from './channels';
import channelMemberReducers from './channelMembers';
import ui from './ui';

const rootReducer = combineReducers({
    session: sessionReducer,
    workspaces: workspaceReducer,
    channels: channelReducers,
    workspaceMembers: workspaceMemberReducers,
    channelMembers: channelMemberReducers,
    ui: ui
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;