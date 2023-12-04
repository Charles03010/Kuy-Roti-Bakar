"use client";
import { useEffect } from "react";
import style from "./load.module.css";
import Image from "next/image";

const Loader = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
          const loader = document.getElementById(style.globalLoader);
          if (loader)
            loader.remove();
        }
      }, []);
  return (
    <>
      <div id={style.globalLoader}>
          <Image
            src="/logo-merah.png"
            alt="Kuy Logo"
            width={300}
            height={0}
            priority
          />
        </div>
    </>
  );
};
export default Loader;
