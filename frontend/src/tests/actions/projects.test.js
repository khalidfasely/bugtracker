import { setProjects } from "../../actions/projects";
import projects from "../fixtures/projects";

test('Should set projects action object with provided data', () => {
    const action = setProjects(projects);
    expect(action).toEqual({
        type: 'SET_PROJECTS',
        projects
    });
});

test('Should set projects action object without data', () => {
    const action = setProjects();
    expect(action).toEqual({
        type: 'SET_PROJECTS'
    });
});