"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
	type ComponentType,
	createRef,
	type RefObject,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/utils";

export interface ConvertingCardIcon {
	id: string;
	Icon: ComponentType<{ className?: string }>;
}

export interface ConvertingCardIconSet {
	sources: ConvertingCardIcon[];
	hub: ConvertingCardIcon;
	destination: ConvertingCardIcon;
}

interface ConvertingCardContentProps {
	className?: string;
	icons: ConvertingCardIconSet;
}

export function ConvertingCardContent({
	className,
	icons,
}: ConvertingCardContentProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const destinationRef = useRef<HTMLDivElement>(null);
	const hubRef = useRef<HTMLDivElement>(null);
	const sourceRefs = useMemo(
		() => icons.sources.map(() => createRef<HTMLDivElement>()),
		[icons],
	);

	return (
		<div
			className={cn(
				"relative flex w-full items-center justify-center overflow-hidden",
				className,
			)}
			ref={containerRef}
		>
			<div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-8 text-foreground">
				<div className="flex flex-col justify-center">
					<div
						className="relative z-10 flex size-14 items-center justify-center rounded-full p-3 border border-border bg-card-elevated shadow-md card-highlight"
						ref={destinationRef}
					>
						<icons.destination.Icon className="size-6" />
					</div>
				</div>
				<div className="flex flex-col justify-center">
					<div
						ref={hubRef}
						className="relative z-10 flex size-14 items-center justify-center rounded-full p-3 border border-border bg-card-elevated shadow-md card-highlight"
					>
						<icons.hub.Icon className="size-6" />
					</div>
				</div>
				<div className="flex flex-col justify-center gap-2">
					{icons.sources.map(({ id, Icon }, index) => (
						<div
							key={id}
							className="relative z-10 flex size-14 items-center justify-center rounded-full p-3 border border-border bg-card-elevated shadow-md card-highlight"
							ref={sourceRefs[index]}
						>
							<Icon className="size-6" />
						</div>
					))}
				</div>
			</div>

			{sourceRefs.map((sourceRef, index) => (
				<AnimatedBeam
					key={`beam-${icons.sources[index]?.id ?? index}`}
					containerRef={containerRef}
					fromRef={sourceRef}
					toRef={hubRef}
				/>
			))}
			<AnimatedBeam
				containerRef={containerRef}
				fromRef={hubRef}
				toRef={destinationRef}
			/>
		</div>
	);
}

interface AnimatedBeamProps {
	className?: string;
	containerRef: RefObject<HTMLElement | null>;
	fromRef: RefObject<HTMLElement | null>;
	toRef: RefObject<HTMLElement | null>;
	curvature?: number;
	reverse?: boolean;
	pathColor?: string;
	pathWidth?: number;
	pathOpacity?: number;
	gradientStartColor?: string;
	gradientStopColor?: string;
	delay?: number;
	duration?: number;
	startXOffset?: number;
	startYOffset?: number;
	endXOffset?: number;
	endYOffset?: number;
}

const AnimatedBeam = ({
	className,
	containerRef,
	fromRef,
	toRef,
	curvature = 0,
	reverse = false,
	duration = 3,
	delay = 0,
	pathColor = "gray",
	pathWidth = 2,
	pathOpacity = 0.2,
	gradientStartColor = "#C7C9ff",
	gradientStopColor = "#84868D",
	startXOffset = 0,
	startYOffset = 0,
	endXOffset = 0,
	endYOffset = 0,
}: AnimatedBeamProps) => {
	const id = useId();
	const [pathD, setPathD] = useState("");
	const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

	const initialGradient = reverse
		? {
				x1: "90%",
				x2: "100%",
				y1: "0%",
				y2: "0%",
			}
		: {
				x1: "10%",
				x2: "0%",
				y1: "0%",
				y2: "0%",
			};

	const animatedGradient = reverse
		? {
				x1: "-10%",
				x2: "0%",
				y1: "0%",
				y2: "0%",
			}
		: {
				x1: "110%",
				x2: "100%",
				y1: "0%",
				y2: "0%",
			};

	useGSAP(() => {
		const gradientRef = document.getElementById(id);
		if (!gradientRef) return;

		gsap.fromTo(
			gradientRef,
			{
				attr: {
					x1: initialGradient.x1,
					x2: initialGradient.x2,
					y1: initialGradient.y1,
					y2: initialGradient.y2,
				},
			},
			{
				attr: {
					x1: animatedGradient.x1,
					x2: animatedGradient.x2,
					y1: animatedGradient.y1,
					y2: animatedGradient.y2,
				},
				duration,
				delay,
				ease: "power2.out",
				repeat: -1,
				repeatDelay: 0,
			},
		);
	}, [id, duration, delay, initialGradient, animatedGradient]);

	useEffect(() => {
		const updatePath = () => {
			if (containerRef.current && fromRef.current && toRef.current) {
				const containerRect = containerRef.current.getBoundingClientRect();
				const rectA = fromRef.current.getBoundingClientRect();
				const rectB = toRef.current.getBoundingClientRect();

				const svgWidth = containerRect.width;
				const svgHeight = containerRect.height;
				setSvgDimensions({ width: svgWidth, height: svgHeight });

				const startX =
					rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
				const startY =
					rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
				const endX =
					rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
				const endY =
					rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

				const controlY = startY - curvature;
				const d = `M ${startX},${startY} Q ${
					(startX + endX) / 2
				},${controlY} ${endX},${endY}`;
				setPathD(d);
			}
		};

		const resizeObserver = new ResizeObserver((entries) => {
			entries.forEach(() => {
				updatePath();
			});
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		updatePath();

		return () => {
			resizeObserver.disconnect();
		};
	}, [
		containerRef,
		fromRef,
		toRef,
		curvature,
		startXOffset,
		startYOffset,
		endXOffset,
		endYOffset,
	]);

	return (
		<svg
			fill="none"
			width={svgDimensions.width}
			height={svgDimensions.height}
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
				className,
			)}
			viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
		>
			<path
				d={pathD}
				stroke={pathColor}
				strokeWidth={pathWidth}
				strokeOpacity={pathOpacity}
				strokeLinecap="round"
			/>
			<path
				d={pathD}
				strokeWidth={pathWidth}
				stroke={`url(#${id})`}
				strokeOpacity="1"
				strokeLinecap="round"
			/>
			<defs>
				<linearGradient
					id={id}
					gradientUnits="userSpaceOnUse"
					x1={initialGradient.x1}
					x2={initialGradient.x2}
					y1={initialGradient.y1}
					y2={initialGradient.y2}
				>
					<stop stopColor={gradientStartColor} stopOpacity="0" />
					<stop stopColor={gradientStartColor} />
					<stop stopColor={gradientStartColor} />
					<stop offset="32.5%" stopColor={gradientStopColor} />
					<stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
				</linearGradient>
			</defs>
		</svg>
	);
};
