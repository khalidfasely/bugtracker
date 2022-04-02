import { setEditProject } from "../../actions/editProject";
import projects from "../fixtures/projects";

test('Should set edit project action object with provided data', () => {
    const action = setEditProject(projects[0]);
    expect(action).toEqual({
        type: 'EDIT_PROJECT',
        project: projects[0]
    });
});

test('Should set edit project action object without data', () => {
    const action = setEditProject();
    expect(action).toEqual({
        type: 'EDIT_PROJECT'
    });
});