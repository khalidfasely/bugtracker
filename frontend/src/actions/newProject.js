import newProjectApi from "../api/newProject";

export const setNewProject = (project) => ({
    type: 'NEW_PROJECT',
    project
});

export const startSetNewProject = (project) => {
    return (dispatch) => {
        return newProjectApi(project).then(result => {
            dispatch(setNewProject(result.project));
            return result;
        });
    };
};