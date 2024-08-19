const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function verify(token: string, setLoading: Function) {
  const data = await fetch(`${backendLink}users/verify/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data);

  console.log(data.message);

  if (data.message === "Verification successful") {
    setLoading("success");
  } else if (data.message === "The user is blocked") {
    setLoading("userBlocked");
  } else if (data.message === "User not found") {
    setLoading("userNotFound");
  } else {
    setLoading("error");
  }
}
