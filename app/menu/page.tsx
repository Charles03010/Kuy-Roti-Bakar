import style from './menu.module.css'
import Navbar from '../components/navbar/Navbar'
import Menu from '../components/menu/Menu'

export default function MenuPage(){
  return (
    <>
      <Navbar menu={"active"} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Menu />
    </>
  )
}
