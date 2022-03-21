export default async () => {
    const res = await fetch('/api/get_users');

    const response = await res.json();

    return response;
};