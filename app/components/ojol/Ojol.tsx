"use client";
import style from "./ojol.module.css";
import Image from "next/image";

const Ojol = () => {
  return (
    <>
    <h3 className={style.divider}><span>Atau Pesan Disini</span></h3>
      <div className={style.container}>
      <Image
          src={`/gojek.png`}
          alt="Gojek Logo"
          width={200}
          style={{ width: "12.5rem" }}
          height={0}
          quality={100}
          loading="lazy"
          onClick={() => window.open("https://gofood.link/a/JK25J71")}
          />
        <Image
          src={`/shopee.png`}
          alt="Shopee Logo"
          style={{ width: "7.5rem" }}
          width={120}
          height={0}
          quality={100}
          loading="lazy"
          onClick={() => window.open("https://shopee.co.id/now-food/shop/21400468")}
        />
      </div>
    </>
  );
};
export default Ojol;
