import { graphql } from "graphql";
import { request, gql } from "graphql-request";

const graphqlAPI = process.env.GRAPHCMS_ENDPOINT;
export const getPosts = async () => {
  const GETPOSTS = gql`
    query Myquery {
      postsConnection {
        edges {
          node {
            author {
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              slug
              name
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, GETPOSTS);
  return result.postsConnection.edges;
};
