import setUserApi from '../api/users';

export const setUser = (users) => ({
    type: 'SET_USERS',
    users
});

export const startSetUsers = () => {
    return (dispatch) => {
        return setUserApi().then((result) => {
            dispatch(setUser(result.users));
            return result;
        });
    };
};