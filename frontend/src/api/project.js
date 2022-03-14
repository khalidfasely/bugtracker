export default async (pid) => {
    const res = await fetch(`/api/project/${pid}`);

    const project = await res.json();

    return project;
};