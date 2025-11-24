import type { ReactNode } from "react";

import { ShinyBadge } from "@/components/ui/shiny-badge";

type SectionProps = {
	children: ReactNode;
	title?: string;
	description?: string;
	className?: string;
	wrapperClassName?: string;
	id?: string;
	badgeText?: string;
	badgeIcon?: ReactNode;
};

export default function Section({
	children,
	title,
	description,
	className,
	wrapperClassName,
	id,
	badgeText,
	badgeIcon,
}: SectionProps) {
	return (
		<section
			id={id}
			className={`w-full md:max-w-5xl md:border-x border-border/80 border-dashed divide-y divide-border/80 divide-dashed flex flex-col items-start justify-start ${wrapperClassName ?? ""}`}
		>
			<div className="w-full flex flex-col gap-2 px-4 py-8 md:p-8">
				{badgeText ? (
					<div className="w-fit">
						<ShinyBadge>
							{badgeIcon}
							{badgeText}
						</ShinyBadge>
					</div>
				) : null}
				<h2 className="text-xl md:text-2xl text-foreground font-medium text-balance leading-none">
					{title}
				</h2>
				<p className="text-base text-foreground/70 font-medium text-balance leading-relaxed md:max-w-1/2">
					{description}
				</p>
			</div>
			<div className={`relative w-full h-full p-4 md:p-8 ${className ?? ""}`}>
				{children}
			</div>
		</section>
	);
}
