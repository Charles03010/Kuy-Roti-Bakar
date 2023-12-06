"use client";
import style from "./ojol.module.css";
import Image from "next/image";

const Ojol = () => {
  return (
    <>
      <div className={style.container}>
      <Image
          src={`/gojek.png`}
          alt="Gojek Logo"
          width={200}
          height={0}
          quality={100}
          loading="lazy"
          onClick={() => window.open("https://gofood.link/a/JK25J71")}
          />
        <Image
          src={`/shopee.png`}
          alt="Shopee Logo"
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
