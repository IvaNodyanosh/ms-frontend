"use client";

import styles from "./page.module.scss";
import { FormCreateOrder } from "@/app/(site)/components/FormCreateOrder/FormCreateOrder";
import { useState } from "react";

import { useUserContext } from "@/app/hooks/userHooks";

import { Loader } from "@/app/(site)/components/Loader/loader";
import { ErrorMessage } from "@/app/(site)/components/ErrorMessage/ErrorMessage";
import { SuccessMessage } from "@/app/(site)/components/SuccessMessage/SuccessMessage";

export default function Order() {
  const { user } = useUserContext();
  const [loading, setLoading] = useState("unloaded");
  const [progress, setProgress] = useState(0);
  switch (loading) {
    case "unloaded":
      return (
        <div className={styles.box}>
          <FormCreateOrder value={{ setProgress, setLoading, user }} />
        </div>
      );

    case "load":
      return (
        <div className={styles.box}>
          <Loader progress={progress} />
        </div>
      );
    case "loading":
      return (
        <div className={styles.box}>
          <SuccessMessage type={"order-create"} />
        </div>
      );
    case "error":
      return (
        <div className={styles.box}>
          <ErrorMessage type={"error"} />
        </div>
      );
  }
}
