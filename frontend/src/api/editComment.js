export default async (commentId, newCommentContent) => {
    const res = await fetch(`/api/edit-comment/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            content: newCommentContent
        })
    });

    const result = await res.json();

    return result;
};