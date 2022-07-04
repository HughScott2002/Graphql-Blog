import React, { FC } from "react";
import Image from "next/image";
interface typeProps {
  author: {
    bio: string;
    id: string;
    name: string;
    photo: { url: string };
    children: string;
  };
}

const Author: FC<typeProps> = ({ author }) => {
  // console.log(author);
  return (
    <div className="text-center mt-20 mb-8 p-12 relative-lg bg-black bg-opacity-20">
      <div className="relative left-0 right-0 -top-14">
        <Image
          src={author.photo.url}
          unoptimized
          alt={author.name}
          height="100px"
          className="align-middle rounded-full"
          width={"100px"}
        />
      </div>
      <p className="text-white text-lg">{author.bio}</p>
      <h3 className="text-white my-4 text-xl font-bold">{author.name} </h3>
    </div>
  );
};

export default Author;
