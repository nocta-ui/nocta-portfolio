import { type ComponentPropsWithoutRef, useId, useMemo } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/sections/services/_constants/services";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
	className?: string;
	reverse?: boolean;
	children: React.ReactNode;
	repeat?: number;
}

interface CleanCodeCardContentProps {
	className?: string;
	items: ServiceItem[];
}

function Marquee({
	className,
	reverse = false,
	children,
	repeat = 3,
	...props
}: MarqueeProps) {
	const idPrefix = useId();
	const marqueeItemKeys = useMemo(
		() => Array.from({ length: repeat }, (_, index) => `${idPrefix}-${index}`),
		[idPrefix, repeat],
	);

	return (
		<div
			{...props}
			className={cn("group flex [--gap:1rem] gap-(--gap) flex-row", className)}
		>
			{marqueeItemKeys.map((key) => (
				<div
					key={key}
					className={cn(
						"flex shrink-0 justify-around gap-(--gap) will-change-transform transform-gpu animate-marquee flex-row",
						{
							"[animation-direction:reverse]": reverse,
						},
					)}
				>
					{children}
				</div>
			))}
		</div>
	);
}

export function CleanCodeCardContent({
	className,
	items,
}: CleanCodeCardContentProps) {
	return (
		<>
			<Marquee className={className}>
				{items.map((practice) => (
					<Card
						key={practice.name}
						className="relative mx-auto flex w-72 bg-card-elevated flex-col p-4"
					>
						<CardTitle className="text-sm">{practice.name}</CardTitle>
						<CardDescription className="text-xs">
							{practice.description}
						</CardDescription>
					</Card>
				))}
			</Marquee>
			<Marquee reverse className={cn("mt-4", className)}>
				{items.map((practice) => (
					<Card
						key={practice.name}
						className="relative mx-auto flex w-72 bg-card-elevated flex-col p-4"
					>
						<CardTitle className="text-sm">{practice.name}</CardTitle>
						<CardDescription className="text-xs">
							{practice.description}
						</CardDescription>
					</Card>
				))}
			</Marquee>
		</>
	);
}
