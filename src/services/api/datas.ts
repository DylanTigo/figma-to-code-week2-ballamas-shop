/* eslint-disable @typescript-eslint/no-explicit-any */
import Resizer from "react-image-file-resizer";
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


const resizeImage = (imageUrl: string, maxWidth: number, maxHeight: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Fonction pour convertir l'URL en Blob
    const convertUrlToBlob = async (url: string): Promise<Blob> => {
      const response = await fetch(url);
      return await response.blob();
    };

    convertUrlToBlob(imageUrl)
      .then(blob => {
        Resizer.imageFileResizer(
          blob,
          maxWidth,
          maxHeight,
          'JPEG',
          80,
          0,
          (uri) => {
            resolve(uri as string);
          },
          'base64',
          undefined,
        );
      })
      .catch(error => {
        reject(error);
      });
  });
};

// Extraction des informations de produit depuis les nœuds GraphQL
const mapProduct = async (node: any): Promise<Product> => {
  const featuredImageUrl = node.featuredImage.edges[0]?.node.url;
  const resizedImageUrl = featuredImageUrl 
    ? await resizeImage(featuredImageUrl, 700, 700) // Ajustez ces valeurs selon vos besoins
    : '';

  return {
    id: node.id,
    productId: convertId(node.id),
    title: node.title,
    description: node.description || "",
    amount: node.variants.edges[0]?.node.price.amount,
    featuredImage: resizedImageUrl,
    ...defaultProductValues,
  };
};
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
  const products = await Promise.all(
    response.data.products.edges.map((edge: any) => mapProduct(edge.node))
  );
  return products;
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
  return await mapProduct(response.data.product);
};

export const getRecommendations = async (id: string): Promise<Product[]> => {
  const query = `
    {
      productRecommendations(productId: "${id}") {
        id
        title
        description
        featuredImage {
          url
        }
        variants(first: 1) {
          edges {
            node {
              price {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetchGraphQL(query);
  const products: Promise<Product>[] = response.data.productRecommendations.map(
    async (recommendation: any) => {
      const adaptedRecommendation = {
        ...recommendation,
        featuredImage: {
          edges: recommendation.featuredImage?.url
            ? [{ node: { url: recommendation.featuredImage.url } }]
            : [],
        },
      };

      return mapProduct(adaptedRecommendation);
    }
  );

  return Promise.all(products);
};