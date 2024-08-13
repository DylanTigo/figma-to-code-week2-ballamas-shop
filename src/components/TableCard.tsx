import remove from "../assets/svg/remove.svg";
import plus from "../assets/svg/plus.svg";
import trash from "../assets/svg/trash.svg";

import { Product } from "../types/productTypes";
import { useCartStore } from "../services/stores/store";

export default function TableCard( { product } : {product: Product}) {

  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore((state) => ({
    increaseQuantity: state.increaseQuantity,
    decreaseQuantity: state.decreaseQuantity,
    removeFromCart: state.removeFromCart,
  }));

  return (
    <div className="grid grid-cols-8 text-xs font-medium items-center py-5 border-b border-gray-light">
      <div className="col-span-4 flex gap-2.5 items-center">
        <div className="size-[70px]">
          <img src={product.featuredImage} alt="image" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="space-y-0.5 grow mr-5">
          <h4>{product.title}</h4>
          <div className="text-xs text-gray-dark">{product.color +" - "+product.size}</div>
          <div>${product?.amount}</div>
        </div>
      </div>
      <div className="col-span-3 flex justify-center items-center gap-2 mx-auto">
        <div className="p-3 flex w-fit justify-center items-center gap-6 bg-gray-light/40 rounded-full ">
          <button onClick={() => decreaseQuantity(product.id)} type="button" className={product.quantity === 1 ? "opacity-60" : ""}><img src={remove} alt="remove icon" className="size-5" /></button>
          <span className="text-sm font-medium">{product.quantity}</span>
          <button onClick={() => increaseQuantity(product.id)} type="button"><img src={plus} alt="plus icon" className="size-5" /></button>
        </div>
        <button onClick={() => removeFromCart(product.id)} type="button" className="p-3 rounded-full bg-gray-light/40"><img src={trash} alt="trash icon" className="size-5" /></button>
      </div>
      <div className="col-span-1 text-right text-sm font-semibold">${product?.amount && product?.quantity &&product?.amount*product?.quantity}</div>
    </div>
  );
}
