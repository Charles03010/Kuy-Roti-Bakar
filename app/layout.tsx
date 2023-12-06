import Loader from "./components/loader/Loader";
import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const montserrat = Montserrat({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Kuy! Roti Bakar 🍞",
  description: "Roti Bakar dengan Pastry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${montserrat.variable}`}>
        <Loader />
        {children}
      </body>
    </html>
  );
}
