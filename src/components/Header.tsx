import { NavLink } from "react-router-dom"
import searchIcon from "../assets/svg/search.svg"
import user from "../assets/svg/user.svg"
import Logo from "./ui/Logo"

export default function Header() {
  return (
    <header className="w-full sticky top-0 left-0 z-50 bg-white">
      <div className="max-w-12xl mx-auto py-5 flex justify-between items-center">
        <nav className="flex gap-4.5">
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Collection</a>
        </nav>
        <NavLink to={"/"} className="flex items-center">
          <Logo variant="black"/>
        </NavLink>
        <nav className="flex gap-4.5">
          <a href="#">Shop</a>
          <a href="#">About Us</a>
          <a href="#" className="flex items-center gap-x-2.5"><img src={user} alt="user icon" className="size-4.5"/> Account</a>
          <a href="#">Cart(0)</a>
          <a href="#"><img src={searchIcon} alt="search icon" className="size-5" /></a>
        </nav>
      </div>
    </header>
  )
}
