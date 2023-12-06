"use client";
import { useState, useEffect } from "react";
import style from "./menu.module.css";
import Image from "next/image";

const Menu = () => {
  const [Roti, setRoti] = useState("");
  const [Rasa, setRasa] = useState("");
  const [Ukuran, setUkuran] = useState("");
  const [Topping, setTopping] = useState("");
  const [Foto, setFoto] = useState("Polos");
  const [Harga, setHarga] = useState(0);
  const [Text, setText] = useState("");
  const [Danger, setDanger] = useState(false);
  function HandleClickRoti(params: string) {
    setDanger(false);
    setRoti(params);
  }
  function HandleClickUkuran(params: string) {
    setDanger(false);
    setUkuran(params);
  }
  function HandleClickRasa(params: string) {
    setDanger(false);
    setFoto(params);
    setRasa(params);
  }
  function HandleClickTopping(params: string) {
    setDanger(false);
    setTopping(params);
  }
  function HandleClickSubmit() {
    if (Roti === "") {
      setDanger(true);
      setText("Pilih Roti Dulu!");
    } else if (Ukuran === "") {
      setDanger(true);
      setText("Pilih Ukuran Dulu!");
    } else if (Rasa === "") {
      setDanger(true);
      setText("Pilih Rasa Dulu!");
    } else {
      let message = `Halo, saya ingin memesan roti ${Roti} dengan ukuran ${Ukuran} dan rasa ${Rasa}.`;
      if (Topping != "") {
        message += `Topping yang saya pilih adalah ${Topping}.`;
      }
      const phoneNumber = "62895616602968"; 
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    }
  }
  return (
    <>
      <h2 id="Menu" className={style.title}>
        Menu
      </h2>
      <div className={style.menu}>
        <Image
          className={style.menuImage}
          src={`/menu/${Foto}.jpg`}
          alt="Kuy Logo"
          width={500}
          height={0}
          quality={100}
          loading="lazy"
        />
        <div>
          {Danger ? (
            <div className="alert alert-danger" role="alert">
              {Text}
            </div>
          ) : (
            ""
          )}
          <h3 className={style.label}>Pilihan Roti : {Roti}</h3>
          <div className={style.pilihan}>
            <button
              onClick={() => HandleClickRoti("Polos")}
              className={`btn border ${Roti === "Polos" ? "btn-success" : "btn-light"}`}
            >
              Polos
            </button>
            <button
              onClick={() => HandleClickRoti("Pastry")}
              className={`btn border ${Roti === "Pastry" ? "btn-success" : "btn-light"}`}
            >
              Pastry
            </button>
          </div>
          <h3 className={style.label}>Pilihan Ukuran : {Ukuran}</h3>
          <div className={style.pilihan}>
            <button
              onClick={() => HandleClickUkuran("Large")}
              className={`btn border ${Ukuran === "Large" ? "btn-success" : "btn-light"}`}
            >
              Large
            </button>
            <button
              onClick={() => HandleClickUkuran("Small")}
              className={`btn border ${Ukuran === "Small" ? "btn-success" : "btn-light"}`}
            >
              Small
            </button>
          </div>
          <h3 className={style.label}>Pilihan Rasa : {Rasa}</h3>
          <div className={style.pilihan}>
            <button
              onClick={() => HandleClickRasa("Strawberry")}
              className={`btn border ${Rasa === "Strawberry" ? "btn-success" : "btn-light"}`}
            >
              Strawberry
            </button>
            <button
              onClick={() => HandleClickRasa("Blueberry")}
              className={`btn border ${Rasa === "Blueberry" ? "btn-success" : "btn-light"}`}
            >
              Blueberry
            </button>
            <button
              onClick={() => HandleClickRasa("Coklat")}
              className={`btn border ${Rasa === "Coklat" ? "btn-success" : "btn-light"}`}
            >
              Coklat
            </button>
            <button
              onClick={() => HandleClickRasa("Tiramisu")}
              className={`btn border ${Rasa === "Tiramisu" ? "btn-success" : "btn-light"}`}
            >
              Tiramisu
            </button>
            <button
              onClick={() => HandleClickRasa("Matcha")}
              className={`btn border ${Rasa === "Matcha" ? "btn-success" : "btn-light"}`}
            >
              Matcha
            </button>
            <button
              onClick={() => HandleClickRasa("Keju")}
              className={`btn border ${Rasa === "Keju" ? "btn-success" : "btn-light"}`}
            >
              Keju
            </button>
          </div>
          <h3 className={style.label}>Pilihan Topping : {Topping}</h3>
          <div className={style.pilihan}>
            <button
              onClick={() => HandleClickTopping("Kacang")}
              className={`btn border ${Topping === "Kacang" ? "btn-success" : "btn-light"}`}
            >
              Kacang
            </button>
            <button
              onClick={() => HandleClickTopping("Oreo")}
              className={`btn border ${Topping === "Oreo" ? "btn-success" : "btn-light"}`}
            >
              Oreo
            </button>
            <button
              onClick={() => HandleClickTopping("Keju")}
              className={`btn border ${Topping === "Keju" ? "btn-success" : "btn-light"}`}
            >
              Keju
            </button>
          </div>
          <br />
          <div className={style.pilihan}>
            <button
              onClick={() => HandleClickSubmit()}
              className="btn btn-success"
            >
              Order Sekarang!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Menu;
