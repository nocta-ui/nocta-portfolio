import type { ComponentPropsWithoutRef, CSSProperties, FC } from "react";

import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps
	extends ComponentPropsWithoutRef<"span"> {
	shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
	children,
	className,
	shimmerWidth = 100,
	...props
}) => {
	return (
		<span
			style={
				{
					"--shiny-width": `${shimmerWidth}px`,
				} as CSSProperties
			}
			className={cn(
				"mx-auto max-w-md light:text-primary dark:text-primary/45",

				"animate-shiny-text bg-clip-text bg-no-repeat bg-position-[0_0] bg-size-[var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

				"bg-linear-to-r from-transparent via-50% to-transparent via-foreground",

				className,
			)}
			{...props}
		>
			{children}
		</span>
	);
};
