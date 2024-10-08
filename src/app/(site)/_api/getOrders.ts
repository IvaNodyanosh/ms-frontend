import React from "react";

const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getOrders(
  setOrders: Function,
  currentPage: number,
  setPagePagination: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      allItems: number;
      filter: string | undefined;
    }>
  >
) {
  const token = localStorage.getItem("token");
  const data = await fetch(
    `${backendLink}orders/?page=${currentPage}&pageSize=5`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error));
  console.log(data);

  if (data) {
    setPagePagination((prevState) => ({
      ...prevState,
      allItems: data.totalItems,
    }));
    setOrders(data.orders);
  }
}
