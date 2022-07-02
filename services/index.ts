import { graphql } from "graphql";
import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || "";

export const getPost = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
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
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query);
  return results.postsConnection.edges;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query getPostDetails($slug: string!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
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
        category {
          name
          slug
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query);
  return results.postsConnection.edges;
};

export const getRecentPosts = async () => {
  const query = gql`
    query getPostDetails(){
        posts(
            orderBy: createdAt_ASC
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

  const results = await request(graphqlAPI, query);
  return results.posts;
};

export const getSimilarPosts = async () => {
  // slug: string, categories: string[]
  // const $slug = slug;
  // const $categories = categories;
  const query = gql`
    query GetPostDetails($slug: String!, $category: [String!]) {
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
  const results = await request(graphqlAPI, query);
  return results.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categoryS {
        name
        slug
      }
    }
  `;
  const results = await request(graphqlAPI, query);
  return results.categoryS;
};
