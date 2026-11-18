import Badge from "./ui/Badge";
import Button, { ButtonLink } from "./ui/Button";
import card from "../assets/svg/card.svg";
import { Link } from "react-router-dom";
import { ProductSummary } from "../types/productTypes";
import { useCartStore } from "../services/stores/store";
import ProductImg from "./ui/ProductImg";
import { formatPrice } from "../utils/format";
import { useState } from "react";

type CardProps = {
  product: ProductSummary;
  priority?: boolean;
};

export default function Card({ product, priority = false }: CardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const variant = product.defaultVariant;
  const productUrl = `/product/${product.productId}`;

  const handleAddToCart = () => {
    if (!variant) return;
    addToCart({
      variantId: variant.id,
      productId: product.productId,
      title: product.title,
      image: variant.image ?? product.image,
      price: variant.price,
      options: variant.selectedOptions,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="w-full space-y-4 group shrink-0">
      <div className="h-xl relative rounded-4xl overflow-hidden bg-gray-light">
        <Link to={productUrl} aria-label={product.title} tabIndex={-1}>
          <ProductImg
            image={product.image}
            sizes="(max-width: 640px) 90vw, 400px"
            fallbackWidth={480}
            priority={priority}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="w-full h-full absolute top-0 left-0 bg-black/50 rounded-4xl flex justify-center items-end gap-1 p-7 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100 [@media(hover:none)]:bg-transparent [@media(hover:none)]:bg-gradient-to-t [@media(hover:none)]:from-black/50 [@media(hover:none)]:via-transparent transition-opacity pointer-events-none">
          <Button
            variant="secondary"
            onClick={handleAddToCart}
            disabled={!variant}
            className="pointer-events-auto disabled:opacity-60"
          >
            <img src={card} alt="" aria-hidden="true" />
            {variant ? (added ? "Added!" : "Add to cart") : "Sold out"}
          </Button>
          <ButtonLink
            to={productUrl}
            variant="tertiary"
            className="pointer-events-auto outline-white !bg-transparent hover:!bg-white/20"
          >
            BUY NOW
          </ButtonLink>
        </div>
        <Badge className="absolute top-7 left-7 z-10">GET OFF 20%</Badge>
      </div>
      <Link to={productUrl} className="block space-y-0.5">
        <p className="text-3xl font-bold uppercase line-clamp-1">
          {product.title}
        </p>
        <p className="text-gray-dark text-[28px] font-semibold">
          {formatPrice(product.price.amount, product.price.currencyCode)}
        </p>
      </Link>
    </article>
  );
}

export function CardSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse" aria-hidden="true">
      <div className="h-xl rounded-4xl bg-gray-light" />
      <div className="space-y-2">
        <div className="h-8 w-3/4 rounded-full bg-gray-light" />
        <div className="h-7 w-1/3 rounded-full bg-gray-light" />
      </div>
    </div>
  );
}
