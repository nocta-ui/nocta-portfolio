import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { blogPostQueryOptions } from "@/sections/blog/_queries/posts";
import type { PostMeta } from "@/sections/blog/_server/posts";

type BlogCardProps = {
	meta: PostMeta;
};

export default function BlogCard({ meta }: BlogCardProps) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const hasPrefetchedRef = useRef(false);
	const prefetchBlogRoute = useCallback(() => {
		if (hasPrefetchedRef.current) return;
		hasPrefetchedRef.current = true;
		void Promise.all([
			router.preloadRoute({
				to: "/blog/$slug",
				params: { slug: meta.slug },
			}),
			queryClient.prefetchQuery(blogPostQueryOptions(meta.slug)),
		]);
	}, [meta.slug, queryClient, router]);

	const formattedDate = formatDate(meta.date);
	const tags =
		(meta.tags ?? []).filter(
			(tag: string | null | undefined): tag is string =>
				typeof tag === "string" && tag.trim().length > 0,
		) ?? [];

	return (
		<Link
			to="/blog/$slug"
			params={{ slug: meta.slug }}
			className="block h-full rounded-lg transition-shadow duration-100 ease-out-quad focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
			aria-label={`Read article: ${meta.title}`}
			onMouseEnter={prefetchBlogRoute}
			onFocus={prefetchBlogRoute}
		>
			<Card className="flex h-full flex-col justify-between gap-4">
				<CardHeader className="space-y-2">
					<div className="flex items-center justify-between text-xs text-foreground/45">
						<span>{formattedDate}</span>
						<span>{meta.readingTime}</span>
					</div>
					<CardTitle className="text-balance leading-normal">
						{meta.title}
					</CardTitle>
					{meta.excerpt ? (
						<CardDescription>{meta.excerpt}</CardDescription>
					) : null}
				</CardHeader>
				{tags.length ? (
					<CardContent className="pt-0">
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									size="sm"
									className="bg-card-elevated hover:bg-card-elevated"
								>
									{tag}
								</Badge>
							))}
						</div>
					</CardContent>
				) : null}
			</Card>
		</Link>
	);
}

function formatDate(date: string) {
	if (!date) return "";
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) return "";
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(parsed);
}
