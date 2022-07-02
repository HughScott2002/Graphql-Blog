import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
} from "../../components";

const PostDetails: NextPage = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Blog Details</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail />
          <Author />
          <CommentsForm />
          <Comments />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget categories={undefined} slug={undefined} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps:GetServerSideProps = async (ctx) => {

//     return {
//         props:{
//             data:null
//         }
//     }
// }

export default PostDetails;
