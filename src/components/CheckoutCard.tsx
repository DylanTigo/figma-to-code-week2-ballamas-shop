import { CartItem } from "../types/productTypes";
import { formatOptions, formatPrice } from "../utils/format";
import ProductImg from "./ui/ProductImg";

export default function CheckoutCard({ item }: { item: CartItem }) {
  return (
    <div className="flex justify-center items-center gap-2.5">
      <div className="size-[72px] shrink-0 relative">
        <ProductImg
          image={item.image}
          sizes="72px"
          fallbackWidth={144}
          className="w-full h-full object-cover rounded-lg"
        />
        {item.quantity > 1 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-black text-white text-[10px]">
            {item.quantity}
          </span>
        )}
      </div>
      <div className="grow space-y-0.5">
        <h5 className="text-sm font-semibold capitalize">{item.title}</h5>
        <div className="text-xs text-gray-dark">
          {formatOptions(item.options)}
          {item.quantity > 1 && ` · Qty ${item.quantity}`}
        </div>
      </div>
      <div className="text-sm font-semibold">
        {formatPrice(item.price.amount * item.quantity, item.price.currencyCode)}
      </div>
    </div>
  );
}
