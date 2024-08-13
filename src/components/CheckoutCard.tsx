import { Product } from "../types/productTypes";

export default function CheckoutCard( { product } : {product: Product}) {
  return (
    <div className="flex justify-center items-center gap-2.5">
        <div className="size-[72px]">
          <img
            src={product.featuredImage}
            alt={product.title + " image"}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
       <div className="grow space-y-0.5">
          <h5 className="text-sm font-semibold capitalize">{product.title}</h5>
          <div className="text-xs text-gray-dark">Color: {product.color} - Size: {product.size}</div>
       </div>
       <div className="text-sm font-semibold">${product.amount && product.amount*product.quantity}</div>
    </div>
  );
}
