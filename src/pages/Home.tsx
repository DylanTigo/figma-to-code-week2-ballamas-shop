import heroBg from "../assets/image/hero-bg.png";
import arrow from "../assets/svg/arrow.svg";
import collectionBG1 from "../assets/image/collection-bg-1.png";
import collectionBG2 from "../assets/image/collection-bg-2.png";
import Card from "../components/Card";
import FilterNav from "../components/FilterNav";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-[72px] mb-16 sm:mb-[72px]">
      <section
        className={`w-full py-20 px-6 sm:py-20 sm:px-20 rounded-5xl mt-10 overflow-hidden bg-center bg-cover bg-no-repeat`}
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="w-full text-white flex flex-col items-center justify-center text-center">
          <p className="w-fit flex items-center justify-center gap-3 mb-4.5">
            <span className="h-[1px] w-16 text-sm bg-white rounded-full"></span>
            We bring new fashion to the world
            <span className="h-[1px] w-16 bg-white rounded-full"></span>
          </p>
          <h1 className="font-chillax font-bold lg:text-5xl lg:leading-[60px] sm:text-[40px] sm:leading-[44px] text-3xl">
            DISCOVER THE LATEST FASHION TRENDS HERE
          </h1>
          <p className="mt-4 max-w-lg leading-7">
            Discover a world of fashion with our meticulously curated outfits.
            Shop now to update your wardrobe with chic and stylish outfits.
          </p>
          <div className="flex justify-center items-center mt-11">
            <Button variant="secondary">Start Shopping</Button>
            <Button variant="secondary" className="!size-11 !px-0"><img src={arrow} alt="arrow icon" className="size-5"/></Button>
          </div>
        </div>
      </section>
      <p className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-chillax">Discover the latest trends in summer fashion. Shop now and refresh your wardrobe with our stylish summer shirts.</p>
      <section>
        <div className="space-y-8">
          <FilterNav/>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,30%))] gap-4 justify-center">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
          </div>
          <Button variant="secondary" className="mx-auto outline outline-1 outline-black">View more</Button>
        </div>
      </section>
      <section className="space-y-8">
        <div className="space-1 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-chillax">OUR COLLECTION</h2>
          <p className="text-gray-dark text-sm sm:text-base lg:text-lg">Our latest collection, where classic and contemporary styles converge in perfect harmony.</p>
        </div>
        <div className="flex max-md:flex-col gap-4">
          <div className="relative h-[446px] w-full md:w-xl rounded-4xl bg-cover overflow-hidden"
          style={{
            backgroundImage: `url(${collectionBG1})`,
          }}
          >
            <div className="p-6 flex items-end justify-center absolute inset-0 bg-black/20">
              <Button variant="secondary">LEARN MORE <img src={arrow} alt="arrow icon" className="size-5"/></Button>
            </div>
          </div>
          <div className="relative h-[446px] rounded-4xl bg-no-repeat bg-cover bg-[center_45%] overflow-hidden grow"
          style={{
            backgroundImage: `url(${collectionBG2})`,
          }}
          >
            <div className="p-6 flex flex-col gap-1 items-center text-center justify-center absolute inset-0 bg-black/50 text-white">
              <h3 className="uppercase font-bold text-3xl lg:text-5xl font-chillax text-stroke text-transparent">Classic men</h3>
              <p className="text-sm sm:text-base lg:text-lg">We’re changing the way things get made</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
