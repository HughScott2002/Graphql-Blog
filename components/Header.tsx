import React, { useState, useEffect, FC } from "react";
import Link from "next/link";
import { GrGraphQl } from "react-icons/gr";
import { getCategories } from "../services";

const Header: FC = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  });

  return (
    <nav className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left flex ">
          <GrGraphQl className="text-white text-4xl w-auto pl-2 pr-3 m-0 h-auto hover:transition transition duration-70 hover:duration-700 hover:text-blue-700" />
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl test-white">
              Graphql Blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category: any, index: number) => {
            return (
              <Link key={index} href={`/category${category.slug}`}>
                <span
                  className="md:float-right
                  mt-2
                  align-middle
                  text-white
                  ml-4
                  font-semibold
                  cursor-pointer"
                >
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Header;
