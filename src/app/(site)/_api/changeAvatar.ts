import axios from "axios";

const backendLink = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function changeAvatar(
  avatar: File | null,
  setLoading: Function,
  setUser: Function,
  token: string,
  setProgress: Function
) {
  try {
    setLoading("loading");

    const formData = new FormData();
    if (avatar) {
      formData.append("avatar", avatar);
    }

    // Використовуємо axios для надсилання PATCH-запиту з відстеженням прогресу
    const response = await axios.patch(
      `${backendLink}users/avatars`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Важливо для завантаження файлів
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentComplete = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentComplete); // Оновлюємо відсоток завантаження
          }
        },
      }
    );

    // Обробка відповіді
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
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
