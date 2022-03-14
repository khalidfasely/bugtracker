const projectItemReducerDefaultState = {}

export default (state = projectItemReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PROJECT':
            return {
                ...state,
                project: action.project
            }

        default:
            return state;
    };
};