import React, { useContext, FC } from "react";
import Link from "next/link";

type DEMO = { name: string; slug: string };
const demoArry: DEMO[] = [
  { name: "React", slug: "react" },
  { name: "Web Development", slug: "wev-dev" },
];

const Header: FC = () => {
  return (
    <nav className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl test-white">
              Graphql Blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {demoArry.map((category: DEMO) => {
            return (
              <Link key={category.name} href={`/category${category.slug}`}>
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
