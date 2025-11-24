import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { ShowcaseHighlight } from "@/sections/showcase/_constants/showcase";

type ShowcaseCardProps = Omit<ShowcaseHighlight, "className">;

export default function ShowcaseCard({
	title,
	description,
	src,
	poster,
}: ShowcaseCardProps) {
	return (
		<Card className="relative w-full lg:h-full">
			<div className="relative w-full aspect-video lg:h-full lg:aspect-auto p-1 rounded-lg">
				<video
					className="h-full w-full object-cover rounded-md overflow-hidden bg-card-elevated border border-border/80 p-0.5"
					src={src}
					poster={poster}
					autoPlay
					loop
					muted
					playsInline
					preload="metadata"
				/>
			</div>

			<div className="absolute bottom-0 left-0 right-0 p-4">
				<CardTitle className="text-primary">{title}</CardTitle>
				<CardDescription className="text-primary/45">
					{description}
				</CardDescription>
			</div>
		</Card>
	);
}
