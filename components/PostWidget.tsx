import React, { useState, useEffect, FC } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";

interface typeProps {
  categories?: string[];
  slug?: string;
}

const PostWidget: FC<typeProps> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      try {
        getSimilarPosts(categories, slug).then((result) => {
          setRelatedPosts(result);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);

  console.log(relatedPosts);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map(
        (
          post: {
            title: string;
            featuredImage: { url: string };
            createdAt: string;
            slug: string;
          },
          index: number
        ) => {
          return (
            <div key={index} className="flex items-center w-full mb-4">
              <div className="w-16 flex-none">
                <img
                  src={post.featuredImage.url}
                  alt={post.title}
                  height="60px"
                  width="60px"
                  className="align-middle rounded-full"
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="text-grey-500 font-xs">
                  {moment(post.createdAt).format("MMM DD, YYYY")}
                </p>
                <Link href={`/posts/${post.slug}`} key={index}>
                  {post.title}
                </Link>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default PostWidget;
