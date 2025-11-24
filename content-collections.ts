import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const posts = defineCollection({
	name: "posts",
	directory: "src/content/posts",
	include: "**/*.mdx",
	schema: z.object({
		title: z.string(),
		date: z.string(),
		excerpt: z.string().optional(),
		tags: z.array(z.string()).optional(),
		content: z.string(),
	}),
});

export default defineConfig({
	collections: [posts],
});
