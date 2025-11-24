import { Card, CardContent } from "@/components/ui/card";
import type { TestimonialType } from "@/sections/testimonials/_constants/testimonials";

export default function TestimonialCard({
	content,
	author,
	position,
	imageSrc,
}: TestimonialType) {
	return (
		<Card>
			<CardContent className="flex flex-col gap-4 text-foreground/70 leading-relaxed">
				<p>{content}</p>
				<div className="flex items-center gap-3">
					<img
						src={imageSrc}
						alt={author}
						className="size-10 rounded-full border border-border/80 object-cover"
						loading="lazy"
					/>
					<div className="flex flex-col">
						<span className="text-sm font-medium text-foreground">
							{author}
						</span>
						<span className="text-xs text-foreground/70">{position}</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
