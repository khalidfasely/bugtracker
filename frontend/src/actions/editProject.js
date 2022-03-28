import editProjectApi from "../api/editProject";

export const setEditProject = (project) => ({
    type: 'EDIT_PROJECT',
    project
});

export const startSetEditProject = (pid, updates) => {
    return (dispatch) => {
        return editProjectApi(pid, updates).then(result => {
            //if new project back from backend
            if (result.project) {
                dispatch(setEditProject(result.project));
                return result.project;
            }

            return result.project;
        });
    };
};