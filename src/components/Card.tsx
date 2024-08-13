import Badge from "./ui/Badge";
import Button from "./ui/Button";
import card from "../assets/svg/card.svg";
import { Link } from "react-router-dom";
import { Product } from "../types/productTypes";
import { useCartStore } from "../services/stores/store";

type CardProps = {
  product: Product;
};
export default function Card({ product }: CardProps) {
  const { addToCart } = useCartStore((state) => ({
    addToCart: state.addToCart,
  }));

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <article className="w-full space-y-4 group shrink-0">
      <div className="h-xl relative rounded-4xl overflow-hidden">
        <div className="w-full h-full absolute top-0 left-0 bg-black/50 rounded-4xl flex justify-center items-end gap-1 p-7 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" onClick={handleAddToCart}>
            <img src={card} alt="card icon" />
            Add to cart
          </Button>
          <Link to={`/product/${product?.productId}`}>
            <Button
              variant="tertiary"
              className="outline-white color-white !bg-transparent"
            >
              BUY NOW
            </Button>
          </Link>
        </div>
        <Badge className="absolute top-7 left-7 z-10">GET OFF 20%</Badge>
        <img
          src={product?.featuredImage}
          alt="card"
          className="w-full h-full object-cover bg-gray-light"
        />
      </div>
      <div className="space-y-0.5">
        <p className="text-3xl font-bold uppercase line-clamp-1">
          {product?.title}
        </p>
        <p className="text-gray-dark text-[28px] font-semibold">
          ${product?.amount}
        </p>
      </div>
    </article>
  );
}
