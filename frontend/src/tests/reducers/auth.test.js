import authReducer from "../../reducers/auth";

let defaultState, testData;

beforeEach(() => {
    defaultState = {
        uname: undefined,
        uid: undefined
    };
    testData = {
        uname: 'User',
        uid: 1
    };
});

test('Should set auth with default state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('Should set user on authReducer', () => {
    const action = {
        type: 'SET_USER',
        ...testData
    }
    const state = authReducer(defaultState, action);
    expect(state).toEqual(testData);
});

test('Should login user on authReducer', () => {
    const action = {
        type: 'LOGIN',
        ...testData
    }
    const state = authReducer(defaultState, action);
    expect(state).toEqual(testData);
});

test('Should register user on authReducer', () => {
    const action = {
        type: 'REGISTER',
        ...testData
    }
    const state = authReducer(defaultState, action);
    expect(state).toEqual(testData);
});

test('Should logout user on authReducer', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer(testData, action);
    expect(state).toEqual(defaultState);
});