import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Menu from "./components/menu/Menu";
import Ojol from "./components/ojol/Ojol";
export default function Home() {
  return (
    <>
      <Navbar home={"active"} />
      <Hero />
      <Menu />
      <Ojol />
    </>
  );
}
