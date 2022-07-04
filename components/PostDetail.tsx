import moment from "moment";
import React, { FC } from "react";
import { BsCalendar2Minus } from "react-icons/bs";

interface typePostDetail {
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
    content: { raw: { children: [] } };
  };
}

const PostDetail: FC<typePostDetail> = ({ post }) => {
  const getContentFragment = (
    index: string,
    text: string,
    obj: { bold: any; italic: any; underline: any },
    type: string
  ) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="object-top h-full w-full rounded-t-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex item-center mb-8 w-full">
            <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
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
          <h1 className="mb- text=3xl font-semibold">{post.title}</h1>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) =>
              getContentFragment(itemindex, item.text, item)
            );

            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </>
  );
};

export default PostDetail;
