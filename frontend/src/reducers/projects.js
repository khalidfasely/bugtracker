const projectsReducerDefaultState = {}

export default (state = projectsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.projects
            }
        
        case 'NEW_PROJECT':
            return {
                ...state,
                projects: [
                    action.project,
                    ...state.projects
                ]
            }

        default:
            return state;
    };
};