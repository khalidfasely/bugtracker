export default async (on_project, { title, description, isActive, classification, users, admins }) => {
    const res = await fetch(`/api/project/${on_project}/new-bug`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            isActive,
            classification,
            users,
            admins
        })
    });

    const result = await res.json();

    return result;
};