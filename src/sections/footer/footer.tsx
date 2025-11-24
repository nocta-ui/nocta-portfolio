import type { MouseEvent } from "react";
import { LogoIcon } from "@/components/icons/logo-icon";
import { useLenis } from "@/lib/lenis-context";
import {
	footerLinks,
	footerSocialLinks,
} from "@/sections/footer/_constants/footer";

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const { scrollTo } = useLenis();

	const handleNavigationClick = (
		event: MouseEvent<HTMLAnchorElement>,
		target: string,
	) => {
		event.preventDefault();
		scrollTo(target);
	};

	return (
		<footer className="w-full">
			<div className="w-full md:max-w-5xl mx-auto grid gap-8 px-4 py-8 md:p-8 md:grid-cols-[minmax(0,1fr)_120px] border-border/80 border-x border-dashed">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<div className="flex gap-2 items-center text-foreground">
							<LogoIcon className="size-4" />
							<p className="text-sm font-medium">Your Name</p>
						</div>
						<p className="text-xs text-foreground/70 leading-relaxed max-w-xs">
							Use this placeholder copy to describe your focus, niche, or the
							type of projects you love working on.
						</p>
					</div>

					<div className="flex items-center gap-3">
						{footerSocialLinks.map(({ label, href, icon: Icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noreferrer"
								aria-label={label}
								className="group flex size-6 rounded items-center justify-center text-foreground/70 hover:text-foreground transition-[color,shadow] duration-100 ease-out-quad focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
							>
								<Icon aria-hidden="true" />
							</a>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<p className="text-xs text-foreground">Navigation</p>
					<ul className="space-y-2 text-xs text-foreground/70">
						{footerLinks.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									onClick={(event) => handleNavigationClick(event, link.href)}
									className="hover:text-foreground rounded transition-[color,shadow] duration-100 ease-out-quad focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-ring-offset/50 focus-visible:outline-none"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="text-xs text-foreground/70 border-t border-border/80">
				<div className="w-full md:max-w-5xl mx-auto flex flex-col md:flex-row gap-1 px-4 py-4 md:px-2 items-center justify-between">
					<p>
						© {currentYear} Your Name. Update this footer text to match your
						brand.
					</p>
					<p>
						Let visitors know where you work from or the type of collaborations
						you take on.
					</p>
				</div>
			</div>
		</footer>
	);
}
