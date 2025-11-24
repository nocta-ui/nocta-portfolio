import type { HTMLAttributes, ReactNode } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	name: string;
	description: string;
	className?: string;
	background?: ReactNode;
	href?: string;
}

const ServiceCard = ({
	name,
	className,
	background,
	description,
	href,
	...props
}: CardProps) => {
	const hrefProps = href ? { "data-href": href } : {};

	return (
		<Card
			key={name}
			className={cn("group relative h-80", className)}
			{...hrefProps}
			{...props}
		>
			<div className="absolute inset-0 overflow-hidden mask-[linear-gradient(to_top,transparent_10%,#000_90%)]">
				<div className="p-8">{background}</div>
			</div>
			<div className="absolute bottom-0 left-0 p-4">
				<CardTitle>{name}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</div>
		</Card>
	);
};

export { ServiceCard };
