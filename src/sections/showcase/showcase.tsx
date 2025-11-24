import { CubeIcon } from "@radix-ui/react-icons";
import Section from "@/components/layout/section";
import { cn } from "@/lib/utils";
import ShowcaseCard from "@/sections/showcase/_components/showcase-card";
import { showcaseHighlights } from "@/sections/showcase/_constants/showcase";

export default function Showcase() {
	return (
		/* biome-ignore lint/correctness/useUniqueElementIds: anchor target appears once */
		<Section
			id="showcase"
			title="Highlight signature work or video studies"
			description="Use these slots for showreels, filmed prototypes, or any captures that provide extra context for your process."
			className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:auto-rows-[220px]"
			badgeText="Showcase"
			badgeIcon={<CubeIcon aria-hidden="true" className="size-3.5" />}
		>
			{showcaseHighlights.map(
				({ className, title, description, src, poster }) => (
					<div key={title} className={cn("w-full", className)}>
						<ShowcaseCard
							title={title}
							description={description}
							src={src}
							poster={poster}
						/>
					</div>
				),
			)}
		</Section>
	);
}
