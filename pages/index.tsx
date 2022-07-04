import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, PostWidget, Categories } from "../components";
import { getPost } from "../services";

const Home: NextPage = ({ posts }: any) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Graphql Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: any) => {
            //add an Id
            return <PostCard post={post.node} key={post.node.author.id} />;
          })}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticProps = async () => {
  const posts = (await getPost()) || [];
  console.log(posts);
  return {
    props: {
      posts,
    },
  };
};

export default Home;
