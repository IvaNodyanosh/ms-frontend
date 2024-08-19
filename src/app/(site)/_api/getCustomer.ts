const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getCustomer(setCustomer: Function, id: string) {
  const data = await fetch(`${backendLink}users/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
  console.log(data);

  if (data) {
    setCustomer({ name: data.name, surname: data.surname });
  }
}
