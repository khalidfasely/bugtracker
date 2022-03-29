const selectUsersReducerDefaultState = [];

export default (state = selectUsersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_SELECT_USERS':
            return [...action.users]

        default:
            return state;
    };
};