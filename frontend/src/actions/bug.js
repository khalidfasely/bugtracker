import bugApi from "../api/bug";

export const setBug = (bug) => ({
    type: "SET_BUG",
    bug
});

export const startSetBug = (pid, bid) => {
    return (dispatch) => {
        return bugApi(pid, bid).then((result) => {
            dispatch(setBug(result.bug));
            return result;
        });
    };
};