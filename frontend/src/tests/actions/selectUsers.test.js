import { setSelectUsers } from "../../actions/selectUsers";

test('Should set select users action object with provided data', () => {
    const users = ['admin', '1'];
    const action = setSelectUsers(users);
    expect(action).toEqual({
        type: 'SET_SELECT_USERS',
        users
    });
});

test('Should set select users action object without data', () => {
    const action = setSelectUsers();
    expect(action).toEqual({
        type: 'SET_SELECT_USERS'
    });
});