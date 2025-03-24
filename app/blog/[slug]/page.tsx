import { notFound } from "next/navigation";
import { CustomMDX } from "@/app/components/mdx";
import {
  formatDate,
  getBlogPosts,
  calculateReadingTime,
} from "@/app/blog/utils";
import { ReportView } from "@/app/components/viewcount";
import redis from "@/app/lib/redis";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;

  let ogImage = image
    ? `https://dkountanis.xyz${image}`
    : `https://dkountanis.xyz/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://dkountanis.xyz/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "example", post.slug].join(":"))) ??
    0;

  return (
    <section className="pb-20">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://dkountanis.xyz${post.metadata.image}`
              : `https://dkountanis.xyz/og?title=${post.metadata.title}`,
            url: `https://dkountanis.xyz/blog/${post.slug}`,
            author: {
              "@type": "Dimitris Kountanis",
              name: "My Portfolio",
            },
          }),
        }}
      />
      <ReportView slug={post.slug || ""} />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <span>
            {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}{" "}
            {" views"} |
          </span>
          <span> {formatDate(post.metadata.publishedAt)} |</span>
          <span> {calculateReadingTime(post.content)} min read</span>
        </p>
      </div>

      <article className="prose">
        <CustomMDX source={post.content} components={{}} />
      </article>
    </section>
  );
}
