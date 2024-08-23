"use client";

import styles from "./page.module.scss";

import { OrdersContext } from "@/app/contexts/OrderContext";
import { useState, useEffect } from "react";
import { getOrders } from "../_api/getOrders";
import Link from "next/link";
import { redirect } from "next/navigation";

import { OrdersList } from "../components/OrdersList/OrdersList";
import Pagination from "../components/Pagination/Pagination";
import { useUserContext } from "@/app/hooks/userHooks";

export default function Users({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUserContext();

  const [orders, setOrders] = useState<[]>([]);

  const [pagePagination, setPagePagination] = useState<{
    currentPage: number;
    allItems: number;
  }>({
    currentPage: 1,
    allItems: 0,
  });

  const { currentPage, allItems } = pagePagination;

  useEffect(() => {
    getOrders(setOrders, currentPage, setPagePagination);
  }, [pagePagination.currentPage]);

  const maxPage = Math.ceil(allItems / 5);

  return (
    <section>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.box_user}>
            <div className={styles.avatar_box}>
              <div className={styles.avatar}>
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className={styles.avatar_img}
                />
              </div>
              <Link href="/user/avatar" className={styles.link_avatar}>
                <svg>
                  <use href="../../../../symbol-defs.svg#add_photo" />
                </svg>
              </Link>
            </div>
            <div className={styles.box_info}>
              <h2 className={styles.header}>
                Dobrý den, {user.name} {user.surname}!
              </h2>
              <ul className={styles.list}>
                <li>
                  <h3 className={styles.title}>OBJEDNÁVEK</h3>
                  <p>{allItems}</p>
                </li>
              </ul>
            </div>
          </div>
          <h3 className={styles.header_orders}>OBJEDNÁVKY</h3>
        </div>
        <OrdersList orders={orders} />

        {maxPage > 1 && (
          <Pagination
            setPagePagination={setPagePagination}
            currentPage={currentPage}
            maxPage={maxPage}
          />
        )}
      </div>
      <OrdersContext.Provider value={orders}>{children}</OrdersContext.Provider>
    </section>
  );
}
