import bugApi from "../api/bug";
import editCommentApi from "../api/editComment";
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
            // if (result.comment) {}
            dispatch(setNewComment(result.comment));
            return result;
        });
    };
};

export const setEditComment = (cid, comment) => ({
    type: "EDIT_COMMENT",
    cid,
    comment
});

export const startSetEditComment = (cid, newCommentContent) => {
    return (dispatch) => {
        return editCommentApi(cid, newCommentContent).then(result => {
            if (result.comment) {
                dispatch(setEditComment(cid, result.comment));
            };
            return result;
        });
    };
};