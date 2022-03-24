import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { startSetNewComment } from "../actions/bug";

const NewComment = ({ bugId, uname, startSetNewComment, commentEdit, setIsEdit }) => {
    const [comment, setComment] = useState(commentEdit ? commentEdit : '');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        if (comment.replace(/\s/g, '') < 25) {
            setError('Comment must be 25 character or more!');
            return;
        };

        if (commentEdit) {
            console.log('edited', comment);
            //startSetEditComment(comment);
            setIsEdit(false);
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
    startSetNewComment: (bugId, comment) => dispatch(startSetNewComment(bugId, comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);