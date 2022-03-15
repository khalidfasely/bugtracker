export default async (pid, bid) => {
    const res = await fetch(`/api/project/${pid}/bug/${bid}`);

    const result = await res.json();

    return result;
};