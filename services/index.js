import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clg3gyzrs17l901td9yl6gmbn/master"
);
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
  const result = await graphcms.request(GETPOSTS);
  return result.postsConnection.edges;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const results = await graphcms.request(query);
  return results.categories;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await graphcms.request(query, { slug });

  return result.post;
};

export const getRelatedPosts = async (categories, slug) => {
  const query = gql`
    query GetPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const results = await graphcms.request(query, { categories, slug });
  return results.posts;
};
