import { BlogPosts } from "@/components/posts"

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software, business, product, growth and more.",
}

export default async function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">my blog</h1>
      <BlogPosts />
    </section>
  )
}
