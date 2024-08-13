import { useParams } from "react-router-dom";
import SizeButton from "../components/ui/SizeButton";
import Button from "../components/ui/Button";
import Card from "../components/Card";
import { getProduct, getRecommendations } from "../services/api/datas";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { useCartStore } from "../services/stores/store";
import useScrollTop from "../hooks/useScrollTop";
import { useState } from "react";

export default function ProductDetails() {
  const { productId } = useParams();
  const id = "gid://shopify/Product/" + productId;
  useScrollTop(id);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  const { data: recommendations, isLoading: isLoadingRecommendations } =
    useQuery({
      queryKey: ["recommendations", id],
      queryFn: () => getRecommendations(id),
    });

  const { addToCart, modifyProduct } = useCartStore((state) => ({
    addToCart: state.addToCart,
    modifyProduct: state.modifyProduct,
  }));

  const [activeSize, setActiveSize] = useState<string>(product?.size || "XS");
  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleChangeSize = (size: string) => {
    if (product) modifyProduct(id, { ...product, size });
    setActiveSize(size);
  };

  return (
    <div className="mt-[76px] mb-24">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex w-full max-lg:flex-col justify-between gap-8 sm:gap-11">
          <div className="w-full h-[600px] rounded-4xl overflow-hidden">
            <img
              src={product?.featuredImage}
              alt="product image"
              className="w-full h-full object-cover rounded-4xl bg-gray-light"
            />
          </div>
          <div className="flex w-full flex-col gap-7">
            <div className="space-y-5.5">
              <div className="flex flex-col gap-2.5 sm:gap-4.5">
                <h2 className="text-3xl sm:text-[42px] font-semibold font-chillax">
                  {product?.title}
                </h2>
                <p className="text-2xl sm:text-4xl font-semibold">
                  CAD ${product?.amount}
                </p>
                <div className="space-y-2 sm:space-y-3.5">
                  <div className="capitalize font-medium text-xl sm:text-3xl">
                    Color: Green
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="size-5 sm:size-7 rounded-full bg-green active scale-90 color"></span>
                    <span className="size-5 sm:size-7 rounded-full bg-purple color"></span>
                    <span className="size-5 sm:size-7 rounded-full bg-ocean color"></span>
                    <span className="size-5 sm:size-7 rounded-full bg-olive color"></span>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3.5">
                  <div className="font-medium text-xl sm:text-3xl">Size </div>
                  <div className="flex gap-3 items-center">
                    {sizes.map((size) => (
                      <SizeButton
                        key={size}
                        variant={activeSize === size ? "active" : "normal"}
                        onClick={() => handleChangeSize(size)}
                      >
                        {size}
                      </SizeButton>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3.5">
                <Button big>BUY NOW</Button>
                <Button
                  onClick={() => product && addToCart(product)}
                  variant="tertiary"
                  className="!text-black outline-black"
                  big
                >
                  ADD TO CARD
                </Button>
              </div>
            </div>
            <div className="space-y-3.5">
              <h4 className="text-2xl sm:text-3xl font-medium font-chillax">
                Description
              </h4>
              <p className="text-sm sm:text-lg text-gray-dark">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-[72px] space-y-8">
        <h3 className="font-semibold font-chillax text-2xl sm:text-3xl">
          You may also like
        </h3>
        {isLoadingRecommendations ? (
          <Loader />
        ) : (
          <div className="flex max-sm:flex-col flex-nowrap gap-3.5 scroll-x overflow-x-auto no-scrollbar">
            {recommendations?.map((product) => (
              <div className="min-w-[20rem]">
                <Card product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
