import { getCategories } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="flex flex-wrap space-x-2 justify-center items-center py-8 text-sm font-medium text-center text-gray-700">
      <h1 className="text-sky-700 font-averia text-lg font-semibold">
        Categories:{" "}
      </h1>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="border-2 rounded-3xl p-2 shadow-xl shadow-gray-200"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
