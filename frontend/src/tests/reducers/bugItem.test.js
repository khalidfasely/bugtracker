import bugItemReducer from "../../reducers/bugItem";
import bug from '../fixtures/bug';
import comments from "../fixtures/comments";

let defaultState, testData;

beforeEach(() => {
    defaultState = {
        bug: {},
        comments: []
    };
    testData = {
        bug: { ...bug, comments: undefined },
        comments: bug.comments
    };
});

test('Should set bugItem reducer with default state', () => {
    const state = bugItemReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('Should set bug on bugItem reducer', () => {
    const action = {
        type: 'SET_BUG',
        ...testData
    }
    const state = bugItemReducer(undefined, action);
    expect(state).toEqual(testData);
});

test('Should set edit bug on bugItem reducer', () => {
    const editedBug = {
        ...bug,
        title: 'Edited Bug'
    }
    const action = {
        type: 'EDIT_BUG',
        bug: editedBug
    }
    const state = bugItemReducer(testData, action);
    expect(state.bug).toEqual(editedBug);
});

test('Should set delete bug on bugItem reducer', () => {
    const action = {
        type: 'DELETE_BUG',
        bid: bug.id
    }
    const state = bugItemReducer(testData, action);
    expect(state).toEqual(defaultState);
});

test('Should set new comment on bugItem reducer', () => {
    const action = {
        type: 'NEW_COMMENT',
        comment: comments[1]
    }
    const state = bugItemReducer(testData, action);
    expect(state.comments).toEqual([...testData.comments, comments[1]])
});

test('Should set edit comment on bugItem reducer', () => {
    const cid = testData.comments[0].id;
    const action = {
        type: 'EDIT_COMMENT',
        cid,
        comment: comments[1]
    }
    const state = bugItemReducer(testData, action);
    const newComments = testData.comments.map(comment => (
        comment.id === cid ? comments[1] : comment
    ));
    expect(state.comments).toEqual(newComments);
});

test('Should set delete comment on bugItem reducer', () => {
    const cid = testData.comments[0].id;
    const action = {
        type: 'DELETE_COMMENT',
        cid
    }
    const state = bugItemReducer(testData, action);
    const newComments = testData.comments.filter(comment => comment.id !== cid);
    expect(state.comments).toEqual(newComments);
});