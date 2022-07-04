import React, { FC } from "react";

interface typeProps {
  author: {
    bio: string;
    id: string;
    name: string;
    photo: string;
    children: string;
  };
}

const Author: FC = () => {
  return (
    <div>
      <h1>{"author"}</h1>
    </div>
  );
};

export default Author;
