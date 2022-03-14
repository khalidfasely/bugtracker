import projectApi from "../api/project";

export const setProject = (project) => ({
    type: "SET_PROJECT",
    project
});

export const startSetProject = (pid) => {
    return (dispatch) => {
        return projectApi(pid).then((result) => {
            dispatch(setProject(result.project));
            return result;
        });
    };
};