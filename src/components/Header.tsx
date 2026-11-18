import { Link, NavLink, useLocation } from "react-router-dom";
import card from "../assets/svg/cart-2.svg";
import user from "../assets/svg/user.svg";
import Logo from "./ui/Logo";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import ToggleMenuBtn from "./ui/ToggleMenuBtn";
import useResize from "../hooks/useResize";
import { selectItemCount, useCartStore } from "../services/stores/store";
import { LEFT_NAV, SHOP_LINK } from "./navLinks";

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const { width } = useResize();
  const location = useLocation();
  const itemCount = useCartStore(selectItemCount);

  useEffect(() => {
    if (width > 1024) setMenuActive(false);
  }, [width]);

  // Ferme le menu mobile à chaque navigation
  useEffect(() => {
    setMenuActive(false);
  }, [location.pathname, location.search, location.hash]);

  return (
    <>
      <header className="sticky top-0 left-0 z-50 bg-white">
        <div className="text-center bg-black text-[10px] sm:text-xs text-white py-4 font-normal font-jetbrains">
          Sign up and get 20% off for all new arrivals collections
        </div>
        <div className="highContainer py-5 border-b border-gray-light flex justify-between items-center relative">
          <nav aria-label="Collections" className="flex gap-4.5 max-lg:hidden">
            {LEFT_NAV.map((item) => (
              <Link key={item.label} to={item.to} className="hover:underline underline-offset-4">
                {item.label}
              </Link>
            ))}
          </nav>
          <ToggleMenuBtn menuActive={menuActive} setMenuActive={setMenuActive} />
          <NavLink
            to={"/"}
            aria-label="Ballamas home"
            className="flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Logo variant="black" />
          </NavLink>
          <nav aria-label="Shop" className="flex gap-4.5">
            <div className="flex gap-4.5 max-lg:hidden">
              <Link to={SHOP_LINK.to} className="hover:underline underline-offset-4">
                {SHOP_LINK.label}
              </Link>
              <span className="flex items-center gap-x-2.5 text-gray-dark cursor-default" title="Coming soon">
                <img src={user} alt="" className="size-4.5" /> Account
              </span>
              <Link to="/cart" className="hover:underline underline-offset-4">
                Cart(<span>{itemCount}</span>)
              </Link>
            </div>
            <Link
              to="/cart"
              className="lg:hidden relative"
              aria-label={`Cart, ${itemCount} item${itemCount > 1 ? "s" : ""}`}
            >
              <img src={card} alt="" className="size-5" />
              <div className="min-w-3 h-3 px-0.5 flex justify-center items-center text-[8px] bg-black text-gray-light absolute -right-0.5 -bottom-0.5 rounded-full">
                {itemCount}
              </div>
            </Link>
          </nav>
        </div>
      </header>
      <Menu menuActive={menuActive} />
    </>
  );
}
