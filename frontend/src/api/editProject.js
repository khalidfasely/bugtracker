export default async (pid, { name, users, admins }) => {
    const res = await fetch(`/api/edit-project/${pid}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            users,
            admins
        })
    });
    
    const result = await res.json();

    return result;
};