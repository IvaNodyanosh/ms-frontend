const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function changeAvatar(
  avatar: File | null,
  setLoading: Function,
  setUser: Function,
  token: String
) {
  const formData = new FormData();

  if (avatar) {
    formData.append("avatar", avatar);
  }

  console.log(token);

  const data = await fetch(`${backendLink}users/avatars`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        setLoading("error");
      }
      return res.json();
    })
    .then((data) => data);

  if (data.url) {
    setUser(
      (prevState: {
        name: string;
        surname: string;
        statusUser: string;
        token: string;
        avatarUrl: string;
      }) => {
        return { ...prevState, avatarUrl: data.url };
      }
    );
    setLoading("changed-avatar");

    console.log(data);
  } else {
    setLoading("error");
  }
}
