import { setProject, setEditBug, setDeleteBug, setNewBug } from "../../actions/project";
import bug from "../fixtures/bug";
import project from "../fixtures/project";

test('Should set project action object with provided data', () => {
    const action = setProject(project, [bug]);
    expect(action).toEqual({
        type: 'SET_PROJECT',
        project,
        bugs: [bug]
    });
});

test('Should set project action object without data', () => {
    const action = setProject();
    expect(action).toEqual({
        type: 'SET_PROJECT'
    });
});

test('Should set new bug action object with provided data', () => {
    const action = setNewBug(bug);
    expect(action).toEqual({
        type: 'NEW_BUG',
        bug
    });
});

test('Should set new bug action object without data', () => {
    const action = setNewBug();
    expect(action).toEqual({
        type: 'NEW_BUG'
    });
});

test('Should set edit bug action object with provided data', () => {
    const action = setEditBug(bug.id, bug);
    expect(action).toEqual({
        type: 'EDIT_BUG',
        bid: bug.id,
        bug
    });
});

test('Should set edit bug action object without data', () => {
    const action = setEditBug();
    expect(action).toEqual({
        type: 'EDIT_BUG'
    });
});

test('Should set delete bug action object with provided data', () => {
    const action = setDeleteBug(bug.id);
    expect(action).toEqual({
        type: 'DELETE_BUG',
        bid: bug.id
    });
});

test('Should set delete bug action object without data', () => {
    const action = setDeleteBug();
    expect(action).toEqual({
        type: 'DELETE_BUG'
    });
});