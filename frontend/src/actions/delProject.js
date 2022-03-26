import delProjectApi from "../api/delProject";

export const setDelProject = (pid) => ({
    type: 'DELETE_PROJECT',
    pid
});

export const startSetDelProject = (pid) => {
    return (dispatch) => {
        return delProjectApi(pid).then(result => {
            //If not deleted from db
            if (result.message !== "Delete Successfully") {
                return result;
            }

            dispatch(setDelProject(pid));
            return result;
        });
    };
};