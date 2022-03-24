import { useState } from "react";
import { connect } from "react-redux";
import { startSetNewComment } from "../actions/bug";

const NewComment = ({ bugId, startSetNewComment }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        if (comment.replace(/\s/g, '') < 25) {
            setError('Comment must be 25 character or more!');
            return;
        };

        startSetNewComment(bugId, comment);

        setComment('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <textarea
                    placeholder="Create A Comment on this Bug!"
                    maxLength={255}
                    value={comment} onChange={(e) => setComment(e.target.value)}
                />
                <button>Add</button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startSetNewComment: (bugId, comment) => dispatch(startSetNewComment(bugId, comment))
});

export default connect(undefined, mapDispatchToProps)(NewComment);