import { useEffect, useRef } from "react"
import user from "../assets/svg/user.svg"

type MenuProps = {
    menuActive: boolean,
}

export default function Menu( { menuActive }: MenuProps ) {
  const nav = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (menuActive) {
      nav.current?.classList.remove("auto-alpha") 
    }else {
      nav.current?.classList.add("auto-alpha") 
    }
  }, [menuActive])
  return (
    <nav ref={nav} className="fixed z-20 top-0 left-0 space-y-11 bg-white w-full h-lvh auto-alpha transition-opacity duration-500 pt-36 sm:pt-[150px]">
      <div className="flex text-lg flex-col items-center justify-center gap-4.5">
        <a href="#" className="w-full text-center">Men</a>
        <a href="#" className="w-full text-center">Women</a>
        <a href="#" className="w-full text-center">Kids</a>
        <a href="#" className="w-full text-center">Collection</a>
        <a href="#" className="w-full text-center">Shop</a>
        <a href="#" className="w-full text-center">About Us</a>
        <a href="#" className="w-full text-center flex items-center justify-center gap-2.5"><img src={user} alt="user icon" className="size-4.5"/> Account</a>
      </div>
      <div className="flex flex-col items-center justify-center gap-2.5">
        <a href="#" className="w-full text-center">FAQ</a>
        <a href="#" className="w-full text-center">Contact Us</a>
      </div>
    </nav>
  )
}
