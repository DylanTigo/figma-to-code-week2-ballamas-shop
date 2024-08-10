import { NavLink } from "react-router-dom"
import searchIcon from "../assets/svg/search.svg"
import card from "../assets/svg/cart-2.svg"
import user from "../assets/svg/user.svg"
import Logo from "./ui/Logo"
import Menu from "./Menu"
import { useEffect, useState } from "react"
import ToggleMenuBtn from "./ui/ToggleMenuBtn"
import useResize from "../hooks/useResize"

export default function Header() {
  const [menuActive, setMenuActive] = useState(false)
  const { width } = useResize()
  useEffect(() => {
    console.log(width)
    if (width > 1024) {
      setMenuActive(false)
    }
  }, [width])

  return (
    <>
      <header className="sticky top-0 left-0 z-50 bg-white">
        <div className="text-center bg-black text-[10px] sm:text-xs text-white py-4 font-normal font-jetbrains">Sign up and get 20% off for all new arrivals collections</div>
        <div className="highContainer py-5 border-b border-gray-light flex justify-between items-center">
          <nav className="flex gap-4.5 max-lg:hidden">
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Kids</a>
            <a href="#">Collection</a>
          </nav>
          <ToggleMenuBtn menuActive={menuActive} setMenuActive={setMenuActive}/>
          <NavLink to={"/"} className="flex items-center">
            <Logo variant="black"/>
          </NavLink>
          <nav className="flex gap-4.5">
            <div className="flex gap-4.5 max-lg:hidden">
              <a href="#">Shop</a>
              <a href="#">About Us</a>
              <a href="#" className="flex items-center gap-x-2.5"><img src={user} alt="user icon" className="size-4.5"/> Account</a>
              <a href="#">Cart(0)</a>
            </div>
            <a href="#"><img src={searchIcon} alt="search icon" className="size-5" /></a>
            <a href="#" className="lg:hidden"><img src={card} alt="card icon" className="size-5" /></a>
          </nav>
        </div>
      </header>
      <Menu menuActive={menuActive}/>
    </>
  )
}
