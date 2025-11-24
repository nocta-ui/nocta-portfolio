import { useId } from "react";

import { cn } from "@/lib/utils";

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
	squares?: Array<[x: number, y: number]>;
	strokeDasharray?: string;
	className?: string;
	[key: string]: unknown;
}

export function GridPattern({
	width = 40,
	height = 40,
	x = -1,
	y = -1,
	strokeDasharray = "0",
	squares,
	className,
	...props
}: GridPatternProps) {
	const id = useId();

	return (
		<svg
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute inset-0 h-full w-full fill-border/80 stroke-border",
				className,
			)}
			{...props}
		>
			<defs>
				<pattern
					id={id}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path
						d={`M.5 ${height}V.5H${width}`}
						fill="none"
						strokeDasharray={strokeDasharray}
					/>
				</pattern>
			</defs>

			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />

			{squares && (
				<svg aria-hidden="true" x={x} y={y} className="overflow-visible">
					{(() => {
						const counts = new Map<string, number>();

						return squares.map(([sx, sy]) => {
							const baseKey = `${sx}-${sy}`;
							const count = (counts.get(baseKey) ?? 0) + 1;
							counts.set(baseKey, count);

							const finalKey = `${baseKey}-${count}`;

							return (
								<rect
									strokeWidth="0"
									key={finalKey}
									width={width - 1}
									height={height - 1}
									x={sx * width + 1}
									y={sy * height + 1}
								/>
							);
						});
					})()}
				</svg>
			)}
		</svg>
	);
}
