import bugApi from "../api/bug";
import newCommentApi from "../api/newComment";

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

export const setNewComment = (comment) => ({
    type: "NEW_COMMENT",
    comment
});

export const startSetNewComment = (bugId, comment) => {
    return (dispatch) => {
        return newCommentApi(bugId, comment).then(result => {
            dispatch(setNewComment(result.comment));
            return result;
        });
    };
};