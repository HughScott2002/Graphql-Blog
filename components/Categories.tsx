import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

const Categories: FC = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories: any) => setCategories(newCategories));
  }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {"Categories"}
      </h3>
      {categories.map((category: { name: string; slug: string }) => {
        return (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="cursor-pointer block pd-3 mb-3">
              {category.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
