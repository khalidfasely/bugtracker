export default async (pid) => {
    const res = await fetch(`/api/delete-project/${pid}`);

    const result = await res.json();

    return result;
};