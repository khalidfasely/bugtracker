import { useState } from "react";

const NewComment = ({ bugId }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setError('');

        if (comment.replace(/\s/g, '') < 25) {
            setError('Comment must be 25 character or more!');
            return;
        };

        fetch(`/api/bug/${bugId}/new-comment`, {
            method: 'POST',
            body: JSON.stringify({
                content: comment
            })
        })
        .then(res => res.json())
        .then(result => console.log(result))
        .catch(er => console.error(er));

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

export default NewComment;