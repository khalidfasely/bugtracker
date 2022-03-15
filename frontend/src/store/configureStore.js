import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import projectsReducer from '../reducers/projects';
import projectItemReducer from '../reducers/projectItem';
import bugItemReducer from '../reducers/bugItem';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            projects: projectsReducer,
            projectItem: projectItemReducer,
            bugItem: bugItemReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}