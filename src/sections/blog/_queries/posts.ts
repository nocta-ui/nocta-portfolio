import type { ComponentType } from "react";

type BlogPostModule = {
	default: ComponentType;
};

const postModules = import.meta.glob<BlogPostModule>(
	"../../../content/posts/*.mdx",
);

export type BlogPostComponent = ComponentType;

export const blogPostQueryOptions = (slug: string) => ({
	queryKey: ["blog-post", slug] as const,
	queryFn: async () => {
		const importer = postModules[`../../../content/posts/${slug}.mdx`];
		if (!importer) {
			throw new Error(`Post with slug "${slug}" not found`);
		}
		const module = await importer();
		return module.default;
	},
	ssr: false,
	staleTime: 1000 * 60 * 5,
	gcTime: 1000 * 60 * 60,
});
