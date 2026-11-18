import heroBg from "../assets/image/hero-bg-1728.webp";
import heroBgSmall from "../assets/image/hero-bg-860.webp";
import arrow from "../assets/svg/arrow.svg";
import collectionBG1 from "../assets/image/collection-bg-1.webp";
import collectionBG2 from "../assets/image/collection-bg-2.webp";
import Card, { CardSkeleton } from "../components/Card";
import FilterNav from "../components/FilterNav";
import Button from "../components/ui/Button";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts, PAGE_SIZE } from "../services/api/datas";
import { useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { scrollToTarget } from "../hooks/useSmoothScroll";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const collection = searchParams.get("collection");
  const productsRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", collection],
    queryFn: ({ pageParam, signal }) =>
      getProducts({ collection, cursor: pageParam }, signal),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.endCursor : undefined,
  });

  const products = data?.pages.flatMap((page) => page.products) ?? [];

  const handleFilterChange = (handle: string | null) => {
    setSearchParams(handle ? { collection: handle } : {}, {
      preventScrollReset: true,
    });
  };

  const scrollToProducts = () => {
    if (productsRef.current) scrollToTarget(productsRef.current, { offset: -140 });
  };

  // Liens du header du type "/?collection=men#products"
  // (on attend une frame pour que le smooth scroll Lenis soit initialisé)
  useEffect(() => {
    if (location.hash !== "#products") return;
    const frame = requestAnimationFrame(scrollToProducts);
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.hash]);

  return (
    <div className="space-y-16 sm:space-y-[72px] mb-16 sm:mb-[72px]">
      <section className="relative w-full py-20 px-6 sm:py-20 sm:px-20 rounded-5xl mt-10 overflow-hidden bg-gray-dark">
        <img
          src={heroBg}
          srcSet={`${heroBgSmall} 860w, ${heroBg} 1728w`}
          sizes="(max-width: 1264px) 100vw, 1200px"
          alt=""
          aria-hidden="true"
          // @ts-expect-error: attribut HTML valide, pas encore typé dans React 18
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative w-full text-white flex flex-col items-center justify-center text-center">
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
            <Button variant="secondary" onClick={scrollToProducts}>
              Start Shopping
            </Button>
            <Button
              variant="secondary"
              className="!size-11 !px-0"
              onClick={scrollToProducts}
              aria-label="Scroll to products"
            >
              <img src={arrow} alt="" className="size-5" />
            </Button>
          </div>
        </div>
      </section>
      <p className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-chillax">
        Discover the latest trends in summer fashion. Shop now and refresh your
        wardrobe with our stylish summer shirts.
      </p>
      <section ref={productsRef} id="products" className="scroll-mt-32">
        <div className="space-y-8">
          <FilterNav active={collection} onChange={handleFilterChange} />
          {isError ? (
            <ErrorMessage
              message="We couldn't load the products."
              onRetry={() => refetch()}
            />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,30%))] max-sm:grid-cols-1 gap-4 justify-center">
              {isPending
                ? Array.from({ length: PAGE_SIZE }, (_, i) => (
                    <CardSkeleton key={i} />
                  ))
                : products.map((product, index) => (
                    <Card
                      key={product.id}
                      product={product}
                      priority={index < 3}
                    />
                  ))}
              {isFetchingNextPage &&
                Array.from({ length: 3 }, (_, i) => (
                  <CardSkeleton key={`next-${i}`} />
                ))}
              {!isPending && products.length === 0 && (
                <p className="col-span-full text-center text-gray-dark py-16">
                  No products in this collection yet.
                </p>
              )}
            </div>
          )}
          {hasNextPage && (
            <Button
              variant="secondary"
              className="mx-auto outline outline-1 outline-black disabled:opacity-60"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "View more"}
            </Button>
          )}
        </div>
      </section>
      <section className="space-y-8">
        <div className="space-1 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-chillax">
            OUR COLLECTION
          </h2>
          <p className="text-gray-dark text-sm sm:text-base lg:text-lg">
            Our latest collection, where classic and contemporary styles
            converge in perfect harmony.
          </p>
        </div>
        <div className="flex max-md:flex-col gap-4">
          <div className="relative h-[446px] w-full md:w-xl md:shrink-0 rounded-4xl overflow-hidden bg-gray-light">
            <img
              src={collectionBG1}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="p-6 flex items-end justify-center absolute inset-0 bg-black/20">
              <Button
                variant="secondary"
                onClick={() => {
                  handleFilterChange("featured");
                  scrollToProducts();
                }}
              >
                LEARN MORE <img src={arrow} alt="" className="size-5" />
              </Button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              handleFilterChange("men");
              scrollToProducts();
            }}
            className="relative h-[446px] rounded-4xl overflow-hidden grow bg-gray-dark text-left"
          >
            <img
              src={collectionBG2}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-[center_45%]"
            />
            <div className="p-6 flex flex-col gap-1 items-center text-center justify-center absolute inset-0 bg-black/50 text-white">
              <h3 className="uppercase font-bold text-3xl lg:text-5xl font-chillax text-stroke text-transparent">
                Classic men
              </h3>
              <p className="text-sm sm:text-base lg:text-lg">
                We’re changing the way things get made
              </p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
}
