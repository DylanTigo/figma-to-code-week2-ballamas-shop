import { useState } from "react";
import { ProductImage } from "../../types/productTypes";
import { resizeShopifyImage, shopifySrcSet } from "../../utils/image";

type ProductImgProps = {
  image: ProductImage | null | undefined;
  /** Largeur d'affichage, pour que le navigateur choisisse la bonne taille */
  sizes: string;
  /** Largeur utilisée pour l'attribut `src` de secours */
  fallbackWidth?: number;
  priority?: boolean;
  className?: string;
  alt?: string;
};

/**
 * Image produit optimisée :
 * - srcset responsive via le CDN Shopify (on ne charge que la taille utile)
 * - lazy-loading natif + décodage asynchrone
 * - width/height pour éviter les décalages de mise en page
 * - fondu à l'apparition sur un fond gris de placeholder
 */
export default function ProductImg({
  image,
  sizes,
  fallbackWidth = 640,
  priority = false,
  className = "",
  alt,
}: ProductImgProps) {
  const [loaded, setLoaded] = useState(false);

  if (!image) {
    return <div className={`bg-gray-light ${className}`} aria-hidden="true" />;
  }

  return (
    <img
      src={resizeShopifyImage(image.url, fallbackWidth)}
      srcSet={shopifySrcSet(image.url)}
      sizes={sizes}
      alt={alt ?? image.altText}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // @ts-expect-error: attribut HTML valide, pas encore typé dans React 18
      fetchpriority={priority ? "high" : "auto"}
      onLoad={() => setLoaded(true)}
      className={`bg-gray-light transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
