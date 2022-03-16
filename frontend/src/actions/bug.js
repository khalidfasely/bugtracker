import bugApi from "../api/bug";

export const setBug = (bug, comments) => ({
    type: "SET_BUG",
    bug,
    comments
});

export const startSetBug = (pid, bid) => {
    return (dispatch) => {
        return bugApi(pid, bid).then((result) => {
            dispatch(setBug(result.bug, result.comments));
            return result;
        });
    };
};