import projectsApi from "../api/projects";

export const setProjects = (projects) => ({
    type: "SET_PROJECTS",
    projects
});

export const startSetProjects = () => {
    return (dispatch) => {
        return projectsApi().then((result) => {
            dispatch(setProjects(result.projects));
            return result;
        });
    };
};