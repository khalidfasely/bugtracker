import projectItemReducer from "../../reducers/projectItem";
import project from "../fixtures/project";

let testData, defaultState;

beforeEach(() => {
    defaultState = {
        project: {},
        bugs: []
    }
    testData = {
        project: {...project, bugs: undefined},
        bugs: project.bugs
    }
});

test('Should set projectItem reducer with default state', () => {
    const state = projectItemReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('Should set project on projectItem', () => {
    const action = {
        type: 'SET_PROJECT',
        ...testData
    }
    const state = projectItemReducer(undefined, action);
    expect(state).toEqual(testData);
});

test('Should set new bug on projectItem', () => {
    const newBug = {
        id: 2,
        title: 'Bug title',
        description: 'Bug description',
        on_project: 1,
        active: true,
        classification: 'high',
        user: '1',
        users_with: ['1'],
        admins: ['1'],
        time: 'now',
        comments: []
    }
    const action = {
        type: 'NEW_BUG',
        bug: newBug
    }
    const state = projectItemReducer(testData, action);
    expect(state.bugs).toEqual([...testData.bugs, newBug])
});

test('Should set edit project on projectItem', () => {
    const editedProject = {
        id: 1,
        name: 'Project one edited',
        user: '1',
        users_with: ['1'],
        admins: ['1'],
        time: 'now'
    }
    const action = {
        type: 'EDIT_PROJECT',
        project: editedProject
    }
    const state = projectItemReducer(testData, action);
    expect(state.project).toEqual(editedProject);
});