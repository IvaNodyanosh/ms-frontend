const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function addReview(
  token: string,
  orderId: string,
  comment: string,
  files: File[],
  setLoading: Function
) {
  const formData = new FormData();
  formData.append("comment", comment);
  formData.append("orderId", orderId);

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const data = await fetch(`${backendLink}reviews/`, {
    method: "POST",
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

  if (data._id) {
    setLoading("loading");
  } else {
    setLoading("error");
  }
}
