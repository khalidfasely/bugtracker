const projectItemReducerDefaultState = {}

export default (state = projectItemReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PROJECT':
            return {
                ...state,
                project: action.project,
                bugs: action.bugs
            }

        default:
            return state;
    };
};