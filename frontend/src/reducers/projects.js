const projectsReducerDefaultState = {}

export default (state = projectsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.projects
            }

        default:
            return state;
    };
};