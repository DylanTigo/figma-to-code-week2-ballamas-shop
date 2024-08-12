import image from "../assets/image/jordan.png";

export default function CheckoutCard() {
  return (
    <div className="flex justify-center items-center gap-2.5">
        <div className="size-[72px]">
          <img
            src={image}
            alt="image"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
       <div className="grow space-y-0.5">
          <h5 className="text-sm font-semibold">Jordan</h5>
          <div className="text-xs text-gray-dark">Color: Green - Size: Large</div>
       </div>
       <div className="text-sm font-semibold">$119</div>
    </div>
  );
}
