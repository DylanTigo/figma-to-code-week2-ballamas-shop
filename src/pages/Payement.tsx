import { Navigate } from "react-router-dom";
import success from "../assets/svg/success.svg";
import { ButtonLink } from "../components/ui/Button";
import { useCartStore } from "../services/stores/store";
import { formatPrice } from "../utils/format";

export default function Payement() {
  const order = useCartStore((state) => state.lastOrder);

  // Accès direct à /payment sans commande : retour à l'accueil
  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="mx-auto py-28 sm:py-32 lg:py-36 min-h-[65vh]">
      <div className="flex flex-col gap-2.5 justify-center items-center">
        <img src={success} alt="" />
        <div className="space-y-1 text-center">
          <h2 className="font-semibold sm:text-lg">
            Thanks for your order{order.firstName ? `, ${order.firstName}` : ""}!
          </h2>
          <p className="text-gray-dark text-xs">
            The order confirmation has been sent to{" "}
            <span className="text-black">{order.email}</span>
          </p>
          <p className="text-gray-dark text-xs">
            Order #{order.id} · {formatPrice(order.total, order.currencyCode)}
          </p>
        </div>
        <ButtonLink to="/" className="mt-4">
          Continue shopping
        </ButtonLink>
      </div>
    </div>
  );
}
