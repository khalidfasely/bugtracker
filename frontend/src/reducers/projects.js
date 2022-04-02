const projectsReducerDefaultState = {
    projects: []
}

export default (state = projectsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.projects
            };
        
        case 'NEW_PROJECT':
            return {
                ...state,
                projects: [
                    action.project,
                    ...state.projects
                ]
            };
        
        case 'DELETE_PROJECT':
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.pid)
            };

        default:
            return state;
    };
};