import { createServerFn } from "@tanstack/react-start";
import { allPosts } from "content-collections";
import readingTime from "reading-time";

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	excerpt?: string;
	tags?: string[];
	readingTime: string;
};

export const getAllPostsMeta = createServerFn({ method: "GET" }).handler(
	async () => {
		return allPosts
			.map((post) => {
				const content = post.content ?? "";
				const slug = post._meta.path.replace(/\.mdx$/, "") ?? post._meta.path;

				return {
					slug,
					title: post.title ?? slug,
					date: post.date ?? "",
					excerpt: post.excerpt ?? "",
					tags: post.tags ?? [],
					readingTime: readingTime(content).text,
				} satisfies PostMeta;
			})
			.sort((a, b) => +new Date(b.date) - +new Date(a.date));
	},
);
