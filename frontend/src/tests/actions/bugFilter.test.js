import { setTextFilter, sortByPriority, sortByDefault } from "../../actions/bugFilter";

test('Should set text filter action object without data', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT',
        text: ''
    })
});

test('Should set text filter action object with data', () => {
    const action = setTextFilter('text');
    expect(action).toEqual({
        type: 'SET_TEXT',
        text: 'text'
    })
});

test('Should set sortByPriority filter action object', () => {
    const action = sortByPriority();
    expect(action).toEqual({
        type: 'SORT_BY_PRIORITY'
    })
});

test('Should set sortByDefault filter action object', () => {
    const action = sortByDefault();
    expect(action).toEqual({
        type: 'DEFAULT_SORT'
    })
});