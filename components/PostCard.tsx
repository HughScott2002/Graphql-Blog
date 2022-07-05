import React, { FC } from "react";
import moment from "moment";
import Link from "next/link";
import { BsCalendar2Minus } from "react-icons/bs";
// import Image from "next/image";
interface typePostCard {
  post: {
    author: {
      bio: string;
      id: string;
      name: string;
      photo: { url: string };
    };
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: { url: string };
    category: { name: string; slug: string }[];
  };
}

const PostCard: FC<typePostCard> = ({ post }) => {
  // console.log(post);
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="flex justify-center relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute  lg:h-96 h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
        {/* <Image src={post.featuredImage.url} alt={post.title}/> */}
      </div>
      <h1
        className="transition duration-500 text-center mb-8 cursor-pointer
   hover:text-blue-600 text-3xl font-semibold "
      >
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <img
            src={post.author.photo.url}
            alt={post.author.name}
            height="40px"
            width={"40px"}
            className="align-middle rounded-full"
          />
          <p className="inline align-middle text-gray-700 ml-2 text-lg font-semibold">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <BsCalendar2Minus className="text-green-700 h-6 w-6 inline mr-2 mt-0" />
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/posts/${post.slug}`}>
          <span
            className="transition duration-500 transform hover:-translate-y-1 hover:bg-transparent hover:border-solid 
          hover:border-blue-500 hover:border-2 hover:text-black  inline-block bg-blue-500 text-white text-lg font-medium py-3 px-4 rounded-full cursor-pointer"
          >
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
