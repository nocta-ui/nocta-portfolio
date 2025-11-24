import { ReaderIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import BlogCard from "@/sections/blog/_components/blog-card";
import type { PostMeta } from "@/sections/blog/_server/posts";

type BlogSectionProps = {
	posts: PostMeta[];
};

export default function Blog({ posts }: BlogSectionProps) {
	const hasPosts = posts && posts.length > 0;

	return (
		/* biome-ignore lint/correctness/useUniqueElementIds: anchor target appears once */
		<Section
			id="blog"
			title="Share your latest thinking"
			description="Use this section to tease recent posts, public build logs, or long-form breakdowns of the work you're most proud of."
			className="grid grid-cols-1 gap-4 md:grid-cols-2"
			badgeText="Latest posts"
			badgeIcon={<ReaderIcon aria-hidden="true" className="size-3.5" />}
		>
			{hasPosts ? (
				posts.map((post) => <BlogCard key={post.slug} meta={post} />)
			) : (
				<p className="text-sm text-foreground/60">
					No posts yet — add an MDX file in <code>src/content/posts</code> to
					populate this grid.
				</p>
			)}
		</Section>
	);
}
