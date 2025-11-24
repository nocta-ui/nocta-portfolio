import { useGSAP } from "@gsap/react";
import { useEffect, useId, useRef, useState } from "react";
import { LogoIcon } from "@/components/icons/logo-icon";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
	gsap,
	premiumEase,
	registerGsapPlugins,
	ScrollTrigger,
} from "@/lib/gsap-config";
import { useLenis } from "@/lib/lenis-context";
import { cn } from "@/lib/utils";

registerGsapPlugins();

const NAV_LINKS = [
	{ label: "Services", target: "#services" },
	{ label: "Works", target: "#works" },
	{ label: "Showcase", target: "#showcase" },
	{ label: "Testimonials", target: "#testimonials" },
	{ label: "FAQ", target: "#faq" },
	{ label: "Blog", target: "#blog" },
] as const;

const colorWithOpacity = (token: string, opacity: number) => {
	const clamped = Math.min(Math.max(opacity, 0), 1);
	const percent = Number((clamped * 100).toFixed(2));
	return `color-mix(in oklab, var(${token}) ${percent}%, transparent)`;
};

export function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(
		typeof window !== "undefined" ? window.innerWidth < 1024 : false,
	);
	const [isNavbarElevated, setIsNavbarElevated] = useState(false);
	const navbarRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);
	const menuContentRef = useRef<HTMLDivElement>(null);
	const toggleButtonRef = useRef<HTMLButtonElement>(null);
	const lineOneRef = useRef<HTMLSpanElement>(null);
	const lineTwoRef = useRef<HTMLSpanElement>(null);
	const lineThreeRef = useRef<HTMLSpanElement>(null);
	const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
	const { scrollTo } = useLenis();
	const mobileMenuId = useId();

	const toggleTl = useRef<gsap.core.Timeline | null>(null);
	const menuTl = useRef<gsap.core.Timeline | null>(null);
	const navbarTl = useRef<gsap.core.Timeline | null>(null);

	useEffect(() => {
		const updateViewport = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		updateViewport();
		window.addEventListener("resize", updateViewport);

		return () => {
			window.removeEventListener("resize", updateViewport);
		};
	}, []);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
			if (!mobileMenuOpen || !menuRef.current || !toggleButtonRef.current) {
				return;
			}

			const target = event.target as Node;
			if (
				!menuRef.current.contains(target) &&
				!toggleButtonRef.current.contains(target)
			) {
				setMobileMenuOpen(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);
		document.addEventListener("touchend", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
			document.removeEventListener("touchend", handleOutsideClick);
		};
	}, [mobileMenuOpen]);

	useGSAP(
		() => {
			const lineOne = lineOneRef.current;
			const lineTwo = lineTwoRef.current;
			const lineThree = lineThreeRef.current;
			if (!lineOne || !lineTwo || !lineThree) return;

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.25,
					ease: premiumEase,
				},
			});

			tl.to(lineOne, { rotation: 45, y: 0 }, 0)
				.to(lineTwo, { opacity: 0, rotation: 45 }, 0)
				.to(lineThree, { rotation: -45, y: 0 }, 0);

			toggleTl.current = tl;

			return () => {
				tl.kill();
			};
		},
		{ scope: toggleButtonRef },
	);

	useGSAP(
		() => {
			const menu = menuContentRef.current;
			if (!menu) return;

			gsap.set(menu, {
				autoAlpha: 0,
				scale: 0.97,
				backdropFilter: "blur(0px)",
				borderColor: colorWithOpacity("--color-border", 0),
			});

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.25,
					ease: premiumEase,
				},
			});

			tl.to(menu, {
				autoAlpha: 1,
				scale: 1,
				backdropFilter: "blur(16px)",
				borderColor: colorWithOpacity("--color-border", 1),
				onStart: () => {
					menu.style.display = "flex";
				},
			});

			menuTl.current = tl;

			return () => {
				tl.kill();
			};
		},
		{ scope: menuContentRef },
	);

	useEffect(() => {
		const iconTl = toggleTl.current;
		const mTl = menuTl.current;

		if (mobileMenuOpen) {
			iconTl?.play();
			mTl?.play();
		} else {
			iconTl?.reverse();
			mTl?.reverse();
		}
	}, [mobileMenuOpen]);

	useGSAP(
		() => {
			const navbar = navbarRef.current;
			if (!navbar) return;

			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;
			navbarTl.current?.kill();
			navbarTl.current = null;

			if (isMobile) {
				setIsNavbarElevated(true);
				gsap.set(navbar, {
					backgroundColor: colorWithOpacity("--color-card", 0.75),
					borderColor: colorWithOpacity("--color-border", 1),
					backdropFilter: "blur(16px)",
					maxWidth: "100%",
					transform: "translateY(0px)",
					"--highlight-opacity": 1,
				});
				return;
			}

			setIsNavbarElevated(false);
			gsap.set(navbar, {
				backgroundColor: colorWithOpacity("--color-card", 0),
				borderColor: colorWithOpacity("--color-border", 0),
				backdropFilter: "blur(0px)",
				maxWidth: "66rem",
				transform: "translateY(0px)",
				"--highlight-opacity": 0,
			});

			const tl = gsap.timeline({
				paused: true,
				defaults: {
					duration: 0.35,
					ease: premiumEase,
				},
			});

			tl.to(navbar, {
				backgroundColor: colorWithOpacity("--color-card", 0.75),
				borderColor: colorWithOpacity("--color-border", 1),
				backdropFilter: "blur(16px)",
				maxWidth: "64rem",
				transform: "translateY(6px)",
				"--highlight-opacity": 1,
			});

			navbarTl.current = tl;

			scrollTriggerRef.current = ScrollTrigger.create({
				start: "top+=12 top",
				onEnter: () => {
					setIsNavbarElevated(true);
					navbarTl.current?.play();
				},
				onLeaveBack: () => {
					setIsNavbarElevated(false);
					navbarTl.current?.reverse();
				},
			});

			return () => {
				scrollTriggerRef.current?.kill();
				scrollTriggerRef.current = null;
				navbarTl.current?.kill();
				navbarTl.current = null;
			};
		},
		{ dependencies: [isMobile] },
	);

	useEffect(() => {
		return () => {
			scrollTriggerRef.current?.kill();
			scrollTriggerRef.current = null;
		};
	}, []);

	const handleScroll = (target: string) => {
		setMobileMenuOpen(false);
		scrollTo(target);
	};

	return (
		<nav
			className="fixed top-2 inset-x-0 z-50 flex justify-center px-2 md:px-4"
			aria-label="Main navigation"
		>
			<div
				ref={navbarRef}
				className={cn(
					"relative flex w-264 items-center justify-between rounded-lg py-1.5 px-4",
					"bg-card/75 lg:bg-card/0 border border-border lg:border-border/0 dark:card-highlight",
					"[--highlight-opacity:1] lg:[--highlight-opacity:0] text-foreground transition-shadow duration-350 ease-navbar",
					isNavbarElevated && "shadow-lg",
				)}
			>
				<Button
					variant="ghost"
					size="sm"
					className="p-0 text-sm font-medium text-foreground hover:bg-transparent"
					onClick={() => handleScroll("#hero")}
					role="menuitem"
				>
					<div className="flex items-center gap-2">
						<LogoIcon className="size-4" />
						<span>Your Name</span>
					</div>
				</Button>

				<div
					className="hidden md:flex items-center gap-2"
					role="menubar"
					aria-label="Desktop navigation"
				>
					{NAV_LINKS.map((link) => (
						<Button
							key={link.target}
							variant="ghost"
							size="sm"
							className="text-xs text-foreground/70 hover:text-foreground hover:bg-transparent"
							onClick={() => handleScroll(link.target)}
							role="menuitem"
						>
							{link.label}
						</Button>
					))}
				</div>

				<div className="hidden md:flex items-center gap-2">
					<ThemeToggle />

					<Button
						variant="default"
						size="sm"
						className="text-xs"
						onClick={() => handleScroll("#contact")}
						role="menuitem"
					>
						Contact
					</Button>
				</div>

				<div className="flex md:hidden items-center gap-2">
					<ThemeToggle />

					<Button
						variant="ghost"
						size="sm"
						ref={toggleButtonRef}
						onClick={() => setMobileMenuOpen((prev) => !prev)}
						className="relative flex size-8 items-center justify-center"
						aria-expanded={mobileMenuOpen}
						aria-haspopup="true"
						aria-controls={mobileMenuId}
						aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
					>
						<span
							ref={lineOneRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
							style={{ transform: "translateY(-6px)" }}
						/>
						<span
							ref={lineTwoRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
						/>
						<span
							ref={lineThreeRef}
							className="absolute h-0.5 w-6 rounded-full bg-current"
							style={{ transform: "translateY(6px)" }}
						/>
					</Button>
				</div>
			</div>

			<div
				ref={menuRef}
				id={mobileMenuId}
				role="menu"
				aria-label="Mobile navigation"
				className={cn(
					"absolute top-full mt-2 w-full max-w-6xl px-2 lg:hidden",
					mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
				)}
				aria-hidden={!mobileMenuOpen}
			>
				<div
					ref={menuContentRef}
					className="rounded-lg border bg-card/75 p-4 shadow-lg flex flex-col gap-2 overflow-hidden"
					style={{ visibility: "hidden" }}
				>
					{NAV_LINKS.map((link) => (
						<Button
							key={link.target}
							variant="ghost"
							size="sm"
							className="justify-start px-0 text-foreground/70 hover:text-foreground"
							onClick={() => handleScroll(link.target)}
							role="menuitem"
						>
							{link.label}
						</Button>
					))}
					<Button
						variant="default"
						size="sm"
						className="mt-2 text-sm"
						onClick={() => handleScroll("#contact")}
						role="menuitem"
					>
						Contact
					</Button>
				</div>
			</div>
		</nav>
	);
}
