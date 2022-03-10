export default async ({ username, password }) => {
    const res = await fetch('/api/login', {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await res.json();

    return data;
};