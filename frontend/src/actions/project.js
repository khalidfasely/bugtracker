import delBugApi from "../api/delBug";
import newBugApi from "../api/newBug";
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

export const setNewBug = (bug) => ({
    type: 'NEW_BUG',
    bug
});

export const startSetNewBug = (on_project, bugData) => {
    return (dispatch) => {
        return newBugApi(on_project, bugData).then(result => {
            if (result.bug) {
                dispatch(setNewBug(result.bug));
            }
            return result;
        });
    };
};

export const setDeleteBug = (bid) => ({
    type: 'DELETE_BUG',
    bid
});

export const startSetDeleteBug = (bid) => {
    return (dispatch) => {
        return delBugApi(bid).then(result => {
            dispatch(setDeleteBug(bid));
            return result;
        });
    };
};