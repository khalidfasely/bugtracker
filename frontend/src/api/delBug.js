export default async (bugId) => {
    const res = await fetch(`/api/delete-bug/${bugId}`);

    const result = await res.json();

    return result;
};