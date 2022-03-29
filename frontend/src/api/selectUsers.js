export default async (pid) => {
    const res = await fetch(`/api/select_users/${pid}`);

    const result = await res.json();

    return result;
};