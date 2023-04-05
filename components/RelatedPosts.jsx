import { getRelatedPosts } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";

const RelatedPosts = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getRelatedPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    }
  }, [slug]);
  return (
    <div className="md:max-w-[850px] flex flex-col items-center justify-center gap-8 mt-12 mx-auto px-4">
      <h2 className="text-2xl xl:text-3xl font-semibold font-averia border-b-2 text-sky-700">
        Related posts
      </h2>
      <div className="grid grid-cols-3 gap-8 ">
        {relatedPosts.map((post) => (
          <div key={post.title} className="flex flex-col">
            <Image
              src={post.featuredImage.url}
              height={140}
              width={230}
              alt={post.title}
              className="h-[130px] lg:h-[200px] rounded-2xl"
            />
            <span className="text-gray-600 font-medium text-sm mb-2">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
            <Link
              key={post.title}
              href={`/post/${post.slug}`}
              className="text-base lg:text-xl font-averia font-bold text-sky-700 "
            >
              {post.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
