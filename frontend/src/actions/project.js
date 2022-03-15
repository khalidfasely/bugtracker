import projectApi from "../api/project";

export const setProject = (project, bugs) => ({
    type: "SET_PROJECT",
    project,
    bugs
});

export const startSetProject = (pid) => {
    return (dispatch) => {
        return projectApi(pid).then((result) => {
            dispatch(setProject(result.project, result.bugs));
            return result;
        });
    };
};