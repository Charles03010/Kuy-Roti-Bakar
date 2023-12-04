import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
export default function Home() {
  return (
    <>
      <Navbar home={"active"} />
      <Hero />
    </>
  );
}
