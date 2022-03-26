export default async (commentId) => {
    const res = await fetch(`/api/delete-comment/${commentId}`);

    const result = await res.json();

    return result;
};