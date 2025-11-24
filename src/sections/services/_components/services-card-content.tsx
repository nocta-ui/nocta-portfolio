import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
	Children,
	type ComponentPropsWithoutRef,
	type ReactElement,
	type ReactNode,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/sections/services/_constants/services";

const createServiceKey = (
	name: string,
	repeatIndex: number,
	itemIndex: number,
) =>
	[
		"service",
		name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)+/g, ""),
		repeatIndex,
		itemIndex,
	].join("-");

const NOTIFICATION_REPEAT_COUNT = 10;

export interface ServicesCardContentProps {
	className?: string;
	items: ServiceItem[];
	delay?: number;
	maxVisible?: number;
}

export function ServicesCardContent({
	className,
	items,
	delay = 2500,
	maxVisible = 3,
}: ServicesCardContentProps) {
	const notifications = useMemo(
		() =>
			Array.from(
				{ length: NOTIFICATION_REPEAT_COUNT },
				(_, repeatIndex) => repeatIndex,
			).flatMap((repeatIndex) =>
				items.map((item, itemIndex) => ({
					item,
					key: createServiceKey(item.name, repeatIndex, itemIndex),
				})),
			),
		[items],
	);

	return (
		<div
			className={cn("relative flex w-full flex-col overflow-hidden", className)}
		>
			<AnimatedList delay={delay} maxVisible={maxVisible}>
				{notifications.map(({ item, key }) => (
					<Notification {...item} key={key} />
				))}
			</AnimatedList>
		</div>
	);
}

const Notification = ({ name, description }: ServiceItem) => (
	<Card className="relative mx-auto flex w-full flex-col p-4 bg-card-elevated">
		<CardTitle className="text-sm">{name}</CardTitle>
		<CardDescription className="text-xs">{description}</CardDescription>
	</Card>
);

const AnimatedListItem = ({
	children,
	isNew = false,
}: {
	children: ReactNode;
	isNew?: boolean;
}) => {
	const itemRef = useRef<HTMLDivElement>(null);

	useGSAP(
		(context) => {
			const element = itemRef.current;
			if (!element || !isNew) return;

			context.add(() => {
				gsap.fromTo(
					element,
					{
						scale: 0.5,
						opacity: 0,
						transformOrigin: "center",
					},
					{
						scale: 1,
						opacity: 1,
						duration: 0.5,
						ease: "power2.out",
					},
				);
			});
		},
		{ dependencies: [isNew], scope: itemRef },
	);

	return (
		<div ref={itemRef} className="mx-auto w-full will-change-transform">
			{children}
		</div>
	);
};

interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
	children: ReactNode;
	delay?: number;
	maxVisible?: number;
}

const AnimatedList = ({
	children,
	className,
	delay = 1000,
	maxVisible = 3,
	...props
}: AnimatedListProps) => {
	const [index, setIndex] = useState(0);
	const listRef = useRef<HTMLDivElement>(null);

	const childrenArray = useMemo(() => Children.toArray(children), [children]);

	const itemsToShow = useMemo(() => {
		const end = (index + 1) % childrenArray.length;
		const ordered = [
			...childrenArray.slice(end),
			...childrenArray.slice(0, end),
		];
		return ordered.slice(-maxVisible).reverse();
	}, [index, childrenArray, maxVisible]);

	useGSAP(
		(context) => {
			if (index > 0 && listRef.current) {
				const container = listRef.current;
				const items = Array.from(container.children) as HTMLElement[];

				const newItem = items[0];
				const newHeight = newItem.offsetHeight;
				const displacement = newHeight + 16;

				context.add(() => {
					items.slice(1).forEach((item) => {
						gsap.fromTo(
							item,
							{
								y: -displacement,
								position: "relative",
							},
							{
								y: 0,
								duration: 0.5,
								ease: "power2.out",
							},
						);
					});
				});
			}
		},
		{ dependencies: [index], scope: listRef },
	);

	useEffect(() => {
		if (!childrenArray.length) return;

		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
		}, delay);

		return () => clearInterval(interval);
	}, [delay, childrenArray.length]);

	return (
		<div
			ref={listRef}
			className={cn("flex flex-col items-center gap-4", className)}
			{...props}
		>
			{itemsToShow.map((item, idx) => (
				<AnimatedListItem
					key={(item as ReactElement).key || idx}
					isNew={idx === 0}
				>
					{item}
				</AnimatedListItem>
			))}
		</div>
	);
};
