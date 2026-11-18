import { Link, useNavigate, useParams } from "react-router-dom";
import SizeButton from "../components/ui/SizeButton";
import Button from "../components/ui/Button";
import Card, { CardSkeleton } from "../components/Card";
import {
  getProduct,
  getRecommendations,
  toProductGid,
} from "../services/api/datas";
import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../services/stores/store";
import { useEffect, useMemo, useState } from "react";
import { Product, ProductImage, ProductVariant } from "../types/productTypes";
import ProductImg from "../components/ui/ProductImg";
import { formatPrice } from "../utils/format";
import ErrorMessage from "../components/ErrorMessage";

/** Couleurs de la maquette, avec repli sur la couleur CSS du même nom */
const SWATCHES: Record<string, string> = {
  green: "#2D5C43",
  purple: "#393158",
  ocean: "#2A5259",
  olive: "#706947",
  red: "#8B2E2E",
  black: "#1D1D1D",
  white: "#FFFFFF",
  gray: "#7E7E7E",
  grey: "#7E7E7E",
  clay: "#B66A50",
  "sand": "#CBB994",
};

const SIZE_LABELS: Record<string, string> = {
  "extra small": "XS",
  "x-small": "XS",
  "x-large": "XL",
  "xx-large": "XXL",
  "extra extra large": "XXL",
  small: "S",
  medium: "M",
  large: "L",
  "extra large": "XL",
};

const isColorOption = (name: string) => /colou?r/i.test(name);
const shortLabel = (optionName: string, value: string) =>
  /size/i.test(optionName) ? SIZE_LABELS[value.toLowerCase()] ?? value : value;

function findVariant(
  product: Product,
  selected: Record<string, string>
): ProductVariant | undefined {
  return product.variants.find((v) =>
    Object.entries(selected).every(([k, val]) => v.selectedOptions[k] === val)
  );
}

