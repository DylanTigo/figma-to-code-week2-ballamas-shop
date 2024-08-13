import { useEffect, useState } from "react";
import CheckoutCard from "../components/CheckoutCard";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputGroup from "../components/InputGroup";
import card from "../assets/svg/card.svg";
import bank from "../assets/svg/bank.svg";
import lock from "../assets/svg/lock.svg";
import arrowRight from "../assets/svg/arrow-right.svg";
import { useCartStore } from "../services/stores/store";
import { Link } from "react-router-dom";
import useScrollTop from "../hooks/useScrollTop";

export default function Checkout() {
  useScrollTop()
  const [shipping, setShipping] = useState("free");
  function handleShipping(e: React.ChangeEvent<HTMLInputElement>) {
    setShipping(e.target.value);
  }
  
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const [shippingPrice, setShippingPrice] = useState(totalPrice);

  useEffect(() => {
    if (shipping === "free") {
      setShippingPrice(totalPrice)
    }else if (shipping === "regular") {
      setShippingPrice(totalPrice + 7.50)
    } else if (shipping === "express") {
      setShippingPrice(totalPrice + 22.50)
    }
  },[shipping, totalPrice])

  const products = useCartStore((state) => state.products);
  const discount = 0

  return (
    <div className="mt-16 mb-24 space-y-5 text-sm">
      <h2 className="font-semibold font-chillax text-lg sm:text-2xl">
        Checkout
      </h2>
      <div className="grid grid-cols-11">
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
              { products.map((product) => (
                <CheckoutCard key={product.id} product={product} />
              )) }
            </div>
            <div className="space-y-1 text-xs text-black">
              <h4>Discount Code</h4>
              <form className="flex gap-2 items-stretch">
                <div className="sm:max-w-[50%] w-full">
                  <Input type="email" placeholder="Your email" />
                </div>
                <Button>Apply</Button>
              </form>
              <p>
                New customer?{" "}
                <a href="#" className="underline">
                  Signup
                </a>{" "}
                <span className="text-gray-dark">to get better offer</span>
              </p>
            </div>
            <div className="space-y-3 ">
              <div className="space-y-1 text-gray-dark pb-3 border-b border-gray-light">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${ totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>${discount}</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Order total</span>
                <span>${ totalPrice}</span>
              </div>
            </div>
            <div className="space-y-3.5 ">
              <h4 className="font-semibold">Shipping method</h4>
              <div className="flex flex-col gap-3">
                <label className="p-3 border border-gray-light rounded-xl flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="free"
                      checked={shipping === "free"}
                      onChange={handleShipping}
                      className="size-4.5"
                    />
                    <div className="space-y-0.5">
                      <div >Free Shipping</div>
                      <div className="text-xs text-gray-dark">
                        7-30 business days
                      </div>
                    </div>
                  </div>
                  <span>$0</span>
                </label>
                <label className="p-3 border border-gray-light rounded-xl flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="regular"
                      checked={shipping === "regular"}
                      onChange={handleShipping}
                      className="size-4.5 focus:ring-black"
                    />
                    <div className="space-y-0.5">
                      <div >Regular Shipping</div>
                      <div className="text-xs text-gray-dark">
                        3-14 business days
                      </div>
                    </div>
                  </div>
                  <span>$7,50</span>
                </label>
                <label className="p-3 border border-gray-light rounded-xl flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="express"
                      checked={shipping === "express"}
                      onChange={handleShipping}
                      className="size-4.5 focus:ring-black"
                    />
                    <div className="space-y-0.5">
                      <div >Express Shipping</div>
                      <div className="text-xs text-gray-dark">
                        1-3 business days
                      </div>
                    </div>
                  </div>
                  <span>$22,50</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full lg:col-span-5  space-y-4">
          <div className="space-y-1">
            <h3 className="font-semibold ">Payment details</h3>
            <p className="text-gray-dark text-xs">
              Complete your purchase by providing your payment details.
            </p>
          </div>
          <form className="space-y-5.5">

            <fieldset className="space-y-3 text-xs">
              <legend className="font-semibold text-sm">Shipping address</legend>
              <div className="space-y-3">
                <div className="flex max-sm:flex-col gap-3">
                  <InputGroup label="First name" id="first-name" inputType="text" placeholder="Enter your first name" />
                  <InputGroup label="Last name" id="last-name" inputType="text" placeholder="Enter your last name" />
                </div>
                <div className="flex max-sm:flex-col gap-3">
                  <InputGroup label="Email address" id="email" inputType="email" placeholder="Enter your email address" />
                  <InputGroup label="Phone number" id="phone" inputType="tel" placeholder="Enter your phone number" />
                </div>
                <div className="flex max-sm:flex-col gap-3">
                  <InputGroup label="Address" id="address" inputType="text" placeholder="Enter your address" />
                  <InputGroup label="City" id="city" inputType="text" placeholder="Enter your city" />
                </div>
                <div className="flex max-sm:flex-col gap-3">
                  <InputGroup label="Region" id="region" inputType="text" placeholder="Enter your region" />
                  <InputGroup label="Postal code" id="postal-code" inputType="text" placeholder="Enter your postal code" />
                </div>
              </div>
            </fieldset>

            <fieldset className="space-y-3 text-xs mb-5.5">
              <legend className="font-semibold text-sm">Payment method</legend>
              <div className="flex max-sm:flex-col gap-3">
                <label className="flex flex-col gap-1.5 px-3 py-4 border border-gray-light rounded-xl w-full cursor-pointer relative">
                  <input type="radio" name="payment-method" value="debit-card" className="opacity-0 absolute" />
                  <img src={card} alt="card icon" className="size-5"/>
                  <span>Debit/Credit Cart</span>
                </label>
                <label className="flex flex-col gap-1.5 px-3 py-4 border border-gray-light rounded-xl w-full cursor-pointer relative">
                  <input type="radio" name="payment-method" value="bank-transfer" className="opacity-0 absolute" />
                  <img src={bank} alt=" bank icon" className="size-5"/>
                  <span>Bank Transfer</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="relative">
                  <Input type="number" placeholder="Card number" />
                  <img src={lock} alt="card icon" className="absolute right-3.5 top-1/2 -translate-y-1/2 size-5"/>
                </label>
                <div className="flex max-sm:flex-col gap-3">
                  <Input type="text" placeholder="Expiry date" />
                  <Input type="text" placeholder="Security code" />
                </div>
              </div>
              <label className="flex items-center gap-1 font-regular">
                <input type="checkbox" name="use-shipping-address-as-billing-address" className="size-4.5 rounded-[4px] overflow-hidden" />
                Use shipping address as billing address
              </label>
            </fieldset>

            <Link to={"/payment"}>
              <Button className="w-full max-w-[316px] mx-auto">Pay ${shippingPrice.toFixed(2)} <img src={arrowRight} alt="arrow right" className="size-4"/></Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
