export default async (bugId, { title, description, users, admins, active, classification }) => {
    const res = await fetch(`/api/edit-bug/${bugId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            users,
            admins,
            active,
            classification
        })
    });

    const result = await res.json();

    return result;
};