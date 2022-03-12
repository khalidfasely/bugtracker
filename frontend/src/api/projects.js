export default async () => {
    const res = await fetch('/api/projects');
    
    const data = await res.json();
    
    return data;
};