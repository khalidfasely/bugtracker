import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { startSetEditComment, startSetNewComment } from "../actions/bug";

export const NewComment = ({ bugId, uname, startSetNewComment, commentEdit, commentId, setIsEdit, startSetEditComment }) => {
    const [comment, setComment] = useState(commentEdit ? commentEdit : '');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        const availableComment = comment.replace(/\s/g, '').length >= 15;

        if (!availableComment) {
            setError('Comment must be 15 character or more!');
            return;
        };

        if (commentEdit) {
            startSetEditComment(commentId, comment).then(() => setIsEdit(false));
            return;
        }

        startSetNewComment(bugId, comment);

        setComment('');
    };

    if (!uname) {
        return <div><Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Comment!</div>;
    }

    return (
        <div className="comment-form-container">
            <form className="comment-form" onSubmit={handleSubmit} data-testid='comment_form'>
                <p className="error_message" data-testid='comment_error'>{error ? error : null}</p>
                <textarea
                    placeholder="Create A Comment on this Bug!"
                    maxLength={255}
                    value={comment} onChange={(e) => setComment(e.target.value)}
                    data-testid='comment_input'
                />
                <div className="buttons-container">
                    {
                        commentEdit ?
                        <button disabled={!comment.replace(/\s/g, '')}>Save</button> :
                        <button disabled={!comment.replace(/\s/g, '')}>Add</button>
                    }
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname
});

const mapDispatchToProps = (dispatch) => ({
    startSetNewComment: (bugId, comment) => dispatch(startSetNewComment(bugId, comment)),
    startSetEditComment: (cid, comment) => dispatch(startSetEditComment(cid, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);