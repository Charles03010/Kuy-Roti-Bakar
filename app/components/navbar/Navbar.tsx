"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import style from "./nav.module.css";
import Image from "next/image";

const Navbar = (props: any) => {
  const [scrollY, setScrollY] = useState("");

  function logit(v: string) {
    setScrollY(v);
  }

  useEffect(() => {
    function watchScroll() {
      function handleScroll() {
        if (window.scrollY > 0) {
          logit("scrolled");
        } else {
          logit("");
        }
      }

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    watchScroll();
  }, []);
  return (
    <>
      <nav className={style[scrollY]}>
        <Link href="/">
          <Image
            src="/logo-merah.png"
            alt="Kuy Logo"
            width={100}
            height={0}
            quality={100}
            loading="lazy"
          />
        </Link>
        <div className={style.navMenu}>
          <Link className={`${style.navLink} ${style[props.home]}`} href="/">
            Home
          </Link>
          {/* <Link
            className={`${style.navLink} ${style[props.dashboard]}`}
            href="/dashboard"
          >
            Dashboard
          </Link> */}
          <Link className={`${style.navLink} ${style[props.menu]}`} href="/menu">
            Menu
          </Link>
        </div>
        <a href="#">
          {/* Login */}
          </a>
      </nav>
    </>
  );
};
export default Navbar;
