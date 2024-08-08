
export default function FilterNav() {
  return (
    <nav className="flex items-center sm:justify-center flex-wrap  gap-3.5">
        <button className="text-black bg-none text-xl flex gap-2 items-center outline outline-2 px-3.5 py-2.5 rounded-full outline-black active">All <span className="text-base">132</span></button>
        <button className="text-black bg-none text-xl flex gap-2 items-center outline outline-2 px-3.5 py-2.5 rounded-full outline-black">Accessories <span className="text-base">13</span></button>
        <button className="text-black bg-none text-xl flex gap-2 items-center outline outline-2 px-3.5 py-2.5 rounded-full outline-black">Featured <span className="text-base">67</span></button>
        <button className="text-black bg-none text-xl flex gap-2 items-center outline outline-2 px-3.5 py-2.5 rounded-full outline-black">Unisex <span className="text-base">52</span></button>
    </nav>
  )
}
