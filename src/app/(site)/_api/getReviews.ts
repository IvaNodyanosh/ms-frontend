import React from "react";

const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getMedia(
  type: "get" | "filter",
  setMedia: Function,
  currentPage: number,
  filter: string | undefined,
  setPagination: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      allItems: number;
      filter: string | undefined;
    }>
  >
) {
  const data = await fetch(
    `${backendLink}reviews/media/?page=${currentPage}&pageSize=4&filter=${filter}`,
    {
      method: "GET",
      headers: {
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
    setPagination((prevState) =>
      type === "get"
        ? {
            ...prevState,
            allItems: data.totalItems,
          }
        : {
            ...prevState,
            currentPage: 1,
            allItems: data.totalItems,
          }
    );
    setMedia(data.items);
  }
}
