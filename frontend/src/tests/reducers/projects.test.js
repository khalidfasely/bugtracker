import projectsReducer from "../../reducers/projects";
import projects from "../fixtures/projects";

let testData, defaultState;

beforeEach(() => {
    testData = {
        projects
    };
    defaultState = {
        projects: []
    };
});

test('Should set projets reducer with default state', () => {
    const state = projectsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(defaultState);
});

test('Should set projects on projectsReducer', () => {
    const action = {
        type: 'SET_PROJECTS',
        ...testData
    }
    const state = projectsReducer(undefined, action);
    expect(state).toEqual(testData);
});

test('Should set new project on projectsReducer', () => {
    const newProject = {
        id: 3,
        user: 'User',
        users_with: ['User', '1'],
        admins: ['User'],
        time: 'now'
    }
    const action = {
        type: 'NEW_PROJECT',
        project: newProject
    }
    const state = projectsReducer(testData, action);
    expect(state.projects).toEqual([newProject, ...testData.projects])
});

test('Should set delete project on projectsReducer', () => {
    const pid = testData.projects[0].id;
    const action = {
        type: 'DELETE_PROJECT',
        pid
    }
    const state = projectsReducer(testData, action);
    const filteredProjects = testData.projects.filter(project => project.id !== pid);
    expect(state.projects).toEqual(filteredProjects);
});