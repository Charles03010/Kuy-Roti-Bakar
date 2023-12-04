"use client";
import Link from "next/link";
import style from "./hero.module.css";
import Image from "next/image";

const Hero = (props: any) => {
  return (
    <>
      <div className={style.hero}>
        <div className={style.heroContent}>
          <h1 className={style.heroTitle}>Kuy! Roti Bakar 🍞</h1>
          <p className={style.heroDescription}>
            Roti bakar dengan pastry yang menggoda ini adalah hasil dari
            kombinasi yang harmonis antara cita rasa coklat, keju, matcha,
            strawberry, dan blueberry yang memukau. Setiap gigitannya
            mempersembahkan sentuhan yang menggugah selera dengan beragam
            lapisan cita rasa yang memanjakan lidah.
          </p>
          <div className={style.heroButton}>
            <Link href="https://wa.me/62895616602968" className="btn btn-light border">
              <span className={style.underLine}>Kuy! Order Sekarang</span>
            </Link>
          </div>
        </div>
        <div>
          <Image
            className={style.heroImage}
            src="/menu/Keju.jpg"
            loading="lazy"
            alt="Kuy Logo"
            width={500}
            height={0}
          />
        </div>
      </div>
    </>
  );
};
export default Hero;
