import { Link, NavLink } from "react-router-dom"
import searchIcon from "../assets/svg/search.svg"
import card from "../assets/svg/cart-2.svg"
import user from "../assets/svg/user.svg"
import Logo from "./ui/Logo"
import Menu from "./Menu"
import { useEffect, useState } from "react"
import ToggleMenuBtn from "./ui/ToggleMenuBtn"
import useResize from "../hooks/useResize"
import { useCartStore } from "../services/stores/store"

export default function Header() {
  const [menuActive, setMenuActive] = useState(false)
  const { width } = useResize()
  useEffect(() => {
    if (width > 1024) {
      setMenuActive(false)
    }
  }, [width])
  
  const products = useCartStore((state) => state.products)

  return (
    <>
      <header className="sticky top-0 left-0 z-50 bg-white">
        <div className="text-center bg-black text-[10px] sm:text-xs text-white py-4 font-normal font-jetbrains">Sign up and get 20% off for all new arrivals collections</div>
        <div className="highContainer py-5 border-b border-gray-light flex justify-between items-center relative">
          <nav className="flex gap-4.5 max-lg:hidden">
            <Link to="#">Men</Link>
            <Link to="#">Women</Link>
            <Link to="#">Kids</Link>
            <Link to="#">Collection</Link>
          </nav>
          <ToggleMenuBtn menuActive={menuActive} setMenuActive={setMenuActive}/>
          <NavLink to={"/"} className="flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo variant="black"/>
          </NavLink>
          <nav className="flex gap-4.5">
            <div className="flex gap-4.5 max-lg:hidden">
              <Link to="#">Shop</Link>
              <Link to="#">About Us</Link>
              <Link to="#" className="flex items-center gap-x-2.5"><img src={user} alt="user icon" className="size-4.5"/> Account</Link>
              <Link to="/cart">Cart(<span className="transition-transform">{ products.length}</span>)</Link>
            </div>
            <Link to="#"><img src={searchIcon} alt="search icon" className="size-5" /></Link>
            <Link to="/cart" className="lg:hidden relative"><img src={card} alt="card icon" className="size-5" /><div className="size-3 flex transition-transform justify-center items-center text-[8px] bg-black text-gray-light absolute -right-0.5 -bottom-0.5 rounded-full">{ products.length}</div></Link>
          </nav>
        </div>
      </header>
      <Menu menuActive={menuActive} />
    </>
  )
}
