import { setBug, setNewComment, setEditComment, setDeleteComment } from "../../actions/bug";
import bug from "../fixtures/bug";
import comments from "../fixtures/comments";

test('Should set bug action object with provided data', () => {
    const action = setBug(bug, comments);
    expect(action).toEqual({
        type: 'SET_BUG',
        bug,
        comments
    })
});

test('Should set bug action object without data', () => {
    const action = setBug();
    expect(action).toEqual({
        type: 'SET_BUG'
    })
});

test('Should set new comment action object with provided data', () => {
    const action = setNewComment(comments[0]);
    expect(action).toEqual({
        type: 'NEW_COMMENT',
        comment: comments[0]
    })
});

test('Should set new comment action object without data', () => {
    const action = setNewComment();
    expect(action).toEqual({
        type: 'NEW_COMMENT'
    })
});

test('Should set edit comment action object with provided data', () => {
    const action = setEditComment(comments[0].id, comments[0]);
    expect(action).toEqual({
        type: 'EDIT_COMMENT',
        cid: comments[0].id,
        comment: comments[0]
    })
});

test('Should set edit comment action object without data', () => {
    const action = setEditComment();
    expect(action).toEqual({
        type: 'EDIT_COMMENT'
    })
});

test('Should set delete comment action object with provided data', () => {
    const action = setDeleteComment(comments[0].id);
    expect(action).toEqual({
        type: 'DELETE_COMMENT',
        cid: comments[0].id
    })
});

test('Should set delete comment action object without data', () => {
    const action = setDeleteComment();
    expect(action).toEqual({
        type: 'DELETE_COMMENT'
    })
});