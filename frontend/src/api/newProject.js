export default async ({ projectName, arrUsers, arrAdmins }) => {
    const res = await fetch('/api/new-project', {
        method: 'POST',
        body: JSON.stringify({
            name: projectName,
            users: arrUsers,
            admins: arrAdmins
        })
    });

    const response = await res.json();

    return response;
};