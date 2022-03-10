export default async () => {
    const res = await fetch('/api/user');
  
    const data = await res.json();

    return data;
};