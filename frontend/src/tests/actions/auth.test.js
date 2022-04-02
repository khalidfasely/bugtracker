import { setUser, register, login, logout } from "../../actions/auth";

test('Should set user action object with provided data', () => {
    const providedData = {
        uname: 'User',
        uid: 12
    };
    const action = setUser(providedData);
    expect(action).toEqual({
        type: 'SET_USER',
        ...providedData
    });
});

test('Should set user action object without data', () => {
    const action = setUser();
    expect(action).toEqual({
        type: 'SET_USER'
    });
});

test('Should set login action object with provided data', () => {
    const providedData = {
        uname: 'User',
        uid: 12
    };
    const action = login(providedData);
    expect(action).toEqual({
        type: 'LOGIN',
        ...providedData
    });
});

test('Should set login action object without data', () => {
    const action = login();
    expect(action).toEqual({
        type: 'LOGIN'
    });
});

test('Should set register action object with provided data', () => {
    const providedData = {
        uname: 'User',
        uid: 12
    };
    const action = register(providedData);
    expect(action).toEqual({
        type: 'REGISTER',
        ...providedData
    });
});

test('Should set register action object without data', () => {
    const action = register();
    expect(action).toEqual({
        type: 'REGISTER'
    });
});

test('Should set logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});