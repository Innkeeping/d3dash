// src/utils/fetchUserFeed.ts
import { LensExplorePublicationsResponse } from '../types';

export const fetchUserFeed = async (orderBy: string = "TOP_REACTED"): Promise<LensExplorePublicationsResponse['items']> => {
  const ENDPOINT = 'https://api-v2.lens.dev';

  const graphqlQuery = {
    query: `
      query Publications($orderBy: ExplorePublicationsOrderByType!) {
        explorePublications(request: {
          orderBy: $orderBy,
        }) {
          items {
            ... on Post {
              stats {
                reactions
              }
              metadata {
                ... on ImageMetadataV3 {
                  __typename
                  id
                  content
                  asset {
                    image {
                      optimized {
                        uri
                      }
                    }
                  }
                }
                ... on TextOnlyMetadataV3 {
                  __typename
                  id
                  content
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      orderBy: orderBy
    }
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include this if your API request requires authentication
      },
      body: JSON.stringify(graphqlQuery)
    });

    const data = await response.json();
    return data.data.explorePublications.items;
  } catch (error) {
    console.error("Error fetching user feed:", error);
    return [];
  }
};