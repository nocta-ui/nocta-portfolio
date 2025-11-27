import { useGSAP } from "@gsap/react";
import { FrameIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShinyBadge } from "@/components/ui/shiny-badge";
import {
	gsap,
	premiumEase,
	registerGsapPlugins,
	SplitText,
} from "@/lib/gsap-config";
import { useLenis } from "@/lib/lenis-context";
import { Background } from "@/sections/hero/_components/background";

registerGsapPlugins();

export default function Hero() {
	const heroRef = useRef<HTMLDivElement>(null);
	const badgeRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const actionsRef = useRef<HTMLDivElement>(null);
	const [fontsLoaded, setFontsLoaded] = useState(() => {
		if (typeof document === "undefined") {
			return false;
		}

		if (!("fonts" in document)) {
			return true;
		}

		return document.fonts.status === "loaded";
	});
	const { scrollTo } = useLenis();

	useEffect(() => {
		if (fontsLoaded || typeof document === "undefined") {
			return;
		}

		if (!("fonts" in document)) {
			setFontsLoaded(true);
			return;
		}

		let isActive = true;
		document.fonts.ready.then(() => {
			if (isActive) {
				setFontsLoaded(true);
			}
		});

		return () => {
			isActive = false;
		};
	}, [fontsLoaded]);

	useGSAP(
		(context) => {
			if (!fontsLoaded) {
				return;
			}

			const hero = heroRef.current;
			if (!hero) return;

			gsap.set(
      [badgeRef.current, titleRef.current, descriptionRef.current, actionsRef.current],
      { autoAlpha: 1 }
      );

			const splits: SplitText[] = [];
			context.add(() => {
				splits.forEach((split) => {
					split.revert();
				});
			});

			const titleSplit = titleRef.current
				? new SplitText(titleRef.current, { type: "lines" })
				: null;

			const descriptionSplit = descriptionRef.current
				? new SplitText(descriptionRef.current, { type: "lines" })
				: null;

			if (titleSplit) {
				splits.push(titleSplit);
			}
			if (descriptionSplit) {
				splits.push(descriptionSplit);
			}

			const timeline = gsap.timeline({
				defaults: {
					ease: premiumEase,
				},
				scrollTrigger: {
					trigger: hero,
					start: "top 80%",
					once: true,
				},
			});

			if (badgeRef.current) {
				timeline.from(badgeRef.current, {
					yPercent: 30,
					autoAlpha: 0,
					filter: "blur(16px)",
					duration: 0.9,
					ease: premiumEase,
				});
			}

			if (titleSplit) {
				timeline.from(
					titleSplit.lines,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
						stagger: 0.15,
						duration: 0.9,
						ease: premiumEase,
					},
					"-=0.6",
				);
			}

			if (descriptionSplit) {
				timeline.from(
					descriptionSplit.lines,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
						stagger: 0.15,
						duration: 0.9,
						ease: premiumEase,
					},
					"-=0.6",
				);
			}

			if (actionsRef.current) {
				const buttons = Array.from(
					actionsRef.current.children,
				) as HTMLElement[];
				timeline.fromTo(
					buttons,
					{
						yPercent: 30,
						autoAlpha: 0,
						filter: "blur(16px)",
						ease: premiumEase,
					},
					{
						yPercent: 0,
						autoAlpha: 1,
						filter: "blur(0px)",
						clearProps: "filter",
						stagger: 0.15,
						duration: 0.9,
						ease: premiumEase,
					},
					"-=0.6",
				);
			}
		},
		{
			scope: heroRef,
			dependencies: [fontsLoaded],
		},
	);

	return (
		<section
			id="hero"
			ref={heroRef}
			className="relative flex h-[55vh] md:h-[50vh] w-full px-4 md:px-16 flex-col items-center justify-center gap-4"
		>
			<div className="relative z-10 flex flex-col items-center gap-2">
				<div style={{visibility: "hidden"}} ref={badgeRef} className="w-fit">
					<ShinyBadge>
						<FrameIcon aria-hidden="true" className="size-3.5" />
						Your Role Here
					</ShinyBadge>
				</div>
				<h1
				  style={{visibility: "hidden"}}
					ref={titleRef}
					className="text-3xl text-center text-foreground font-medium text-balance max-w-3xl"
				>
					Add a headline that tells people what you design, build, or launch.
				</h1>
				<p
		      style={{visibility: "hidden"}}
					ref={descriptionRef}
					className="text-base md:text-lg text-center text-foreground/70 font-medium text-balance leading-relaxed max-w-xl"
				>
					Use this paragraph to summarize your craft, industries served, or the
					results clients can expect when working with you.
				</p>
			</div>
			<div ref={actionsRef} className="relative z-10  flex items-center gap-2">
				<Button
			    style={{visibility: "hidden"}}
					variant="default"
					size="md"
					onClick={() => scrollTo("#contact")}
				>
					Start a project
				</Button>
				<Button
		      style={{visibility: "hidden"}}
					variant="secondary"
					size="md"
					onClick={() => scrollTo("#works")}
				>
					View portfolio
				</Button>
			</div>

			<div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
				<Background />
			</div>
		</section>
	);
}
