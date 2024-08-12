import success from "../assets/svg/success.svg";

export default function Payement() {
  return (
    <div className='mx-auto py-28 sm:py-32 lg:py-36 min-h-[65vh]'>
        <div className="flex flex-col gap-2.5 justify-center items-center">
            <img src={success} alt="succsess icon" />
            <div className="space-y-1 text-center">
                <h2 className="font-semibold sm:text-lg">Thanks for your order !</h2>
                <p className="text-gray-dark text-xs">
                The order confirmation has been sent to johndoe@gmail.com
                </p>
            </div>
        </div>
    </div>
  )
}
