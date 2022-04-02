import { setUser } from '../../actions/users';

test('Should set users action object with provided data', () => {
    const users = ['admin', '1'];
    const action = setUser(users);
    expect(action).toEqual({
        type: 'SET_USERS',
        users
    });
});

test('Should set users action object without data', () => {
    const action = setUser();
    expect(action).toEqual({
        type: 'SET_USERS'
    });
});