export default function ProductDetails() {
  const { productId = "" } = useParams();
  const id = toProductGid(productId);

  const {
    data: product,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ signal }) => getProduct(id, signal),
  });

  const { data: recommendations, isPending: isLoadingRecommendations } =
    useQuery({
      queryKey: ["recommendations", id],
      queryFn: ({ signal }) => getRecommendations(id, signal),
      enabled: Boolean(product),
    });

  useEffect(() => {
    if (product) document.title = `${product.title} | Ballamas Shop`;
    return () => {
      document.title = "Ballamas Shop";
    };
  }, [product]);

  return (
    <div className="mt-[76px] mb-24">
      {isPending ? (
        <ProductSkeleton />
      ) : isError ? (
        <ErrorMessage
          message="We couldn't load this product."
          onRetry={() => refetch()}
        />
      ) : !product ? (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <h2 className="text-2xl font-semibold font-chillax">
            Product not found
          </h2>
          <Link to="/" className="underline">
            Back to the shop
          </Link>
        </div>
      ) : (
        <ProductView key={product.id} product={product} />
      )}
      {product && (
        <div className="mt-[72px] space-y-8">
          <h3 className="font-semibold font-chillax text-2xl sm:text-3xl">
            You may also like
          </h3>
          <div className="flex max-sm:flex-col flex-nowrap gap-3.5 overflow-x-auto no-scrollbar">
            {isLoadingRecommendations
              ? Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="sm:min-w-[20rem]">
                    <CardSkeleton />
                  </div>
                ))
              : recommendations?.map((recommendation) => (
                  <div key={recommendation.id} className="sm:min-w-[20rem]">
                    <Card product={recommendation} />
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

const PRODUCT_LAYOUT =
  "flex w-full max-lg:flex-col justify-between gap-8 sm:gap-11";
const PRODUCT_MEDIA_COL = "w-full lg:flex-1 min-w-0 space-y-3";
const PRODUCT_INFO_COL = "flex w-full lg:flex-1 min-w-0 flex-col gap-7";

function ProductSkeleton() {
  const bar = "rounded-full bg-gray-light";
  return (
    <div className={`${PRODUCT_LAYOUT} animate-pulse`} aria-busy="true" aria-label="Loading product">
      <div className={PRODUCT_MEDIA_COL}>
        <div className="w-full h-[600px] max-sm:h-[420px] rounded-4xl bg-gray-light" />
        <div className="flex gap-2.5">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="size-16 sm:size-20 rounded-2xl bg-gray-light" />
          ))}
        </div>
      </div>
      <div className={PRODUCT_INFO_COL}>
        <div className="space-y-5.5">
          <div className={`${bar} h-10 sm:h-12 w-3/4`} />
          <div className={`${bar} h-8 sm:h-10 w-1/3`} />
          <div className={`${bar} h-7 w-20`} />
          <div className="flex gap-3">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className={`${bar} h-11 sm:h-14 w-[55px] sm:w-[76px]`} />
            ))}
          </div>
          <div className={`${bar} h-7 w-32`} />
          <div className="flex gap-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="size-5 sm:size-7 rounded-full bg-gray-light" />
            ))}
          </div>
          <div className="flex gap-3.5">
            <div className={`${bar} h-12 sm:h-16 w-full`} />
            <div className={`${bar} h-12 sm:h-16 w-full`} />
          </div>
        </div>
        <div className="space-y-3">
          <div className={`${bar} h-8 w-40`} />
          {["w-full", "w-full", "w-5/6", "w-2/3"].map((w, i) => (
            <div key={i} className={`${bar} h-4 ${w}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductView({ product }: { product: Product }) {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const [selected, setSelected] = useState<Record<string, string>>(
    () => product.defaultVariant?.selectedOptions ?? {}
  );
  const variant = useMemo(
    () => findVariant(product, selected),
    [product, selected]
  );

  // Image principale : celle de la variante choisie, sinon la 1ère du produit
  const [activeImage, setActiveImage] = useState<ProductImage | null>(
    () => variant?.image ?? product.images[0] ?? null
  );

  const handleSelect = (optionName: string, value: string) => {
    const next = { ...selected, [optionName]: value };
    // Si la combinaison n'existe pas, on prend la 1ère variante avec cette valeur
    const match =
      findVariant(product, next) ??
      product.variants.find((v) => v.selectedOptions[optionName] === value);
    const nextSelection = match?.selectedOptions ?? next;
    setSelected(nextSelection);
    if (match?.image) setActiveImage(match.image);
  };

  // Une valeur est disponible si la variante correspondante (avec les autres
  // options déjà choisies) existe et est en stock
  const isAvailable = (optionName: string, value: string) =>
    Boolean(
      findVariant(product, { ...selected, [optionName]: value })
        ?.availableForSale
    );

  const canBuy = Boolean(variant?.availableForSale);
  const price = variant?.price ?? product.price;

  const handleAddToCart = () => {
    if (!variant || !canBuy) return false;
    addToCart({
      variantId: variant.id,
      productId: product.productId,
      title: product.title,
      image: variant.image ?? product.image,
      price: variant.price,
      options: variant.selectedOptions,
    });
    return true;
  };

  // Galerie : on évite les doublons d'URL
  const gallery = product.images.filter(
    (img, i, arr) => arr.findIndex((o) => o.url === img.url) === i
  );

  return (
    <div className={PRODUCT_LAYOUT}>
      <div className={PRODUCT_MEDIA_COL}>
        <div className="w-full h-[600px] max-sm:h-[420px] rounded-4xl overflow-hidden bg-gray-light">
          <ProductImg
            key={activeImage?.url}
            image={activeImage}
            alt={product.title}
            sizes="(max-width: 1024px) 100vw, 600px"
            fallbackWidth={800}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        {gallery.length > 1 && (
          <div className="flex flex-wrap gap-2.5 p-1 -m-1">
            {gallery.map((img, index) => (
              <button
                key={img.url}
                type="button"
                onClick={() => setActiveImage(img)}
                aria-label={`Show image ${index + 1}`}
                aria-current={img.url === activeImage?.url}
                className={`size-16 sm:size-20 shrink-0 rounded-2xl overflow-hidden ring-offset-2 transition ${
                  img.url === activeImage?.url
                    ? "ring-2 ring-black"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <ProductImg
                  image={img}
                  alt=""
                  sizes="80px"
                  fallbackWidth={160}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={PRODUCT_INFO_COL}>
        <div className="space-y-5.5">
          <div className="flex flex-col gap-2.5 sm:gap-4.5">
            <h2 className="text-3xl sm:text-[42px] sm:leading-tight font-semibold font-chillax">
              {product.title}
            </h2>
            <p className="text-2xl sm:text-4xl font-semibold">
              {price.currencyCode} {formatPrice(price.amount, price.currencyCode)}
            </p>
            {product.options.map((option) =>
              isColorOption(option.name) ? (
                <fieldset key={option.name} className="space-y-2 sm:space-y-3.5">
                  <legend className="capitalize font-medium text-xl sm:text-3xl mb-2 sm:mb-3.5">
                    {option.name}: {selected[option.name]}
                  </legend>
                  <div className="flex gap-3 items-center flex-wrap">
                    {option.values.map((value) => {
                      const active = selected[option.name] === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          title={value}
                          aria-label={value}
                          aria-pressed={active}
                          onClick={() => handleSelect(option.name, value)}
                          style={{
                            backgroundColor:
                              SWATCHES[value.toLowerCase()] ?? value.toLowerCase(),
                          }}
                          className={`size-5 sm:size-7 rounded-full border border-gray-light transition-transform ${
                            active
                              ? "scale-90 outline outline-2 outline-offset-2 outline-black"
                              : "hover:scale-110"
                          } ${isAvailable(option.name, value) ? "" : "opacity-40"}`}
                        />
                      );
                    })}
                  </div>
                </fieldset>
              ) : (
                <fieldset key={option.name} className="space-y-2 sm:space-y-3.5">
                  <legend className="font-medium text-xl sm:text-3xl mb-2 sm:mb-3.5">
                    {option.name}
                  </legend>
                  <div className="flex gap-3 items-center flex-wrap">
                    {option.values.map((value) => (
                      <SizeButton
                        key={value}
                        title={value}
                        aria-pressed={selected[option.name] === value}
                        variant={
                          selected[option.name] === value ? "active" : "normal"
                        }
                        className={
                          isAvailable(option.name, value)
                            ? ""
                            : "opacity-40 line-through"
                        }
                        onClick={() => handleSelect(option.name, value)}
                      >
                        {shortLabel(option.name, value)}
                      </SizeButton>
                    ))}
                  </div>
                </fieldset>
              )
            )}
          </div>
          <div className="flex max-sm:flex-col gap-3.5">
            <Button
              big
              disabled={!canBuy}
              className="disabled:opacity-60"
              onClick={() => {
                if (handleAddToCart()) navigate("/checkout");
              }}
            >
              BUY NOW
            </Button>
            <Button
              onClick={() => {
                if (handleAddToCart()) {
                  setAdded(true);
                  window.setTimeout(() => setAdded(false), 1500);
                }
              }}
              disabled={!canBuy}
              variant="tertiary"
              className="!text-black !outline-black hover:!bg-black/5 disabled:opacity-60"
              big
            >
              {!canBuy ? "SOLD OUT" : added ? "ADDED ✓" : "ADD TO CART"}
            </Button>
          </div>
          <p aria-live="polite" className="sr-only">
            {added ? `${product.title} added to cart` : ""}
          </p>
        </div>
        {product.description && (
          <div className="space-y-3.5">
            <h4 className="text-2xl sm:text-3xl font-medium font-chillax">
              Description
            </h4>
            <p className="text-sm sm:text-lg text-gray-dark">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
