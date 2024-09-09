import axios from "axios";

const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function addReview(
  token: string,
  orderId: string,
  comment: string,
  files: File[],
  setLoading: Function,
  setProgress: Function
) {
  try {
    setLoading("load");

    // Створюємо новий об'єкт FormData
    const formData = new FormData();
    formData.append("comment", comment.toLowerCase());
    formData.append("orderId", `${orderId}`);

    // Додаємо файли до FormData
    files.forEach((file) => formData.append("files", file));

    // Використовуємо axios для надсилання POST-запиту з відстеженням прогресу
    const response = await axios.post(`${backendLink}reviews/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Важливо для завантаження файлів
      },
      onUploadProgress: (progressEvent) => {
        // Відстеження прогресу завантаження
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted); // Оновлюємо відсоток завантаження
        }
      },
    });

    // Обробка відповіді
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      if (data._id) {
        setLoading("loading");
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
