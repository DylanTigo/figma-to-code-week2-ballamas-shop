/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from "../../types/productTypes";

// Convertir un id de produit en un id STRING
export const convertId = (id: string): string => id.split("/").pop() || "";

// Valeurs par défaut pour les produits
const defaultProductValues = {
  quantity: 1,
  color: "Green",
  size: "XS",
};

// Requête GraphQL générique
const fetchGraphQL = async (query: string): Promise<any> => {
  const response = await fetch(`https://mock.shop/api?query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
};

// Extraction des informations de produit depuis les nœuds GraphQL
const mapProduct = (node: any): Product => ({
  id: node.id,
  productId: convertId(node.id),
  title: node.title,
  description: node.description || "",
  amount: node.variants.edges[0]?.node.price.amount,
  featuredImage: node.featuredImage.edges[0]?.node.url,
  ...defaultProductValues,
});

// Récupération de la liste des produits
export const getProducts = async (): Promise<Product[]> => {
  const query = `
    {
      products(first: 6) {
        edges {
          node {
            id
            title
            description
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
            featuredImage: images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;
  const response = await fetchGraphQL(query);
  return response.data.products.edges.map((edge: any) => mapProduct(edge.node));
};

// Récupération d'un produit par son ID
export const getProduct = async (id: string): Promise<Product> => {
  const query = `
    {
      product(id: "${id}") {
        id
        title
        description
        variants(first: 1) {
          edges {
            node {
              price {
                amount
              }
            }
          }
        }
        featuredImage: images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  `;
  const response = await fetchGraphQL(query);
  return mapProduct(response.data.product);
};

export const getRecommendations = async (id: string): Promise<Product[]> => {
  const request = await fetch(
    `https://mock.shop/api?query={productRecommendations(productId:%20%22${id}%22){id%20title%20featuredImage%20{url}%20variants(first:%201){edges%20{node%20{price%20{amount}}}}}}`
  );
  const response = await request.json();

  const products: Product[] = response.data.productRecommendations.map(
    (recommendation: any) => ({
      id: recommendation.id,
      productId: convertId(recommendation.id),
      title: recommendation.title,
      description: "",
      amount: recommendation.variants.edges[0]?.node.price.amount,
      featuredImage: recommendation.featuredImage?.url,
      ...defaultProductValues,
    })
  );

  return products;
};