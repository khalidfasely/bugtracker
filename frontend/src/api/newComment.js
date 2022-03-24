export default async (bugId, comment) => {
    const res = await fetch(`/api/bug/${bugId}/new-comment`, {
        method: 'POST',
        body: JSON.stringify({
            content: comment
        })
    });

    const result = await res.json();

    return result;
};