const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function changeStatusOrder(
  status: string,
  setLoading: Function,
  token: string,
  orderId: string
) {
  const body = { status };
  const data = await fetch(`${backendLink}orders/${orderId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) {
        setLoading("error");
      }
      return res.json();
    })
    .then((data) => data);

  console.log(data);
}
