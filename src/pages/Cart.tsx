import { Link } from "react-router-dom";
import trash from "../assets/svg/trash1.svg";
import TableCard from "../components/TableCard";
import Button from "../components/ui/Button";
import { useCartStore } from "../services/stores/store";

export default function Cart() {
  const products = useCartStore((state) => state.products);
  const { clearCart } = useCartStore((state) => ({
    clearCart: state.clearCart,
  }));
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const discount = 0;

  return (
    <div className="mt-16 mb-24 grid grid-cols-12 justify-center gap-5">
      <div className="col-span-full lg:col-span-8 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold font-chillax text-lg sm:text-2xl">
            Cart({products.length})
          </h2>
          <button
            type="button"
            onClick={clearCart}
            className="flex justify-center text-xs text-gray-dark items-center gap-1 p-2 bg-gray-light/50 rounded-full"
          >
            <img
              src={trash}
              alt="remove icon"
              className="size-3.5 text-gray-dark"
            />{" "}
            Clear Card
          </button>
        </div>
        <div className="grid grid-cols-8 text-xs font-medium text-gray-dark py-3 border-b border-gray-light">
          <div className="col-span-4">
            <p>Product</p>
          </div>
          <div className="col-span-3 text-center">
            <p>Quantity</p>
          </div>
          <div className="col-span-1 text-center">
            <p>Price</p>
          </div>
        </div>
        <div className="!mt-0">
          {products.map((product) => (
            <TableCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="col-span-full lg:col-span-4 lg:ml-5 px-7 py-3.5 mx-auto max-w-xl w-full h-fit border border-gray-light rounded-xl space-y-4">
        <h3 className="font-semibold text-lg">Order Summary</h3>
        <div className="space-y-3">
          <div className="space-y-1 text-sm text-gray-dark pb-3 border-b border-gray-light">
            <div className="flex justify-between items-center">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Discount</p>
              <p>${discount}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-sm">Order Total</p>
              <p className="font-extrabold text-base">
                ${totalPrice - discount}
              </p>
            </div>
            <Link to={"/checkout"}>
              <Button className="w-full">Checkout now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
