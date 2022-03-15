const bugItemReducerDefaultState = {}

export default (state = bugItemReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BUG':
            return {
                ...state,
                bug: action.bug
            }

        default:
            return state;
    };
};