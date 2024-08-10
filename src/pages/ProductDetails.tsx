import { useParams } from "react-router-dom"
import image1 from "../assets/image/image1.png"
import SizeButton from "../components/ui/SizeButton"
import Button from "../components/ui/Button"

export default function ProductDetails() {
  return (
    <div className="mt-[76px] ">
      <div className="flex w-full max-lg:flex-col justify-between gap-8 sm:gap-11">
        <div className="w-full h-[600px] rounded-4xl overflow-hidden">
          <img src={image1} alt="product image" className="w-full h-full object-cover rounded-4xl"/>
        </div>
        <div className="flex w-full flex-col gap-7">
          <div className="space-y-5.5">
            <div className="flex flex-col gap-2.5 sm:gap-4.5">
              <h2 className="text-3xl sm:text-[42px] font-semibold font-chillax">Badacore Tshirt</h2>
              <p className="text-2xl sm:text-4xl font-semibold">CAD $99</p>
              <div className="space-y-2 sm:space-y-3.5">
                <div className="capitalize font-medium text-xl sm:text-3xl">Color: Green</div>
                <div className="flex gap-3 items-center">
                  <span className="size-5 sm:size-7 rounded-full bg-green active color"></span>
                  <span className="size-5 sm:size-7 rounded-full bg-blue-500 color"></span>
                  <span className="size-5 sm:size-7 rounded-full bg-red-500 color"></span>
                  <span className="size-5 sm:size-7 rounded-full bg-black color"></span>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3.5">
                <div className="font-medium text-xl sm:text-3xl">Size </div>
                <div className="flex gap-3 items-center">
                  <SizeButton variant="active">XS</SizeButton>
                  <SizeButton>S</SizeButton>
                  <SizeButton>M</SizeButton>
                  <SizeButton>L</SizeButton>
                  <SizeButton>XL</SizeButton>
                </div>
              </div>
            </div>
            <div className="flex gap-3.5">
              <Button big>BUY NOW</Button>
              <Button variant="tertiary" className="!text-black outline-black" big>ADD TO CARD</Button>
            </div>
          </div>
          <div className="space-y-3.5">
            <h4 className="text-2xl sm:text-3xl font-medium font-chillax">Description</h4>
            <p className="text-sm sm:text-lg text-gray-dark">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
