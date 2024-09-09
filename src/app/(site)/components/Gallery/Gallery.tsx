import Pagination from "../Pagination/Pagination";
import styles from "./Gallery.module.scss";

import { getMedia } from "../../_api/getReviews";

import { useEffect, useState } from "react";

export default function Gallery() {
  const [pagination, setPagination] = useState<{
    currentPage: number;
    allItems: number;
    filter: string | undefined;
  }>({
    currentPage: 1,
    allItems: 0,
    filter: "",
  });
  const [media, setMedia] = useState<[]>([]);

  const { currentPage, allItems, filter } = pagination;
  const maxPage = Math.ceil(allItems / 4);

  useEffect(() => {
    getMedia("get", setMedia, currentPage, filter, setPagination);
  }, [currentPage]);

  return (
    <section>
      <div className="container">
        <h2 className={styles.header}>GALERIE</h2>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            getMedia(
              "filter",
              setMedia,
              currentPage,
              filter?.toLocaleLowerCase(),
              setPagination
            );
          }}
        >
          <label className={styles.label}>
            <input
              className={styles.input}
              type="text"
              onChange={({ target }) =>
                setPagination((prevState) => ({
                  ...prevState,
                  filter: target.value,
                }))
              }
            />
            <svg className={styles.icon}>
              <use href="symbol-defs.svg#search" />
            </svg>
          </label>

          <button type="submit" className={styles.form__button}>
            HLEDAT
          </button>
        </form>

        {media.length > 0 && (
          <ul className={styles.list}>
            {media.map((file: string) => {
              const typeFile = file.split(".");
              const type = typeFile[typeFile.length - 1];

              return (
                <li key={file} className={styles.item}>
                  {((type === "jpeg" ||
                    type === "png" ||
                    type === "svg" ||
                    type === "jpg") && <img src={file} alt="photo" />) ||
                    ((type === "mp4" ||
                      type === "mp4a" ||
                      type === "wav" ||
                      type === "wma" ||
                      type === "wmv" ||
                      type === "mov" ||
                      type === "m4v") && (
                      <video className={styles.video} controls>
                        <source src={file} type={`video/${type}`} />
                        Your browser does not support the video tag.
                      </video>
                    ))}
                </li>
              );
            })}
          </ul>
        )}

        {maxPage > 1 && (
          <Pagination
            setPagePagination={setPagination}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        )}
      </div>
    </section>
  );
}
