const usersReducerDefaultState = []

export default (state = usersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return action.users
            //return [...action.users]

        default:
            return state;
    };
};