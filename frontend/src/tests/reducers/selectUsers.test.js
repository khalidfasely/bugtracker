import selectUsersReducer from "../../reducers/selectUsers";

test('Should set selectUsers reducer with default state', () => {
    const state = selectUsersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Should set selected users on selectUsers reducer ', () => {
    const users = ['admin', '1']
    const action = { 
        type: 'SET_SELECT_USERS',
        users
    }
    const state = selectUsersReducer(undefined, action);
    expect(state).toEqual(users);
});