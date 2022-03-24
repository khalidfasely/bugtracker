const bugItemReducerDefaultState = {}

export default (state = bugItemReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_BUG':
            return {
                ...state,
                bug: action.bug,
                comments: action.comments
            }

        case 'NEW_COMMENT':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    action.comment
                ]
            }

        default:
            return state;
    };
};