"use client";

import styles from "./page.module.scss";
import { FormCreateOrder } from "@/app/(site)/components/FormCreateOrder/FormCreateOrder";
import { Loader } from "@/app/(site)/components/Loader/loader";
import { SuccessMessage } from "@/app/(site)/components/SuccessMessage/SuccessMessage";
import { ErrorMessage } from "@/app/(site)/components/ErrorMessage/ErrorMessage";

import { useUserContext } from "@/app/hooks/userHooks";

import { useState } from "react";

export default function OrderPage() {
  const [loading, setLoading] = useState<string>("unloaded");
  const { user } = useUserContext();
  const [progress, setProgress] = useState<number>(0);

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
