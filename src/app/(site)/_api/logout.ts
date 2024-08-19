const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function logout(setUser: Function, token: string) {
  await fetch(`${backendLink}users/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  });

  setUser({
    name: "",
    surname: "",
    statusUser: "",
    token: "",
    avatarUrl: "",
  });
  localStorage.removeItem("token");
}
