import React from "react";
import styles from "./Pagination.module.scss";

export default function Pagination({
  setPagePagination,
  currentPage,
  maxPage,
}: {
  setPagePagination: React.Dispatch<
    React.SetStateAction<{
      currentPage: number;
      maxPage: number;
    }>
  >;

  currentPage: number;
  maxPage: number;
}) {
  const handlePageChange = (pageNumber: number) => {
    setPagePagination((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  };

  return (
    <ul className={styles.list}>
      <li className={styles.item__arrow}>
        <button
          type="button"
          className={styles.button__arrow}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <svg className={styles.icon__arrow__left}>
            <use href="../../../../../symbol-defs.svg#arrow" />
          </svg>
        </button>
      </li>
      {currentPage !== 1 && (
        <li className={styles.item}>
          <button className={styles.button} onClick={() => handlePageChange(1)}>
            1
          </button>
        </li>
      )}

      {currentPage > 5 && (
        <li className={styles.item__gap}>
          <span>...</span>
        </li>
      )}

      {((currentPage - 6 > 1 && currentPage < 6) ||
        (maxPage - currentPage < 1 && currentPage - 6 > 1)) && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage - 6)}
          >
            {currentPage - 6}
          </button>
        </li>
      )}

      {((currentPage - 5 > 1 && currentPage < 6) ||
        (maxPage - currentPage < 2 && currentPage - 5 > 1)) && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage - 5)}
          >
            {currentPage - 5}
          </button>
        </li>
      )}
      {((currentPage - 4 > 1 && currentPage < 6) ||
        (maxPage - currentPage < 3 && currentPage - 4 > 1)) && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage - 4)}
          >
            {currentPage - 4}
          </button>
        </li>
      )}
      {((currentPage - 3 > 1 && currentPage < 6) ||
        (maxPage - currentPage < 4 && currentPage - 3 > 1)) && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage - 3)}
          >
            {currentPage - 3}
          </button>
        </li>
      )}
      {currentPage - 2 > 1 && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage - 2)}
          >
            {currentPage - 2}
          </button>
        </li>
      )}
      {currentPage - 1 > 1 && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        </li>
      )}

      <li className={styles.item__current}>{currentPage}</li>
      {currentPage + 1 < maxPage && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        </li>
      )}
      {currentPage + 2 < maxPage && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage + 2)}
          >
            {currentPage + 2}
          </button>
        </li>
      )}

      {((currentPage + 3 < maxPage && maxPage - currentPage < 5) ||
        (currentPage < 4 && currentPage + 3 < maxPage)) && (
        <li className={styles.item}>
          <button
            className={styles.button}
            
            onClick={() => handlePageChange(currentPage + 3)}
          >
            {currentPage + 3}
          </button>
        </li>
      )}

      {((currentPage + 4 < maxPage && maxPage - currentPage < 5) ||
        (currentPage < 3 && currentPage + 4 < maxPage)) && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage + 4)}
          >
            {currentPage + 4}
          </button>
        </li>
      )}

      {((currentPage + 5 < maxPage && maxPage - currentPage < 6) ||
        (currentPage < 2 && currentPage + 5 < maxPage)) && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage + 5)}
          >
            {currentPage + 5}
          </button>
        </li>
      )}

      {((currentPage + 6 < maxPage && maxPage - currentPage < 6) ||
        (currentPage < 1 && currentPage + 6 < maxPage)) && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(currentPage + 6)}
          >
            {currentPage + 6}
          </button>
        </li>
      )}

      {maxPage - currentPage > 4 && (
        <li className={styles.item__gap}>
          <span>...</span>
        </li>
      )}
      {currentPage !== maxPage && (
        <li className={styles.item}>
          <button
            className={styles.button}
            onClick={() => handlePageChange(maxPage)}
          >
            {maxPage}
          </button>
        </li>
      )}

      <li className={styles.item__arrow}>
        <button
          className={styles.button__arrow}
          type="button"
          disabled={currentPage === maxPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <svg className={styles.icon__arrow__right}>
            <use href="../../../../../symbol-defs.svg#arrow" />
          </svg>
        </button>
      </li>
    </ul>
  );
}
