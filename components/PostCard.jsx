import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="flex items-center items-startjustify-center lg:flex-col p-6 bg-slate-100 shadow-xl shadow-gray-200">
      <Image
        src={post.featuredImage.url}
        alt={post.title}
        width={200}
        height={50}
        className="mr-6 lg:mb-2 lg:h-[200px] lg:w-[280px]"
      />

      <div className="flex basis-2/3 flex-col lg:flex-col-reverse gap-4 items-start justify-center">
        {/* author and title post */}
        <div className="flex gap-2">
          <Image
            src={post.author.photo.url}
            alt={post.author.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col items-start justify-center">
            <p className="text-sky-700 font-medium text-lg">
              {post.author.name}
            </p>
            <span className="text-gray-500 font-medium text-sm">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </span>
          </div>
        </div>
        <p className="hidden lg:block text-gray-500 font-medium text-sm 2xl:text-base">
          {post.excerpt}
        </p>
        <h1 className="text-xl xl:text-xl font-bold text-left cursor-pointer text-sky-700 hover:text-sky-600">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>
        <span className="hidden lg:block text-gray-500 font-medium text-sm ">
          {post.categories[0].name}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
