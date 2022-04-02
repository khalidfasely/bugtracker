import { setDelProject } from "../../actions/delProject";

test('Should set delete project action object with provided data', () => {
    const pid = 1;
    const action = setDelProject(pid);
    expect(action).toEqual({
        type: 'DELETE_PROJECT',
        pid
    });
});

test('Should set delete project action object without data', () => {
    const action = setDelProject();
    expect(action).toEqual({
        type: 'DELETE_PROJECT'
    });
});