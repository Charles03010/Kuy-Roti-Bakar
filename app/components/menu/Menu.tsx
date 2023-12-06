"use client";
import { useState, useEffect } from "react";
import style from "./menu.module.css";
import Image from "next/image";

const Menu = () => {
  const [Data, setData] = useState({
    Text: "",
    Keranjang: [
      {
        Roti: "",
        Rasa: "",
        Ukuran: "",
        Topping: "",
        Foto: "Polos",
        Harga: 0,
      },
    ],
  });
  function HandleSetData(key: string, value: any) {
    setData((prevState) => ({
      ...prevState,
      Keranjang: [
        {
          ...prevState.Keranjang[0],
          [key]: value,
        },
      ],
    }));
  }
  function HandleClickSubmit() {
    let text = "";
    if (Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Roti === "") {
      text = "Pilih Roti Dulu!";
    } else if (Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Ukuran === "") {
      text = "Pilih Ukuran Dulu!";
    } else if (Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa === "") {
      text = "Pilih Rasa Dulu!";
    } else {
      let message = `Halo, saya ingin memesan roti ${Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Roti} dengan ukuran ${Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Ukuran} dan rasa ${Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa}.`;
      if (Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Topping != "") {
        message += `Topping yang saya pilih adalah ${Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Topping}.`;
      }
      const phoneNumber = "62895616602968";
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
        )}`;
        window.location.href = whatsappUrl;
      }
      setData((prevState) => ({
        ...prevState,
        Text: text,
      }));
  }
  useEffect(() => {
    if (Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa != "") {
    setData((prevState) => ({
      ...prevState,
      Keranjang: [
        {
          ...prevState.Keranjang[0],
          Foto: Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa,
        },
      ],
    }));}
  })
  return (
    <>
      <h2 id="Menu" className={style.title}>
        Menu
      </h2>
      <div className={style.menu}>
        <Image
          className={style.menuImage}
          src={`/menu/${Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Foto}.jpg`}
          alt="Kuy Logo"
          width={500}
          height={0}
          quality={100}
          loading="lazy"
        />
        <div>
          {Data.Text !== "" ? (
            <div className="alert alert-danger" role="alert">
              {Data.Text}
            </div>
          ) : (
            ""
          )}
          <h3 className={style.label}>Pilihan Roti : {Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Roti}</h3>
          <div className={style.pilihan}>
            <button
              onClick={() => HandleSetData("Roti","Polos")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Roti === "Polos" ? "btn-success" : "btn-light"
              }`}
            >
              Polos
            </button>
            <button
              onClick={() => HandleSetData("Roti","Pastry")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Roti === "Pastry" ? "btn-success" : "btn-light"
              }`}
            >
              Pastry
            </button>
          </div>
          <h3 className={style.label}>Pilihan Ukuran : {Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Ukuran}</h3>
          <div className={style.pilihan}>
            <button
              onClick={() => HandleSetData("Ukuran","Large")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Ukuran === "Large" ? "btn-success" : "btn-light"
              }`}
            >
              Large
            </button>
            <button
              onClick={() => HandleSetData("Ukuran","Small")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Ukuran === "Small" ? "btn-success" : "btn-light"
              }`}
            >
              Small
            </button>
          </div>
          <h3 className={style.label}>Pilihan Rasa : {Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa}</h3>
          <div className={style.pilihan}>
            <button
              onClick={() => HandleSetData("Rasa","Strawberry")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa === "Strawberry" ? "btn-success" : "btn-light"
              }`}
            >
              Strawberry
            </button>
            <button
              onClick={() => HandleSetData("Rasa","Blueberry")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa === "Blueberry" ? "btn-success" : "btn-light"
              }`}
            >
              Blueberry
            </button>
            <button
              onClick={() => HandleSetData("Rasa","Coklat")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa === "Coklat" ? "btn-success" : "btn-light"
              }`}
            >
              Coklat
            </button>
            <button
              onClick={() => HandleSetData("Rasa","Tiramisu")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa === "Tiramisu" ? "btn-success" : "btn-light"
              }`}
            >
              Tiramisu
            </button>
            <button
              onClick={() => HandleSetData("Rasa","Matcha")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa === "Matcha" ? "btn-success" : "btn-light"
              }`}
            >
              Matcha
            </button>
            <button
              onClick={() => HandleSetData("Rasa","Keju")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Rasa === "Keju" ? "btn-success" : "btn-light"
              }`}
            >
              Keju
            </button>
          </div>
          <h3 className={style.label}>Pilihan Topping : {Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Topping}</h3>
          <div className={style.pilihan}>
            <button
              onClick={() => HandleSetData("Topping","Kacang")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Topping === "Kacang" ? "btn-success" : "btn-light"
              }`}
            >
              Kacang
            </button>
            <button
              onClick={() => HandleSetData("Topping","Oreo")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Topping === "Oreo" ? "btn-success" : "btn-light"
              }`}
            >
              Oreo
            </button>
            <button
              onClick={() => HandleSetData("Topping","Keju")}
              className={`btn border ${
                Data.Keranjang[Object.keys(Data.Keranjang).length - 1].Topping === "Keju" ? "btn-success" : "btn-light"
              }`}
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
