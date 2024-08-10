import Button from "./ui/Button";
import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-black text-gray relative bottom-0 w-full py-13">
      <div className="space-y-8 highContainer">
        <div className="flex max-lg:flex-col gap-4 justify-between max-w-12xl mx-auto">
          <div className="space-y-5">
            <Logo variant="white" />
            <div className="flex flex-col gap-4 lg:max-w-[450px]">
              <p className="text-sm font-medium">
                Subscribe to our newsletter for upcoming products and best
                discount for all items
              </p>
              <form className="flex gap-1 items-stretch">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-4xl bg-transparent text-sm border px-3.5 border-gray max-lg:max-w-[50%]"
                />
                <Button variant="secondary">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="flex gap-13">
            <div className="flex flex-col gap-2">
                <div className="font-medium text-white">Produit</div>
                <div className="flex flex-col gap-0.5 text-sm">
                    <a href="#" className="">Jacket</a>
                    <a href="#" className="">T-Shirt</a>
                    <a href="#" className="">Pant</a>
                    <a href="#" className="">Shoes</a>
                    <a href="#" className="">Sunglasses</a>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-medium text-white">Categories</div>
                <div className="flex flex-col gap-0.5 text-sm">
                    <a href="#" className="">Men</a>
                    <a href="#" className="">Women</a>
                    <a href="#" className="">Kids</a>
                    <a href="#" className="">Gift</a>
                    <a href="#" className="">New arrivals</a>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-medium text-white">Our Social Media</div>
                <div className="flex flex-col gap-0.5 text-sm">
                    <a href="#" className="">Instagram</a>
                    <a href="#" className="">Facebook</a>
                    <a href="#" className="">YouTube</a>
                    <a href="#" className="">X</a>
                </div>
            </div>
          </div>
        </div>
        <div className="text-gray-dark text-center text-xs">© BALLAMAS 2024 by waris</div>
      </div>
    </footer>
  );
}
