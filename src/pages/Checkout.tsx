import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutCard from "../components/CheckoutCard";
import Button, { ButtonLink } from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputGroup from "../components/InputGroup";
import OrderSummary from "../components/OrderSummary";
import card from "../assets/svg/card.svg";
import bank from "../assets/svg/bank.svg";
import lock from "../assets/svg/lock.svg";
import arrowRight from "../assets/svg/arrow-right.svg";
import {
  SHIPPING_OPTIONS,
  ShippingMethod,
  selectCurrency,
  selectDiscount,
  selectSubtotal,
  useCartStore,
} from "../services/stores/store";
import { formatPrice } from "../utils/format";

type PaymentMethod = "card" | "bank-transfer";

// Mise en forme pendant la saisie : "4242424242424242" -> "4242 4242 4242 4242"
const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

// "1228" -> "12/28"
const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectSubtotal);
  const discount = useCartStore(selectDiscount);
  const currency = useCartStore(selectCurrency);
  const discountCode = useCartStore((state) => state.discountCode);
  const applyDiscountCode = useCartStore((state) => state.applyDiscountCode);
  const removeDiscountCode = useCartStore((state) => state.removeDiscountCode);
  const placeOrder = useCartStore((state) => state.placeOrder);

  const [shipping, setShipping] = useState<ShippingMethod>("free");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const shippingPrice = SHIPPING_OPTIONS[shipping].price;
  const total = subtotal - discount + shippingPrice;

  const handleApplyCode = (e: FormEvent) => {
    e.preventDefault();
    if (applyDiscountCode(codeInput)) {
      setCodeError(null);
      setCodeInput("");
    } else {
      setCodeError("This code is not valid.");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    placeOrder({
      email: String(data.get("email") ?? ""),
      firstName: String(data.get("first-name") ?? ""),
      items,
      subtotal,
      discount,
      shipping: shippingPrice,
      total,
      currencyCode: currency,
    });
    navigate("/payment", { replace: true });
  };

  if (items.length === 0) {
    return (
      <div className="mt-16 mb-24 min-h-[45vh] flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-semibold font-chillax text-lg sm:text-2xl">
          Nothing to checkout yet
        </h2>
        <p className="text-gray-dark text-sm">Your cart is empty.</p>
        <ButtonLink to="/#products">Start shopping</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mt-16 mb-24 space-y-5 text-sm">
      <h2 className="font-semibold font-chillax text-lg sm:text-2xl">
        Checkout
      </h2>
      <div className="grid grid-cols-11 gap-y-10">
        <div className="col-span-full lg:col-span-6 space-y-6 lg:mr-16">
          <div className="space-y-1">
            <h3 className="font-semibold ">Your Order</h3>
            <p className="text-gray-dark text-xs">
              By placing your order, you agree to Ballamas{" "}
              <a href="#" className="text-black underline-offset-1 underline">
                Privacy
              </a>{" "}
              and{" "}
              <a href="#" className="text-black underline-offset-1 underline">
                Policy
              </a>
              .
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              {items.map((item) => (
                <CheckoutCard key={item.variantId} item={item} />
              ))}
            </div>
            <div className="space-y-1 text-xs text-black">
              <label htmlFor="discount-code">Discount Code</label>
              {discountCode ? (
                <div className="flex items-center gap-3">
                  <span className="px-3 py-2 rounded-full bg-gray-light/60 font-semibold">
                    {discountCode} applied
                  </span>
                  <button
                    type="button"
                    onClick={removeDiscountCode}
                    className="underline text-gray-dark"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="flex gap-2 items-stretch">
                  <div className="sm:max-w-[50%] w-full">
                    <Input
                      id="discount-code"
                      type="text"
                      placeholder="Enter your code"
                      value={codeInput}
                      onChange={(e) => {
                        setCodeInput(e.target.value);
                        setCodeError(null);
                      }}
                      aria-invalid={Boolean(codeError)}
                      aria-describedby="discount-help"
                    />
                  </div>
                  <Button type="submit" disabled={!codeInput.trim()} className="disabled:opacity-60">
                    Apply
                  </Button>
                </form>
              )}
              <p id="discount-help" className={codeError ? "text-red-600" : ""}>
                {codeError ?? (
                  <>
                    New customer? Use{" "}
                    <span className="font-semibold">WELCOME20</span>{" "}
                    <span className="text-gray-dark">to get 20% off</span>
                  </>
                )}
              </p>
            </div>
            <OrderSummary shipping={shippingPrice} />
            <fieldset className="space-y-3.5">
              <legend className="font-semibold mb-3.5">Shipping method</legend>
              <div className="flex flex-col gap-3">
                {(Object.keys(SHIPPING_OPTIONS) as ShippingMethod[]).map((method) => {
                  const option = SHIPPING_OPTIONS[method];
                  return (
                    <label
                      key={method}
                      className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                        shipping === method ? "border-black" : "border-gray-light"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={method}
                          checked={shipping === method}
                          onChange={() => setShipping(method)}
                          className="size-4.5 accent-black"
                        />
                        <div className="space-y-0.5">
                          <div>{option.label}</div>
                          <div className="text-xs text-gray-dark">{option.delay}</div>
                        </div>
                      </div>
                      <span>{formatPrice(option.price, currency)}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </div>
        <div className="col-span-full lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <h3 className="font-semibold ">Payment details</h3>
            <p className="text-gray-dark text-xs">
              Complete your purchase by providing your payment details.
            </p>
          </div>
          <form className="space-y-5.5" onSubmit={handleSubmit}>
            <fieldset className="space-y-3 text-xs">
              <legend className="font-semibold text-sm mb-3">Shipping address</legend>
              <div className="space-y-3">
                <div className="flex max-sm:flex-col gap-3">
                  <InputGroup label="First name" id="first-name" type="text" placeholder="Enter your first name" autoComplete="given-name" required />
                  <InputGroup label="Last name" id="last-name" type="text" placeholder="Enter your last name" autoComplete="family-name" required />
                </div>
                <div className="flex max-sm:flex-col gap-3">
                  <InputGroup label="Email address" id="email" type="email" placeholder="Enter your email address" autoComplete="email" required />
                  <InputGroup label="Phone number" id="phone" type="tel" placeholder="Enter your phone number" autoComplete="tel" pattern="\+?[0-9 ]{6,20}" required />
                </div>
                <div className="flex max-sm:flex-col gap-3">
                  <InputGroup label="Address" id="address" type="text" placeholder="Enter your address" autoComplete="street-address" required />
                  <InputGroup label="City" id="city" type="text" placeholder="Enter your city" autoComplete="address-level2" required />
                </div>
                <div className="flex max-sm:flex-col gap-3">
                  <InputGroup label="Region" id="region" type="text" placeholder="Enter your region" autoComplete="address-level1" />
                  <InputGroup label="Postal code" id="postal-code" type="text" placeholder="Enter your postal code" autoComplete="postal-code" required />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-3 text-xs mb-5.5">
              <legend className="font-semibold text-sm mb-3">Payment method</legend>
              <div className="flex max-sm:flex-col gap-3">
                {(
                  [
                    { value: "card", icon: card, label: "Debit/Credit Card" },
                    { value: "bank-transfer", icon: bank, label: "Bank Transfer" },
                  ] as const
                ).map((method) => (
                  <label
                    key={method.value}
                    className={`flex flex-col gap-1.5 px-3 py-4 border rounded-xl w-full cursor-pointer relative transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 ${
                      paymentMethod === method.value ? "border-black" : "border-gray-light"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment-method"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                      className="opacity-0 absolute"
                    />
                    <img src={method.icon} alt="" className="size-5" />
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === "card" ? (
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      name="card-number"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="Card number"
                      aria-label="Card number"
                      pattern="(\d{4} ?){3}\d{1,7}"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      required
                    />
                    <img src={lock} alt="" className="absolute right-3.5 top-1/2 -translate-y-1/2 size-5" />
                  </div>
                  <div className="flex max-sm:flex-col gap-3">
                    <Input
                      name="expiry"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="Expiry date (MM/YY)"
                      aria-label="Expiry date"
                      pattern="(0[1-9]|1[0-2])\/\d{2}"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      required
                    />
                    <Input
                      name="cvc"
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="Security code"
                      aria-label="Security code"
                      pattern="\d{3,4}"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-dark leading-5">
                  Bank details will be sent to your email address. Your order
                  ships as soon as the transfer is received.
                </p>
              )}
              <label className="flex items-center gap-1 font-regular">
                <input
                  type="checkbox"
                  name="use-shipping-address-as-billing-address"
                  defaultChecked
                  className="size-4.5 rounded-[4px] overflow-hidden accent-black"
                />
                Use shipping address as billing address
              </label>
            </fieldset>

            <Button type="submit" className="w-full max-w-[316px] mx-auto">
              Pay {formatPrice(total, currency)}
              <img src={arrowRight} alt="" className="size-4" />
            </Button>
            <p className="text-center text-[11px] text-gray-dark">
              Demo store: no payment is processed and no data leaves your browser.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
