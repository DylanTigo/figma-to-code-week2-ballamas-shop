type ToggleMenuBtnProps = {
    menuActive: boolean,
    setMenuActive: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ToggleMenuBtn( { menuActive, setMenuActive }: ToggleMenuBtnProps ) {

  return (
    <button type="button" onClick={() => setMenuActive(!menuActive)} className="w-11 h-7 flex items-center justify-center relative">
      <div className="flex flex-col justify-between items-center w-7 h-3 lg:hidden">
        <span className={`${menuActive ? "rotate-[22deg]" : "rotate-0"} origin-left w-7 h-0.5 bg-black transition-transform rounded-full`}></span>
        <span className={`${menuActive ? "-rotate-[22deg]" : "rotate-0"} origin-left w-7 h-0.5 bg-black transition-transform rounded-full`}></span>
      </div>
    </button>
  );
}
