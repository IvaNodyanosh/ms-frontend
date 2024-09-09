import { useState } from "react";

import styles from "./FormLogin.module.scss";

import { login } from "../../_api/login";
import { resetPassword } from "../../_api/registerUser";

import { useUserContext } from "@/app/hooks/userHooks";
import classNames from "classnames";

export function FormLogin({
  value: { loading, setLoading },
}: {
  value: {
    loading: string;
    setLoading: Function;
  };
}) {
  const { setUser } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  return (
    <form
      className={classNames(styles.form, {
        [styles.form_error]:
          loading === "wrongInfo" || loading === "userNotFound",
      })}
      onSubmit={(e) => {
        e.preventDefault();
        checkbox
          ? resetPassword(email, setLoading)
          : login(email, password, setLoading, setUser);

        setPassword("");
        setEmail("");
      }}
    >
      <label className={styles.label}>
        <span> Email</span>
        <input
          type="email"
          className={styles.input}
          required
          placeholder="example@mail.com"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <div className={styles.label_box}>
          <p className={classNames(styles.error_valid)}>
            Nesprávný formát e-mailu!
          </p>
          <svg className={styles.icon}>
            <use href="symbol-defs.svg#email" />
          </svg>
        </div>
      </label>
      {!checkbox && (
        <label className={styles.label}>
          <span>Heslo</span>
          <input
            type="password"
            className={styles.input}
            required
            placeholder="* * * * * * * *"
            pattern=".{9,}"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <div className={styles.label_box}>
            <p className={styles.error_valid}>
              Délka hesla musí být více než 8 znaku!
            </p>
            <svg className={styles.icon}>
              <use href="symbol-defs.svg#password" />
            </svg>
          </div>
        </label>
      )}

      {loading === "wrongInfo" && !checkbox && (
        <p className={styles.error_text}> Špatný e-mail nebo heslo!</p>
      )}

      {loading === "userNotFound" && checkbox && (
        <p className={styles.error_text}> Špatný e-mail!</p>
      )}

      <label className={styles.label_checkbox}>
        <input
          type="checkbox"
          className="phantom"
          checked={checkbox}
          onChange={() => setCheckbox((prevState) => !prevState)}
        />
        <svg className={styles.svg_checked}>
          <use href="../../../../../symbol-defs.svg#checkbox-checked"></use>
        </svg>
        <svg className={styles.svg_unchecked}>
          <use href="../../../../../symbol-defs.svg#checkbox-unchecked"></use>
        </svg>
        Zapomněli jste heslo?
      </label>
      <button type="submit" className={styles.button}>
        {!checkbox ? "PŘIHLÁSIT SE" : "OBNOVIT HESLO"}
      </button>
    </form>
  );
}
