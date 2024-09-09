import styles from "./FormProject.module.scss";
import { useState, ChangeEvent, use } from "react";
import { addProject } from "../../_api/addProject";

export function FormProject({
  value,
}: {
  value: {setProgress: Function, setLoading: Function; user: { token: string } };
}) {
  const { setProgress, setLoading, user } = value;
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[] | []>([]);


  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading("load");
        addProject(user.token, message, files, setLoading, setProgress);
      }}
    >
      <h2 className={styles.header}>Přidat nový projekt!</h2>

      <label className={styles.label}>
        <span>Popis projektu</span>
        <textarea
          name=""
          onChange={({ target }) => setMessage(target.value)}
          value={message}
        ></textarea>
        <svg className={styles.icon}>
          <use href="../../../../../symbol-defs.svg#mail" />
        </svg>
      </label>
      <label className={styles.cloud}>
        <svg>
          <use href="../../../../../symbol-defs.svg#add" />
        </svg>
        <input
          name="files[]"
          type="file"
          accept="video/*, audio/*, image/*, .pdf, .txt"
          multiple
          className="phantom"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const { files } = event.target; 

            if (files) {
              // Преобразування FileList в масив
              const newFiles = Array.from(files);

              setFiles((prevState: File[] | []) => {
                // Фільтруємо файли, щоб уникнути дублікатів
                const existingFiles = prevState.map((file) => file.name);
                const uniqueFiles = newFiles.filter(
                  (file) => !existingFiles.includes(file.name)
                );
                return [...prevState, ...uniqueFiles];
              });
            }
            
          }}
        />
        <span className={styles.cloud_text}>Nahrát soubory</span>
      </label>
      <ul className={styles.files_list}>
        {files.map((file) => (
          <li className={styles.files_item} key={file.name}>
            <svg>
              <use href="../../../../../symbol-defs.svg#folder" />
            </svg>
            <p>{file.name}</p>
            <button
              type="button"
              className={styles.button_delete}
              data-id={file.name}
              onClick={({ currentTarget }) => {
                setFiles((prevState) =>
                  prevState.filter(
                    (data) => data.name !== currentTarget.dataset.id
                  )
                );
              }}
            >
              <svg>
                <use href="../../../../../symbol-defs.svg#cancel" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <button type="submit" className={styles.button}>
        ODESLAT
      </button>
    </form>
  );
}
