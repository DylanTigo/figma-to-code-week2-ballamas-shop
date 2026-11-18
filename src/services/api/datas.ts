/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Collection,
  Product,
  ProductImage,
  ProductPage,
  ProductSummary,
  ProductVariant,
} from "../../types/productTypes";

const API_URL = import.meta.env.VITE_API_URL || "https://mock.shop/api";
export const PAGE_SIZE = 6;

// Convertir un id Shopify ("gid://shopify/Product/123") en id court ("123")
export const convertId = (id: string): string => id.split("/").pop() || "";
export const toProductGid = (productId: string): string =>
  `gid://shopify/Product/${productId}`;

/**
 * Requête GraphQL générique.
 * mock.shop n'accepte plus les requêtes GET : on envoie un POST JSON,
 * avec les valeurs dynamiques passées en `variables` (pas d'interpolation).
 */
async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  signal?: AbortSignal
): Promise<T> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  const json = await response.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e: any) => e.message).join(", "));
  }
  return json.data as T;
}

const IMAGE_FIELDS = `url altText width height`;

const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCard on Product {
    id
    handle
    title
    featuredImage { ${IMAGE_FIELDS} }
    priceRange { minVariantPrice { amount currencyCode } }
    firstVariants: variants(first: 10) {
      nodes { ...VariantFields }
    }
  }
`;

const VARIANT_FRAGMENT = `
  fragment VariantFields on ProductVariant {
    id
    title
    availableForSale
    price { amount currencyCode }
    selectedOptions { name value }
    image { ${IMAGE_FIELDS} }
  }
`;

const mapImage = (image: any, fallbackAlt: string): ProductImage | null =>
  image?.url
    ? {
        url: image.url,
        altText: image.altText || fallbackAlt,
        width: image.width ?? undefined,
        height: image.height ?? undefined,
      }
    : null;

const mapVariant = (node: any, productTitle: string): ProductVariant => ({
  id: node.id,
  title: node.title,
  availableForSale: Boolean(node.availableForSale),
  price: {
    amount: Number(node.price.amount),
    currencyCode: node.price.currencyCode,
  },
  selectedOptions: Object.fromEntries(
    (node.selectedOptions ?? []).map((o: any) => [o.name, o.value])
  ),
  image: mapImage(node.image, productTitle),
});

const mapProductSummary = (node: any): ProductSummary => {
  const variants: ProductVariant[] = (node.firstVariants?.nodes ?? []).map(
    (v: any) => mapVariant(v, node.title)
  );
  const minPrice = node.priceRange?.minVariantPrice;
  return {
    id: node.id,
    productId: convertId(node.id),
    handle: node.handle,
    title: node.title,
    price: {
      amount: Number(minPrice?.amount ?? variants[0]?.price.amount ?? 0),
      currencyCode: minPrice?.currencyCode ?? "CAD",
    },
    image: mapImage(node.featuredImage, node.title),
    defaultVariant: variants.find((v) => v.availableForSale) ?? null,
  };
};

// Liste paginée des produits (optionnellement filtrée par collection)
export async function getProducts(
  {
    collection,
    cursor,
  }: { collection?: string | null; cursor?: string | null } = {},
  signal?: AbortSignal
): Promise<ProductPage> {
  const productsField = `
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes { ...ProductCard }
    }
  `;

  const query = collection
    ? `query CollectionProducts($handle: String!, $first: Int!, $after: String) {
        collection(handle: $handle) { ${productsField} }
      }`
    : `query Products($first: Int!, $after: String) { ${productsField} }`;

  const data = await fetchGraphQL<any>(
    `${query} ${PRODUCT_CARD_FRAGMENT} ${VARIANT_FRAGMENT}`,
    { handle: collection, first: PAGE_SIZE, after: cursor ?? null },
    signal
  );

  const connection = collection ? data.collection?.products : data.products;
  if (!connection) {
    return { products: [], hasNextPage: false, endCursor: null };
  }

  return {
    products: connection.nodes.map(mapProductSummary),
    hasNextPage: connection.pageInfo.hasNextPage,
    endCursor: connection.pageInfo.endCursor,
  };
}

// Collections + nombre de produits de chacune (pour les filtres)
export async function getCollections(signal?: AbortSignal): Promise<{
  total: number;
  collections: Collection[];
}> {
  const data = await fetchGraphQL<any>(
    `query Collections {
      products(first: 250) { nodes { id } }
      collections(first: 50) {
        nodes { handle title products(first: 250) { nodes { id } } }
      }
    }`,
    {},
    signal
  );

  return {
    total: data.products.nodes.length,
    collections: data.collections.nodes.map((c: any) => ({
      handle: c.handle,
      title: c.title,
      count: c.products.nodes.length,
    })),
  };
}

// Récupération d'un produit complet par son ID
export async function getProduct(
  id: string,
  signal?: AbortSignal
): Promise<Product | null> {
  const data = await fetchGraphQL<any>(
    `query Product($id: ID!) {
      product(id: $id) {
        ...ProductCard
        description
        images(first: 10) { nodes { ${IMAGE_FIELDS} } }
        options { name values }
        variants(first: 100) { nodes { ...VariantFields } }
      }
    }
    ${PRODUCT_CARD_FRAGMENT} ${VARIANT_FRAGMENT}`,
    { id },
    signal
  );

  const node = data.product;
  if (!node) return null;

  const summary = mapProductSummary(node);
  const variants: ProductVariant[] = node.variants.nodes.map((v: any) =>
    mapVariant(v, node.title)
  );
  const images = (node.images?.nodes ?? [])
    .map((img: any) => mapImage(img, node.title))
    .filter(Boolean) as ProductImage[];

  return {
    ...summary,
    description: node.description || "",
    images: images.length ? images : summary.image ? [summary.image] : [],
    options: (node.options ?? []).filter(
      (o: any) => !(o.name === "Title" && o.values?.[0] === "Default Title")
    ),
    variants,
    defaultVariant:
      variants.find((v) => v.availableForSale) ?? variants[0] ?? null,
  };
}

// Produits recommandés pour un produit donné
export async function getRecommendations(
  id: string,
  signal?: AbortSignal
): Promise<ProductSummary[]> {
  const data = await fetchGraphQL<any>(
    `query Recommendations($id: ID!) {
      productRecommendations(productId: $id) { ...ProductCard }
    }
    ${PRODUCT_CARD_FRAGMENT} ${VARIANT_FRAGMENT}`,
    { id },
    signal
  );

  return (data.productRecommendations ?? [])
    .filter((p: any) => p.id !== id)
    .map(mapProductSummary);
}
