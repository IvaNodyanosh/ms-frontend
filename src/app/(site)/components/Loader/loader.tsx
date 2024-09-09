import classNames from "classnames";
import styles from "./loader.module.scss";

export const Loader = (info?: { progress?: number }) => {
  return (
    <div className={styles.loader_container}>
      {info?.progress && (
        <svg className={styles.loader_icon} viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="15.9154"></circle>
          <circle
            cx="21"
            cy="21"
            r="15.9154"
            fill="transparent"
            stroke="#939393"
            strokeWidth="1"
          ></circle>
          <circle
            cx="21"
            cy="21"
            r="15.9154"
            fill="transparent"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray={`${info!.progress} ${100 - info.progress}`}
          ></circle>
        </svg>
      )}
      <div className={styles.loader_box}>
        <img
          src="../../../../../logo.png"
          alt=""
          className={styles.loader_img}
        />
        <div
          className={classNames(styles.loader_styled, "animation_loader")}
        ></div>
      </div>
      {info?.progress && (
        <p className={styles.loader_percent}>{`${info!.progress}`}%</p>
      )}
    </div>
  );
};
