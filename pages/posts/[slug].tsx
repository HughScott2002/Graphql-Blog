import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { getPostDetails } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";

const PostDetails: NextPage = ({ post }: any) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              categories={post.category.map(
                (categories: any) => categories.slug
              )}
              slug={post.slug}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = ({ params: { slug: string } }) => {
  return {
    paths: [params:{}],
    fallback: false,
  };
};

export async function getStaticProps({ params: { slug: string } }) {
  const data = await getPostDetails(params.slug);
  return {
    props: { post: data },
  };
}

export default PostDetails;
