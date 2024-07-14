import Link from "next/link";
import { formatDate, getBlogPosts, calculateReadingTime } from "app/blog/utils";
import { ReportView } from "app/blog/view-counter";
import redis from "app/lib/redis";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map(async (post) => {
          const views =
            (await redis.get<number>(
              ["pageviews", "blogposts", "/" + post.slug].join(":")
            )) ?? 0;

          return (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4 border rounded-md p-5 border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              href={`/blog/${post.slug}`}
            >
              <ReportView slug={post.slug || ""} />
              <div className="w-full flex md:align-center flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-base text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                </p>
                <p className="flex align-center text-sm leading-6 text-neutral-600 dark:text-neutral-400 ml-auto">
                  {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                    views
                  )}{" "}
                  {" views"} | {" "}{calculateReadingTime(post.content)} min read
                </p>
              </div>
            </Link>
          );
        })}
    </>
  );
}
