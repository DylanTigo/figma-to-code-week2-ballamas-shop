/**
 * Les images produits sont servies par le CDN Shopify, qui sait les
 * redimensionner à la volée via le paramètre `width` (et sert du WebP/AVIF
 * automatiquement aux navigateurs compatibles). On n'a donc plus besoin de
 * télécharger l'image originale (4096px) pour la réduire dans le navigateur.
 */
export function resizeShopifyImage(url: string, width: number): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("width", String(Math.round(width)));
    return parsed.toString();
  } catch {
    return url;
  }
}

const DEFAULT_WIDTHS = [240, 360, 480, 640, 800, 1080, 1400];

export function shopifySrcSet(url: string, widths = DEFAULT_WIDTHS): string {
  return widths.map((w) => `${resizeShopifyImage(url, w)} ${w}w`).join(", ");
}
