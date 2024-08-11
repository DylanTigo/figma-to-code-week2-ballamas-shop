import remove from "../assets/svg/remove.svg";
import plus from "../assets/svg/plus.svg";
import trash from "../assets/svg/trash.svg";

import image from "../assets/image/jordan.png";

export default function TableCard() {
  return (
    <div className="grid grid-cols-8 text-xs font-medium items-center py-5 border-b border-gray-light">
      <div className="col-span-4 flex gap-2.5 items-center">
        <div className="size-[70px]">
          <img src={image} alt="image" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="space-y-0.5 grow mr-5">
          <h4>Jordan</h4>
          <div className="text-xs text-gray-dark">Jordan</div>
          <div>$99</div>
        </div>
      </div>
      <div className="col-span-3 flex justify-center items-center gap-2 mx-auto">
        <div className="p-3 flex w-fit justify-center items-center gap-6 bg-gray-light/40 rounded-full ">
          <button type="button"><img src={remove} alt="remove icon" className="size-5" /></button>
          <span className="text-sm font-medium">1</span>
          <button type="button"><img src={plus} alt="plus icon" className="size-5" /></button>
        </div>
        <button type="button" className="p-3 rounded-full bg-gray-light/40"><img src={trash} alt="trash icon" className="size-5" /></button>
      </div>
      <div className="col-span-1 text-right text-sm font-semibold">$99</div>
    </div>
  );
}
