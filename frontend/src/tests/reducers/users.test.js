import usersReducer from "../../reducers/users";

test('Should set users reducer with default state', () => {
    const state = usersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('Should set users on users reducer ', () => {
    const users = ['admin', '1']
    const action = { 
        type: 'SET_USERS',
        users
    }
    const state = usersReducer(undefined, action);
    expect(state).toEqual(users);
});