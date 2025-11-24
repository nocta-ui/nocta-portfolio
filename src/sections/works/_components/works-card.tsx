import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface WorksCardProps {
	image: string;
	title: string;
	description: string;
	link: string;
}

export default function WorksCard({
	image,
	title,
	description,
	link,
}: WorksCardProps) {
	return (
		<Card className="relative w-full aspect-video">
			<div className="relative w-full h-full p-1 rounded-lg">
				<img
					src={image}
					alt={title}
					className="w-full h-full object-cover rounded-md overflow-hidden bg-card-elevated border border-border/80 p-0.5"
				/>

				<div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-3 p-4">
					<div className="flex-1 min-w-0">
						<CardTitle className="text-primary">{title}</CardTitle>
						<CardDescription className="text-primary/45">
							{description}
						</CardDescription>
					</div>

					<Button asChild size="sm" variant="secondary">
						<a href={link} target="_blank" rel="noreferrer">
							View project
						</a>
					</Button>
				</div>
			</div>
		</Card>
	);
}
