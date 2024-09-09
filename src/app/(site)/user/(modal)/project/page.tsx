"use client";

import styles from "./page.module.scss";

import { Loader } from "@/app/(site)/components/Loader/loader";
import { SuccessMessage } from "@/app/(site)/components/SuccessMessage/SuccessMessage";
import { ErrorMessage } from "@/app/(site)/components/ErrorMessage/ErrorMessage";
import { FormProject } from "@/app/(site)/components/FormProject/FormProject";

import { useUserContext } from "@/app/hooks/userHooks";

import { useState } from "react";

export default function OrderPage() {
  const [loading, setLoading] = useState<string>("unloaded");
  const [progress, setProgress] = useState<number>(0);
  const { user } = useUserContext();

  switch (loading) {
    case "unloaded":
      return (
        <div className={styles.box}>
          <FormProject value={{ setProgress, setLoading, user }} />
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
          <SuccessMessage type={"add__project"} />
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
