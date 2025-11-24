import type { FC, ReactNode } from "react";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

import { Badge } from "./badge";

interface ShinyBadgeProps {
	children: ReactNode;
}

export const ShinyBadge: FC<ShinyBadgeProps> = ({ children }) => {
	return (
		<Badge
			size="lg"
			className="border light:border-transparent dark:border-border bg-badge hover:bg-badge w-fit mb-2"
		>
			<AnimatedShinyText className="text-xs flex gap-1 items-center">
				{children}
			</AnimatedShinyText>
		</Badge>
	);
};
