const authReducerDefaultState = {
    uname: undefined,
    uid: undefined
}

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                uname: action.uname,
                uid: action.uid
            }
        case 'LOGIN':
            return {
                ...state,
                uname: action.uname,
                uid: action.uid
            };

        case 'REGISTER':
            return {
                ...state,
                uname: action.uname,
                uid: action.uid
            };

        case 'LOGOUT':
            return {
                ...state,
                uname: undefined,
                uid: undefined
            };

        default:
            return state;
    };
};