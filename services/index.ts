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
    query getPostDetails($slug: String!) {
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
        content {
          raw
        }
      }
    }
  `;
  const results = await request(graphqlAPI, query, { slug });
  return results.post;
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

export const getSimilarPosts = async (categories: any, slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $category: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { category_some: { slug_in: $category } }
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
  const results = await request(graphqlAPI, query, { categories, slug });
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
