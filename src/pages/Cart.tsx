import trash from "../assets/svg/trash1.svg";
import TableCard from "../components/TableCard";
import { ButtonLink } from "../components/ui/Button";
import OrderSummary from "../components/OrderSummary";
import { selectItemCount, useCartStore } from "../services/stores/store";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const itemCount = useCartStore(selectItemCount);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <div className="mt-16 mb-24 min-h-[45vh] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-semibold font-chillax text-lg sm:text-2xl">
          Your cart is empty
        </h2>
        <p className="text-gray-dark text-sm">
          Browse our latest collection and find something you love.
        </p>
        <ButtonLink to="/#products">Start shopping</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-16 mb-24 grid grid-cols-12 justify-center gap-5">
      <div className="col-span-full lg:col-span-8 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold font-chillax text-lg sm:text-2xl">
            Cart({itemCount})
          </h2>
          <button
            type="button"
            onClick={clearCart}
            className="flex justify-center text-xs text-gray-dark items-center gap-1 p-2 bg-gray-light/50 hover:bg-gray-light rounded-full"
          >
            <img src={trash} alt="" className="size-3.5" />
            Clear Cart
          </button>
        </div>
        <div className="grid grid-cols-8 text-xs font-medium text-gray-dark py-3 border-b border-gray-light">
          <div className="col-span-4">
            <p>Product</p>
          </div>
          <div className="col-span-3 text-center">
            <p>Quantity</p>
          </div>
          <div className="col-span-1 text-right">
            <p>Price</p>
          </div>
        </div>
        <div className="!mt-0">
          {items.map((item) => (
            <TableCard key={item.variantId} item={item} />
          ))}
        </div>
      </div>
      <div className="col-span-full lg:col-span-4 lg:ml-5 px-7 py-3.5 mx-auto max-w-xl w-full h-fit border border-gray-light rounded-xl space-y-4">
        <h3 className="font-semibold text-lg">Order Summary</h3>
        <OrderSummary />
        <ButtonLink to="/checkout" className="!w-full">
          Checkout now
        </ButtonLink>
      </div>
    </div>
  );
}
