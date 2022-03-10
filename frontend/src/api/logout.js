export default async () => {
    const res = await fetch('/api/logout');
    
    const data = await res.json();

    return data;
};