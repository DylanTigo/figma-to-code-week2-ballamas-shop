import { Link } from "react-router-dom";
import { LEFT_NAV, SHOP_LINK } from "./navLinks";

type MenuProps = {
  menuActive: boolean;
};

export default function Menu({ menuActive }: MenuProps) {
  return (
    <nav
      aria-label="Mobile menu"
      aria-hidden={!menuActive}
      className={`fixed z-20 top-0 left-0 space-y-11 bg-white w-full h-lvh transition-opacity duration-500 pt-36 sm:pt-[150px] ${
        menuActive ? "" : "auto-alpha"
      }`}
    >
      <div className="flex text-lg flex-col items-center justify-center gap-4.5">
        {[...LEFT_NAV, SHOP_LINK, { label: "Cart", to: "/cart" }].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            tabIndex={menuActive ? 0 : -1}
            className="w-full text-center"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
