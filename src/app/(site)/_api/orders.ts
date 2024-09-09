const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

import axios from "axios";

export async function createOrder(
  name: string,
  surname: string,
  email: string,
  phone: string,
  message: string,
  files: File[],
  setLoading: Function,
  setProgress: Function
) {
  try {
    setLoading("loading");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    files.forEach((file) => formData.append("files", file));

    const response = await axios.post(`${backendLink}orders/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      },
    });

    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      if (data._id) {
        setLoading("loading");
        console.log(data);
      } else {
        setLoading("error");
      }
    } else {
      setLoading("error");
    }
  } catch (error) {
    console.error("Error:", error);
    setLoading("error");
  }
}


export async function registerOrder(
  token: string,
  message: string,
  files: File[],
  setLoading: Function,
  setProgress: Function
) {
  try {
    setLoading("loading");

    const formData = new FormData();
    formData.append("message", message);
    files.forEach((file) => formData.append("files", file));

    const response = await axios.post(
      `${backendLink}orders/register`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      if (data._id) {
        setLoading("loading");
        console.log(data);
      } else {
        setLoading("error");
      }
    } else {
      setLoading("error");
    }
  } catch (error) {
    console.error("Error:", error);
    setLoading("error");
  }
}
