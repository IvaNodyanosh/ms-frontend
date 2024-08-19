const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getCurrentUser(setUser: Function, token: string) {
  const data = await fetch(`${backendLink}users/current`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => res.json())
    .then((data) => data);

  if (data.token) {
    setUser(data);
  }
}
