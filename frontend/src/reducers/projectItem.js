const projectItemReducerDefaultState = {
    project: {},
    bugs: []
}

export default (state = projectItemReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PROJECT':
            return {
                ...state,
                project: action.project,
                bugs: action.bugs
            }

        case 'NEW_BUG':
            return {
                ...state,
                bugs: [
                    ...state.bugs,
                    action.bug
                ]
            }

        case 'EDIT_PROJECT':
            return {
                ...state,
                project: action.project
            };

        default:
            return state;
    };
};