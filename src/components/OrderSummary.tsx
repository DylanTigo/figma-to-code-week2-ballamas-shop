import {
  selectCurrency,
  selectDiscount,
  selectSubtotal,
  useCartStore,
} from "../services/stores/store";
import { formatPrice } from "../utils/format";

type OrderSummaryProps = {
  /** Frais de livraison ; non affichés si undefined (page panier) */
  shipping?: number;
};

export default function OrderSummary({ shipping }: OrderSummaryProps) {
  const subtotal = useCartStore(selectSubtotal);
  const discount = useCartStore(selectDiscount);
  const discountCode = useCartStore((state) => state.discountCode);
  const currency = useCartStore(selectCurrency);
  const total = subtotal - discount + (shipping ?? 0);

  return (
    <div className="space-y-3 text-sm">
      <div className="space-y-1 text-gray-dark pb-3 border-b border-gray-light">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount{discountCode && ` (${discountCode})`}</span>
          <span>
            {discount > 0 && "-"}
            {formatPrice(discount, currency)}
          </span>
        </div>
        {shipping !== undefined && (
          <div className="flex justify-between items-center">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping, currency)}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="font-semibold">Order Total</span>
        <span className="font-extrabold text-base">
          {formatPrice(total, currency)}
        </span>
      </div>
    </div>
  );
}
