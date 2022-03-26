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

        case 'EDIT_COMMENT':
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.cid) return action.comment;
                    return comment;
                })
            }

        case "DELETE_COMMENT":
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.cid)
            }

        default:
            return state;
    };
};