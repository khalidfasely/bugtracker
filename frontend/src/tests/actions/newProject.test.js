import { setNewProject } from "../../actions/newProject";
import projects from "../fixtures/projects";

test('Should set new project action object with provided data', () => {
    const action = setNewProject(projects[1]);
    expect(action).toEqual({
        type: 'NEW_PROJECT',
        project: projects[1]
    });
});

test('Should set new project action object without data', () => {
    const action = setNewProject();
    expect(action).toEqual({
        type: 'NEW_PROJECT'
    });
});