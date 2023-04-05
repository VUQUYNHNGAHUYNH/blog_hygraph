import { getPostDetails, getPosts } from "@/services";
import Image from "next/image";
import moment from "moment";
import { RichText } from "@graphcms/rich-text-react-renderer";
import RelatedPosts from "@/components/RelatedPosts";

const SinglePost = ({ post }) => {
  return (
    <div className="flex flex-col mx-auto font-poppins">
      {/* post header */}
      <div className="p-12 lg:p-16 bg-sky-600 text-slate-50">
        <div className="max-w-[850px] mx-auto flex items-center justify-center space-x-4 ">
          <h1 className="flex basis-3/4 font-averia text-2xl md:text-3xl xl:text-4xl font-bold">
            {post.title}
          </h1>
          <div className="flex basis-1/4 gap-2">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              width={60}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p className="font-medium text-base xl:text-lg">
                {post.author.name}
              </p>
              <span className="text-sm xl:text-lg min-w-[200px]">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* image  and content*/}
      <Image
        src={post.featuredImage.url}
        alt={post.name}
        width={400}
        height={400}
        className="mx-auto -mt-8 rounded-lg"
      />
      <p className="text-base lg:text-lg xl:text-xl mx-auto max-w-[850px] mt-12 px-8">
        <RichText content={post.content.raw} />
      </p>
      <RelatedPosts
        slug={post.slug}
        categories={post.categories.map((category) => category.slug)}
      />
    </div>
  );
};

export default SinglePost;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
