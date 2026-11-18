import { Link } from "react-router-dom";
import remove from "../assets/svg/remove.svg";
import plus from "../assets/svg/plus.svg";
import trash from "../assets/svg/trash.svg";
import { CartItem } from "../types/productTypes";
import { MAX_QUANTITY, useCartStore } from "../services/stores/store";
import ProductImg from "./ui/ProductImg";
import { formatOptions, formatPrice } from "../utils/format";

export default function TableCard({ item }: { item: CartItem }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const { currencyCode } = item.price;

  return (
    <div className="grid grid-cols-8 text-xs font-medium items-center py-5 border-b border-gray-light">
      <div className="col-span-4 flex gap-2.5 items-center">
        <Link
          to={`/product/${item.productId}`}
          className="size-[70px] shrink-0 rounded-lg overflow-hidden"
        >
          <ProductImg
            image={item.image}
            sizes="70px"
            fallbackWidth={140}
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="space-y-0.5 grow mr-5">
          <Link to={`/product/${item.productId}`} className="hover:underline">
            <h4>{item.title}</h4>
          </Link>
          <div className="text-xs text-gray-dark">
            {formatOptions(item.options)}
          </div>
          <div>{formatPrice(item.price.amount, currencyCode)}</div>
        </div>
      </div>
      <div className="col-span-3 flex justify-center items-center gap-2 mx-auto">
        <div className="p-3 max-sm:p-2 flex w-fit justify-center items-center gap-6 max-sm:gap-3 bg-gray-light/40 rounded-full">
          <button
            onClick={() => decreaseQuantity(item.variantId)}
            type="button"
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.title}`}
            className="disabled:opacity-40"
          >
            <img src={remove} alt="" className="size-5" />
          </button>
          <span className="text-sm font-medium min-w-[2ch] text-center" aria-live="polite">
            {item.quantity}
          </span>
          <button
            onClick={() => increaseQuantity(item.variantId)}
            type="button"
            disabled={item.quantity >= MAX_QUANTITY}
            aria-label={`Increase quantity of ${item.title}`}
            className="disabled:opacity-40"
          >
            <img src={plus} alt="" className="size-5" />
          </button>
        </div>
        <button
          onClick={() => removeFromCart(item.variantId)}
          type="button"
          aria-label={`Remove ${item.title} from cart`}
          className="p-3 max-sm:p-2 rounded-full bg-gray-light/40 hover:bg-gray-light"
        >
          <img src={trash} alt="" className="size-5" />
        </button>
      </div>
      <div className="col-span-1 text-right text-sm font-semibold">
        {formatPrice(item.price.amount * item.quantity, currencyCode)}
      </div>
    </div>
  );
}
