export default async ({ username, email, password, confirmation }) => {
    const res = await fetch('/api/register', {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        confirmation
      })
    });

    const data = await res.json();

    return data;
};