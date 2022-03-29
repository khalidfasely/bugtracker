import selectUsersApi from '../api/selectUsers';

export const setSelectUsers = (users) => ({
    type: 'SET_SELECT_USERS',
    users
});

export const startSetSelectUsers = (pid) => {
    return (dispatch) => {
        return selectUsersApi(pid).then(result => {
            dispatch(setSelectUsers(result.users));
            return result;
        });
    };
};