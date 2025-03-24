import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Build in Public",
  description:
    "Read my thoughts on software, business, product, growth and more.",
};

export default async function Page() {
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Build in Public
      </h1>
      <div className="flex flex-col space-y-4">
        <Link
          href="https://heyrival.io"
          className="flex items-center space-y-1 mb-4 border rounded-md p-5 border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <p className="text-lg font-semibold">HeyRival</p>
          <span className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">
            heyrival.io
          </span>
          <Badge className="ml-auto">On going</Badge>
        </Link>
      </div>
    </section>
  );
}
