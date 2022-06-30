import bugFilter from "../../reducers/bugFilter";

let defaultState;

beforeEach(() => {
    defaultState = {
        text: '',
        sortBy: ''
    };
});

test('Should set bugFilter reducer with default state', () => {
    const state = bugFilter(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('Should set bugFilter reducer with text', () => {
    const action = { type: 'SET_TEXT', text: 'text' }
    const state = bugFilter(defaultState, action);
    expect(state).toEqual({ text: 'text', sortBy: '' });
});

test('Should set bugFilter reducer with default sort', () => {
    const action = { type: 'DEFAULT_SORT' }
    const state = bugFilter(defaultState, action);
    expect(state).toEqual({ text: '', sortBy: '' });
});

test('Should set bugFilter reducer with priority sort', () => {
    const action = { type: 'SORT_BY_PRIORITY' }
    const state = bugFilter(defaultState, action);
    expect(state).toEqual({ text: '', sortBy: 'priority' });
});

//test('Should set bug on bugItem reducer', () => {
//    const action = {
//        type: 'SET_BUG',
//        ...testData
//    }
//    const state = bugItemReducer(undefined, action);
//    expect(state).toEqual(testData);
//});
