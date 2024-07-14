import { BlogPosts } from 'app/components/posts'
import { getBlogPosts } from 'app/blog/utils';

export const metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software, business, product, growth and more.',
}

export default async function Page() {
  let allBlogPosts = getBlogPosts();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />
    </section>
  )
}
