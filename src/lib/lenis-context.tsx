import { useRouter, useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";
import type React from "react";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useRef,
} from "react";

interface LenisScrollOptions {
	duration?: number;
	easing?: (t: number) => number;
	offset?: number;
	lerp?: number;
	immediate?: boolean;
	lock?: boolean;
	force?: boolean;
	onComplete?: () => void;
	onStart?: () => void;
}

interface LenisContextType {
	lenis: React.RefObject<Lenis | null>;
	scrollTo: (
		target: string | HTMLElement,
		options?: LenisScrollOptions,
	) => void;
}

type PendingScrollTarget = {
	target: string | HTMLElement;
	options?: LenisScrollOptions;
};

const LenisContext = createContext<LenisContextType | undefined>(undefined);

const normalizeStringTarget = (target: string) => {
	if (target.startsWith("/#")) return target.slice(1);
	return target;
};

const runLenisScroll = (
	lenisRef: React.RefObject<Lenis | null>,
	target: string | HTMLElement,
	options?: LenisScrollOptions,
) => {
	if (!lenisRef.current) return;

	const defaultScrollOptions: LenisScrollOptions = {
		duration: 1,
		offset: 0,
		...options,
	};

	lenisRef.current.scrollTo(target, defaultScrollOptions);

	requestAnimationFrame(() => {
		lenisRef.current?.resize?.();
		lenisRef.current?.scrollTo(target, defaultScrollOptions);
	});
};

export const LenisProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const lenis = useRef<Lenis | null>(null);
	const pendingScrollRef = useRef<PendingScrollTarget | null>(null);
	const router = useRouter();

	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	useEffect(() => {
		lenis.current = new Lenis({ duration: 0.5 });

		let rafId = 0;
		const animate = (time: number) => {
			lenis.current?.raf(time);
			rafId = requestAnimationFrame(animate);
		};
		rafId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(rafId);
			lenis.current?.destroy();
			lenis.current = null;
		};
	}, []);

	const scrollTo = (
		target: string | HTMLElement,
		options?: LenisScrollOptions,
	) => {
		const resolvedTarget =
			typeof target === "string" ? normalizeStringTarget(target) : target;

		const isSectionTarget =
			typeof resolvedTarget === "string" && resolvedTarget.startsWith("#");

		if (isSectionTarget && pathname !== "/") {
			pendingScrollRef.current = { target: resolvedTarget, options };

			router.navigate({ to: "/", resetScroll: false }).catch(() => {
				pendingScrollRef.current = null;
			});

			return;
		}

		runLenisScroll(lenis, resolvedTarget, options);
	};

	useEffect(() => {
		if (pathname !== "/" || !pendingScrollRef.current) return;

		const pending = pendingScrollRef.current;
		pendingScrollRef.current = null;

		let tries = 0;
		const maxTries = 120;

		const tick = () => {
			const el =
				typeof pending.target === "string"
					? document.querySelector(pending.target)
					: pending.target;

			if (el) {
				runLenisScroll(lenis, el as HTMLElement, pending.options);
				return;
			}

			if (tries++ < maxTries) requestAnimationFrame(tick);
		};

		requestAnimationFrame(tick);
	}, [pathname]);

	return (
		<LenisContext.Provider value={{ lenis, scrollTo }}>
			{children}
		</LenisContext.Provider>
	);
};

export const useLenis = () => {
	const context = useContext(LenisContext);
	if (!context) {
		throw new Error("useLenis must be used within a LenisProvider");
	}
	return context;
};
