import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ShinyBadge } from "@/components/ui/shiny-badge";
import { Background } from "@/sections/hero/_components/background";

export function NotFound() {
	return (
		<section className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden px-4 py-16 text-center md:px-16">
			<div className="relative z-10 flex max-w-2xl flex-col items-center gap-5">
				<div className="w-fit">
					<ShinyBadge>We lost this one</ShinyBadge>
				</div>
				<div className="space-y-3">
					<h1 className="text-4xl font-semibold text-balance text-foreground md:text-5xl">
						Page not found
					</h1>
					<p className="text-base text-balance text-foreground/70 md:text-lg">
						We couldn&apos;t find the page you were looking for, but heading
						back home or jumping into the work section is only a click away.
					</p>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<Button asChild size="md">
						<Link to="/">Back to homepage</Link>
					</Button>
					<Button asChild variant="secondary" size="md">
						<Link to="/" hash="works">
							View projects
						</Link>
					</Button>
				</div>
			</div>
			<div className="pointer-events-none absolute inset-0">
				<Background />
			</div>
		</section>
	);
}
