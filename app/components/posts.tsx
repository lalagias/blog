import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      <div className="flex flex-col space-y-1 mb-4">
        <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2 border-b border-neutral-400">
          <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
            Date
          </p>

          <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
            Title
          </p>

          <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
            Views
          </p>
        </div>
      </div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4 border-b border-neutral-400 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
