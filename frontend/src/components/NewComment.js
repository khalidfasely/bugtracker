import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { startSetEditComment, startSetNewComment } from "../actions/bug";

const NewComment = ({ bugId, uname, startSetNewComment, commentEdit, commentId, setIsEdit, startSetEditComment }) => {
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
        <div>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <textarea
                    placeholder="Create A Comment on this Bug!"
                    maxLength={255}
                    value={comment} onChange={(e) => setComment(e.target.value)}
                />
                {
                    commentEdit ?
                    <button>Edit</button> :
                    <button>Add</button>
                }
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